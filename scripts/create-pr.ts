import { Octokit } from '@octokit/rest';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function main() {
  const owner = 'hwillGIT';
  const repo = 'IsaiahStudyInteractive';
  const branchName = 'structure-modals-and-fixes';
  const baseBranch = 'main';

  console.log('Getting GitHub access token...');
  const token = await getAccessToken();
  const octokit = new Octokit({ auth: token });

  console.log('Fetching default branch info...');
  const { data: repoData } = await octokit.repos.get({ owner, repo });
  const defaultBranch = repoData.default_branch;
  console.log(`Default branch: ${defaultBranch}`);

  const { data: refData } = await octokit.git.getRef({ owner, repo, ref: `heads/${defaultBranch}` });
  const baseSha = refData.object.sha;
  console.log(`Base SHA: ${baseSha}`);

  console.log(`Creating branch '${branchName}'...`);
  try {
    await octokit.git.createRef({
      owner, repo,
      ref: `refs/heads/${branchName}`,
      sha: baseSha
    });
    console.log('Branch created.');
  } catch (e: any) {
    if (e.status === 422) {
      console.log('Branch already exists, updating...');
      await octokit.git.updateRef({
        owner, repo,
        ref: `heads/${branchName}`,
        sha: baseSha,
        force: true
      });
    } else {
      throw e;
    }
  }

  console.log('Pushing local commits to GitHub...');
  
  const { execSync } = await import('child_process');
  
  const tokenUrl = `https://x-access-token:${token}@github.com/${owner}/${repo}.git`;
  
  try {
    execSync(`git remote set-url origin "${tokenUrl}"`, { stdio: 'pipe' });
    execSync(`git push origin HEAD:refs/heads/${branchName} --force`, { stdio: 'pipe' });
    console.log('Push successful!');
  } finally {
    execSync(`git remote set-url origin "https://github.com/${owner}/${repo}"`, { stdio: 'pipe' });
  }

  console.log('Creating pull request...');
  const { data: pr } = await octokit.pulls.create({
    owner, repo,
    title: 'Add structure modals for chapters 13-55 & fix modal display',
    head: branchName,
    base: defaultBranch,
    body: `## Changes

### Structure Modals for Chapters 13-55
- Added \`structureModal\` data to all 43 chapter JSON files (chapters 13-55)
- Each structure modal includes chiastic/concentric/linear literary pattern visualizations
- Content includes: title, subtitle, intro, color-coded sections with labels and indentation, parallels explanations, and closing summaries
- Updated ChapterTemplate.tsx to render structure modals from JSON data with proper TypeScript types

### Modal Display Fix (All Chapters)
- Fixed modal overlay so the header and close (X) button are always visible
- Modal content now scrolls within the viewport instead of pushing the top off-screen
- Applied fix to all 12 custom structure modals (chapters 1-12) and the template-based modal (chapters 13-55)
- Also fixed the verse detail modal in ChapterTemplate

### TypeScript Improvements
- Replaced \`any\` types with proper typed interfaces (\`StructureSection\`, \`StructureParallel\`, \`StructureModalData\`)
`
  });

  console.log(`\nPull request created successfully!`);
  console.log(`PR #${pr.number}: ${pr.title}`);
  console.log(`URL: ${pr.html_url}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

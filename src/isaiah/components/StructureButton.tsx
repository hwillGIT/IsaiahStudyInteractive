interface StructureButtonProps {
  onClick: () => void;
  subtitle: string;
}

export function StructureButton({ onClick, subtitle }: StructureButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md p-4 mb-6 hover:shadow-lg transition-shadow flex items-center justify-between"
    >
      <span className="flex items-center gap-2">
        <span className="text-xl">📖</span>
        <span className="font-semibold">View Chapter Structure</span>
      </span>
      <span className="text-sm opacity-90">{subtitle}</span>
    </button>
  );
}

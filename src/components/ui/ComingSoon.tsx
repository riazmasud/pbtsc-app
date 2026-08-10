interface ComingSoonProps {
  icon: string;
  title: string;
  description: string;
}

export default function ComingSoon({ icon, title, description }: ComingSoonProps) {
  return (
    <div className="text-center py-10 px-4">
      <p className="text-4xl mb-3">{icon}</p>
      <span className="inline-block mb-2 text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
        Coming Soon
      </span>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">{description}</p>
    </div>
  );
}

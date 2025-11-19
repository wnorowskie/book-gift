interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
}

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h3 className="text-sm font-medium text-slate-600">{label}</h3>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {description && (
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
}

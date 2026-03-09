export default function UnitCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
      <div className="h-52 bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-slate-200 rounded w-20" />
          <div className="h-7 bg-slate-200 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}

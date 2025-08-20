import { useState, useEffect } from "react";

const CATEGORIES = ["Tents","Tables","Chairs","Linens","Heaters"];

export default function FilterBar({ value, onChange }){
  const [category, setCategory] = useState(value?.category || "");
  const [min, setMin] = useState(value?.min || "");
  const [max, setMax] = useState(value?.max || "");

  // Keep external state in sync when parent changes pagination or such
  useEffect(()=>{ setCategory(value?.category || ""); setMin(value?.min || ""); setMax(value?.max || ""); }, [value?.category, value?.min, value?.max]);

  return (
    <form
      className="flex flex-wrap gap-3 items-end mb-4"
      onSubmit={(e)=>{ e.preventDefault(); onChange?.(v=>({ ...v, page:1, category, min, max })); }}
    >
      <label className="flex flex-col text-sm">
        <span className="mb-1">Category</span>
        <select aria-label="Category" className="border rounded-lg px-3 py-2" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <label className="flex flex-col text-sm">
        <span className="mb-1">Min $/day</span>
        <input inputMode="numeric" className="border rounded-lg px-3 py-2 w-28" value={min} onChange={e=>setMin(e.target.value)} />
      </label>
      <label className="flex flex-col text-sm">
        <span className="mb-1">Max $/day</span>
        <input inputMode="numeric" className="border rounded-lg px-3 py-2 w-28" value={max} onChange={e=>setMax(e.target.value)} />
      </label>
      <button type="submit" className="rounded-lg bg-gray-900 text-white px-4 py-2">Apply</button>
    </form>
  );
}

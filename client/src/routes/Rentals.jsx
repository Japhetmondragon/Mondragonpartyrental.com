import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { api } from "../api/client";
import Card from "../components/ui/Card";
import FilterBar from "../components/ui/FilterBar";

export default function Rentals(){
  const [params, setParams] = useState({ page:1, limit:24, category:"", min:"", max:"" });

  const queryKey = useMemo(() => ["items", params], [params]);
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const qs = new URLSearchParams(Object.fromEntries(
        Object.entries(params).filter(([,v]) => v !== "" && v !== undefined)
      )).toString();
      const { data } = await api.get(`/items?${qs}`);
      return data;
    }
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Rentals</h1>
      <FilterBar value={params} onChange={setParams} />
      {isLoading ? <div>Loading…</div> :
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.items?.map(it => <Card key={it._id} item={it} />)}
        </div>
      }
    </section>
  );
}

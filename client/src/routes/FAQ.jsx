import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export default function FAQ(){
  const { data, isLoading } = useQuery({
    queryKey:["faq"],
    queryFn: async ()=> (await api.get("/faq")).data
  });

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      {isLoading ? <div>Loading…</div> :
        <div className="divide-y">
          {data?.faqs?.map(f=>(
            <details key={f._id} className="py-3 group">
              <summary className="cursor-pointer font-medium flex items-center justify-between">
                {f.question}
                <span className="ml-3 text-gray-500 group-open:rotate-180 transition-transform" aria-hidden>⌄</span>
              </summary>
              <p className="mt-2 text-gray-700">{f.answer}</p>
            </details>
          ))}
        </div>
      }
    </section>
  );
}

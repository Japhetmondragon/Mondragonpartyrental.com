import LeadForm from "../components/forms/LeadForm";
import { useBooking } from "../context/bookingContext.jsx";

export default function Booking(){
  const { items, updateQty, removeItem, clear } = useBooking();

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Get Your Custom Quote</h1>
        <p className="text-gray-600 mb-6">Tell us your date, guest count, and location—we’ll confirm availability and pricing.</p>
        <LeadForm selectedItems={items} onSubmitted={clear} />
        <p className="mt-3 text-xs text-gray-500">Protected by reCAPTCHA and Google’s Privacy Policy.</p>
      </div>

      <aside aria-label="Selected items summary" className="border rounded-2xl p-4 h-fit sticky top-20">
        <h2 className="font-semibold mb-3">Your Items</h2>
        {items.length === 0 ? <p className="text-sm text-gray-600">No items yet. Add from the Rentals page.</p> :
          <ul className="space-y-3">
            {items.map(x=>(
              <li key={x._id} className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-medium">{x.name}</div>
                  <div className="text-sm text-gray-600">${x.pricePerDay}/day</div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="sr-only" htmlFor={`qty-${x._id}`}>Quantity</label>
                  <input id={`qty-${x._id}`} className="input w-20" type="number" min="1" value={x.qty} onChange={e=>updateQty(x._id, Number(e.target.value)||1)} />
                  <button className="text-red-600 underline" onClick={()=>removeItem(x._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        }
      </aside>
    </section>
  );
}

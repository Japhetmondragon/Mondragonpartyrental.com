import { useBooking } from "../../context/bookingContext.jsx";

export default function Card({ item }){
  const { addItem } = useBooking();
  const img = item.images?.[0];

  return (
    <article className="border rounded-2xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-600">
      <a href={`/rentals/${item.slug}`} className="block">
        <img
          loading="lazy"
          src={img?.url || "/placeholder.jpg"}
          alt={img?.alt || item.name}
          className="w-full h-48 object-cover"
        />
      </a>
      <div className="p-4">
        <h2 className="font-semibold text-lg">
          <a href={`/rentals/${item.slug}`} className="hover:underline">{item.name}</a>
        </h2>
        <p className="text-sm text-gray-600">{item.category}</p>
        <p className="mt-1 font-bold">${item.pricePerDay}/day</p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={()=>addItem(item, 1)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >Add to Quote</button>
          <a href="/booking" className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 focus:outline-none focus:ring-2">Checkout</a>
        </div>
      </div>
    </article>
  );
}

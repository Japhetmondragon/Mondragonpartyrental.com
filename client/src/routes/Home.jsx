import SEO from "../components/SEO";

export default function Home() {
  return (
    <>
        <SEO
        title="Party Rentals & Catering in Los Angeles | LA Party & Catering"
        description="Tents, tables, chairs, linens & catering. On-time delivery across Los Angeles. Get a fast quote today."
        og={{ title: "LA Party & Catering" }}
      />
      <section className="relative bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Party Rentals & Catering that <span className="underline decoration-blue-600">show up on time.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Friendly, reliable service for birthdays, weddings, and corporate events—any size, anywhere in LA.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="/" className="rounded-xl bg-blue-600 text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">Get a Fast Quote</a>
              <a href="/" className="rounded-xl border px-5 py-3 focus:outline-none focus:ring-2">Browse Rentals</a>
            </div>
          </div>
          <img loading="lazy" alt="Outdoor party setup with tent, tables, and chairs" className="w-full h-auto rounded-2xl shadow"
               src="/hero-party.jpg" />
        </div>
      </section>
    </>
  );
}

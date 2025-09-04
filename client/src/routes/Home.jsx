import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah Chen",
      event: "Wedding Reception",
      text: "Absolutely perfect! Everything arrived on time and looked stunning. Our guests couldn't stop complimenting the setup.",
      rating: 5
    },
    {
      name: "Mike Rodriguez", 
      event: "Corporate Event",
      text: "Professional service from start to finish. They made our company celebration seamless and memorable.",
      rating: 5
    },
    {
      name: "Jennifer Williams",
      event: "Birthday Party",
      text: "The team went above and beyond. Amazing quality rentals and the most reliable service in San Diego!",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SEO
        title="Party Rentals & Catering in San Diego | Party & Catering"
        description="Premium tents, tables, chairs, linens & catering. On-time delivery across San Diego. Get a fast quote today."
        og={{ 
          title: "LA Party & Catering - Premium Event Rentals",
          description: "Transform your events with premium rentals and reliable service in San Diego"
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Mondragon Party Rentals & Catering",
          "description": "Premium party rentals and catering services in San Diego",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "San Diego",
            "addressRegion": "CA"
          },
          "telephone": "(555) 123-4567",
          "url": "https://lapartycatering.com"
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-teal-50">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="bg-gradient-to-r from-teal-light to-teal-deep bg-clip-text text-transparent text-4xl lg:text-6xl font-extrabold leading-tight">
                  Party Rentals & Catering that{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-teal-mid to-teal-light bg-clip-text text-transparent">
                      show up on time.
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                      <path d="M2 10C100 2 200 2 298 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6C8C88"/>
                          <stop offset="100%" stopColor="#F6B68E"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </h1>
                
                <p className="text-xl text-stone-mid leading-relaxed max-w-lg">
                  Friendly, reliable service for birthdays, weddings, and corporate events—any size, anywhere in San Diego.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/booking" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-teal-mid to-teal-deep rounded-xl font-semibold text-lg hover:from-teal-mid hover:to-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-light focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10 text-white">Get a Fast Quote</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-light to-teal-mid rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link 
                  to="/rentals" 
                  className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold text-lg hover:border-teal-light hover:text-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-light focus:ring-offset-2 transition-all duration-300 bg-white/80 backdrop-blur"
                >
                  Browse Rentals
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-deep">500+</div>
                  <div className="text-sm text-stone-mid">Events Catered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-deep">24hr</div>
                  <div className="text-sm text-stone-mid">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-deep">100%</div>
                  <div className="text-sm text-stone-mid">On-Time Delivery</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-peach-sunset to-teal-mid rounded-3xl transform rotate-3 opacity-20"></div>
              <img 
                loading="lazy" 
                alt="Elegant outdoor party setup with tent, tables, and chairs" 
                className="bg-gradient-to-r from-teal-deep to-rosy-dusty bg-clip-text text-transparent relative w-full h-auto rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500" 
                src="\3.png" 
              />
              
              {/* Floating elements */}
              <div className="absolute top-14 -right-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                  <span className=" bg-gradient-to-r from-teal-deep to-peach-sunset bg-clip-text text-transparent text-sm font-medium">Available Today</span>
                </div>
              </div>
              
              <div className="absolute bottom-14 -left-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-peach-sunset">4.9★</div>
                  <div className="text-xs text-stone-mid">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-teal-deep mb-4">
              Why Choose Mondragon Party Rentals & Catering?
            </h2>
            <p className="text-xl text-stone-mid max-w-2xl mx-auto">
              We're not just another rental company. We're your event success partners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="On-Time Guarantee"
              description="We arrive when we say we will. No exceptions, no excuses. Your event timing is sacred to us."
            />
            
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Premium Quality"
              description="Restaurant-grade equipment and pristine linens. Your guests will notice the difference."
            />
            
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Full-Service Support"
              description="From planning to cleanup, we handle every detail so you can enjoy your own event."
            />
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-teal-deep mb-4">
              Popular Rental Categories
            </h2>
            <p className="text-xl text-stone-mid">
              Everything you need for your perfect event
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard 
              title="Themed and Specialty Rentals"
              image="/5.png"
              description="Weather protection with style"
              href="/rentals?category=Tents"
            />
            <CategoryCard 
              title="Tables & Chairs"
              image="/3.png" 
              description="Seating for every occasion"
              href="/rentals?category=Tables"
            />
            <CategoryCard 
              title="Linens & Décor"
              image="/4.png"
              description="Transform your space"
              href="/rentals?category=Linens"
            />
            <CategoryCard 
              title="Outdoor & Ceremony"
              image="/2.png"
              description="Comfort in any weather"
              href="/rentals?category=Heaters"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-teal-deep mb-16">
            What Our Clients Say
          </h2>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-50 to-cream-butter rounded-2xl p-8 lg:p-12">
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-xl lg:text-2xl text-stone-mid mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                
                <div>
                  <div className="font-semibold text-teal-deep">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-stone-mid">
                    {testimonials[currentTestimonial].event}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-teal-deep' : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-deep to-peach-sunset">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get a personalized quote in minutes. No hidden fees, no surprises—just honest pricing for exceptional service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/booking"
              className="px-8 py-4 bg-white rounded-xl font-semibold text-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-deep transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Your Quote Now
            </Link>
            <Link 
              to="/rentals"
              className="group px-8 py-4 border-2 border-white rounded-xl font-semibold text-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-deep transition-all duration-300"
            >
              <span className="text-white group-hover:text-teal-mid">Browse Our Inventory</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group text-center p-8 rounded-2xl bg-white shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-pale text-teal-deep rounded-xl mb-6 group-hover:bg-teal-mid group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-teal-deep mb-3">{title}</h3>
      <p className="text-stone-mid leading-relaxed">{description}</p>
    </div>
  );
}

function CategoryCard({ title, image, description, href }) {
  return (
    <Link 
      to={href}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg text-teal-deep mb-2 group-hover:text-teal-light transition-colors">{title}</h3>
        <p className="text-stone-mid text-sm">{description}</p>
      </div>
    </Link>
  );
}
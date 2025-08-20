import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BookingProvider } from "./context/bookingContext.jsx";

// Lazy routes
const Home    = React.lazy(() => import("./routes/Home.jsx"));
const Rentals = React.lazy(() => import("./routes/Rentals.jsx"));
const Booking = React.lazy(() => import("./routes/Booking.jsx"));
const FAQ     = React.lazy(() => import("./routes/FAQ.jsx"));
const ErrorPage = React.lazy(() => import("./routes/ErrorPage.jsx"));
const NotFound  = React.lazy(() => import("./routes/NotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={<div className="p-6">Loading…</div>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      { index: true, element: <Suspense fallback={<div className="p-6">Loading…</div>}><Home /></Suspense> },
      { path: "rentals", element: <Suspense fallback={<div className="p-6">Loading…</div>}><Rentals /></Suspense> },
      { path: "booking", element: <Suspense fallback={<div className="p-6">Loading…</div>}><Booking /></Suspense> },
      { path: "faq",     element: <Suspense fallback={<div className="p-6">Loading…</div>}><FAQ /></Suspense> },
      { path: "*",       element: <Suspense fallback={<div className="p-6">Loading…</div>}><NotFound /></Suspense> }
    ]
  }
]);

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <BookingProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </BookingProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

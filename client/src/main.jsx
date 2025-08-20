import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BookingProvider } from "./context/bookingContext.jsx";

const Home = React.lazy(() => import("./routes/Home.jsx"));
const Rentals = React.lazy(() => import("./routes/Rentals.jsx"));
const Booking = React.lazy(() => import("./routes/Booking.jsx"));
const FAQ = React.lazy(() => import("./routes/FAQ.jsx"));

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [{ index: true, element: <Home /> },
    { path: "/rentals", element: <Rentals /> },
    { path: "/booking", element: <Booking /> },
    { path: "/faq", element: <FAQ /> }
  ] }
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

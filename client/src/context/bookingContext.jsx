import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const Ctx = createContext(null);
export const useBooking = () => useContext(Ctx);

export function BookingProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("booking.items") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("booking.items", JSON.stringify(items)); }, [items]);

  const addItem = (item, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(x => x._id === item._id);
      if (idx >= 0) {
        const copy = [...prev]; copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty }; return copy;
      }
      return [...prev, { _id: item._id, name: item.name, pricePerDay: item.pricePerDay, slug: item.slug, qty }];
    });
  };
  const removeItem = id => setItems(prev => prev.filter(x => x._id !== id));
  const updateQty = (id, qty) => setItems(prev => prev.map(x => x._id === id ? { ...x, qty: Math.max(1, qty) } : x));
  const clear = () => setItems([]);

  const value = useMemo(() => ({ items, addItem, removeItem, updateQty, clear }), [items]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

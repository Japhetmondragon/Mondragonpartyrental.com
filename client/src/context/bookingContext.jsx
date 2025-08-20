import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";

const BookingContext = createContext(null);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export function BookingProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("booking.items");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to load booking items from localStorage:', error);
      return [];
    }
  });

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem("booking.items", JSON.stringify(items));
    } catch (error) {
      console.warn('Failed to save booking items to localStorage:', error);
    }
  }, [items]);

  const addItem = (item, qty = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(x => x._id === item._id);
      
      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + qty
        };
        
        toast.success(`Updated ${item.name} quantity`, {
          duration: 2000,
          icon: '✏️',
        });
        
        return updated;
      } else {
        // Add new item
        const newItem = {
          _id: item._id,
          name: item.name,
          pricePerDay: item.pricePerDay,
          pricePerWeek: item.pricePerWeek,
          slug: item.slug,
          category: item.category,
          qty
        };
        
        toast.success(`Added ${item.name} to quote`, {
          duration: 2000,
          icon: '➕',
        });
        
        return [...prev, newItem];
      }
    });
  };

  const removeItem = (id) => {
    setItems(prev => {
      const item = prev.find(x => x._id === id);
      if (item) {
        toast.success(`Removed ${item.name} from quote`, {
          duration: 2000,
          icon: '🗑️',
        });
      }
      return prev.filter(x => x._id !== id);
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    
    setItems(prev => prev.map(x => 
      x._id === id ? { ...x, qty: Math.max(1, qty) } : x
    ));
  };

  const clear = () => {
    setItems([]);
    toast.success('Quote cleared', {
      duration: 2000,
      icon: '🧹',
    });
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => sum + (item.pricePerDay * item.qty), 0);
  };

  const getItemById = (id) => {
    return items.find(item => item._id === id);
  };

  const isInCart = (id) => {
    return items.some(item => item._id === id);
  };

  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateQty,
    clear,
    getTotalItems,
    getTotalPrice,
    getItemById,
    isInCart,
    // Computed values
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
  }), [items]);

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}
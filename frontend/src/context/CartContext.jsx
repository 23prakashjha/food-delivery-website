import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* =========================
   CREATE CONTEXT
========================= */
const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  clearCart: () => {},
  totalPrice: 0,
  cartCount: 0,
});

/* =========================
   CUSTOM HOOK
========================= */
export const useCart = () => {
  return useContext(CartContext);
};

/* =========================
   PROVIDER
========================= */
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /* -------------------------
     LOAD CART FROM STORAGE
  -------------------------- */
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from storage", error);
      localStorage.removeItem("cart");
    }
  }, []);

  /* -------------------------
     SAVE CART TO STORAGE
  -------------------------- */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* -------------------------
     ADD TO CART
  -------------------------- */
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);

      if (existing) {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  /* -------------------------
     REMOVE ITEM
  -------------------------- */
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  /* -------------------------
     INCREASE QTY
  -------------------------- */
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        i._id === id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  /* -------------------------
     DECREASE QTY
  -------------------------- */
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i._id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  /* -------------------------
     CLEAR CART
  -------------------------- */
  const clearCart = () => setCart([]);

  /* -------------------------
     TOTAL PRICE (FIXED)
  -------------------------- */
  const totalPrice = cart.reduce((sum, item) => {
    const price =
      item.discountPrice !== undefined && item.discountPrice !== null
        ? item.discountPrice
        : item.originalPrice;

    return sum + price * item.quantity;
  }, 0);

  /* -------------------------
     TOTAL ITEMS COUNT
  -------------------------- */
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /* -------------------------
     PROVIDER VALUE
  -------------------------- */
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

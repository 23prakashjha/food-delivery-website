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
   HELPER: get cart item key
========================= */
const cartItemKey = (item) => `${item._id}__${item.size || ""}`;

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
     item must include: _id, name, image, originalPrice, size, unitPrice
  -------------------------- */
  const addToCart = (item) => {
    setCart((prev) => {
      const key = cartItemKey(item);
      const existing = prev.find((i) => cartItemKey(i) === key);

      if (existing) {
        return prev.map((i) =>
          cartItemKey(i) === key
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          _id: item._id,
          name: item.name,
          image: item.image,
          originalPrice: item.originalPrice,
          discountPrice: item.discountPrice,
          category: item.category,
          size: item.size || "",
          unitPrice: item.unitPrice,
          quantity: 1,
        },
      ];
    });
  };

  /* -------------------------
     REMOVE ITEM
  -------------------------- */
  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter((i) => !(i._id === id && (i.size || "") === (size || "")))
    );
  };

  /* -------------------------
     INCREASE QTY
  -------------------------- */
  const increaseQty = (id, size) => {
    setCart((prev) =>
      prev.map((i) =>
        i._id === id && (i.size || "") === (size || "")
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  /* -------------------------
     DECREASE QTY
  -------------------------- */
  const decreaseQty = (id, size) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i._id === id && (i.size || "") === (size || "")
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
     TOTAL PRICE
  -------------------------- */
  const totalPrice = cart.reduce((sum, item) => {
    const price = item.unitPrice ?? item.discountPrice ?? item.originalPrice;
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

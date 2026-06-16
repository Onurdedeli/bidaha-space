"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "biletspace_cart_v1";

interface CartState {
  lines: CartLine[];
}

type Action =
  | { type: "ADD"; line: CartLine }
  | { type: "REMOVE"; key: string }
  | { type: "QTY"; key: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; lines: CartLine[] };

/** Unique key for a line = itemId + sorted options */
function lineKey(line: Pick<CartLine, "itemId" | "options">): string {
  const opts = line.options
    ? Object.entries(line.options)
        .sort()
        .map(([k, v]) => `${k}:${v}`)
        .join("|")
    : "";
  return `${line.itemId}__${opts}`;
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { lines: action.lines };
    case "ADD": {
      const key = lineKey(action.line);
      const existing = state.lines.find((l) => lineKey(l) === key);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            lineKey(l) === key ? { ...l, quantity: l.quantity + action.line.quantity } : l,
          ),
        };
      }
      return { lines: [...state.lines, action.line] };
    }
    case "REMOVE":
      return { lines: state.lines.filter((l) => lineKey(l) !== action.key) };
    case "QTY":
      return {
        lines: state.lines
          .map((l) => (lineKey(l) === action.key ? { ...l, quantity: Math.max(0, action.quantity) } : l))
          .filter((l) => l.quantity > 0),
      };
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: CartLine) => void;
  remove: (key: string) => void;
  setQty: (key: string, quantity: number) => void;
  clear: () => void;
  keyOf: (line: Pick<CartLine, "itemId" | "options">) => string;
  ready: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", lines: JSON.parse(raw) as CartLine[] });
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* ignore */
    }
  }, [state.lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((s, l) => s + l.quantity, 0);
    const subtotal = state.lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0);
    return {
      lines: state.lines,
      count,
      subtotal,
      add: (line) => dispatch({ type: "ADD", line }),
      remove: (key) => dispatch({ type: "REMOVE", key }),
      setQty: (key, quantity) => dispatch({ type: "QTY", key, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
      keyOf: lineKey,
      ready,
    };
  }, [state.lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

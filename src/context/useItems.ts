import { useContext } from "react";
import { ItemsContext, ItemsDispatchContext } from "./ItemsContext";

export function useItems() {
  const context = useContext(ItemsContext);
  if (!context) { throw new Error('useItems must be used within a Provider') }
  return context;
};

export function useItemsDispatch() {
  const context = useContext(ItemsDispatchContext);
  if (!context) { throw new Error('useItemsDispatch must be used within a Provider') }
  return context;
}
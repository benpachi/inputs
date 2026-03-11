import { createContext, useContext, useReducer, type ReactNode, type ActionDispatch } from 'react';
import type { CanvasItem } from '../interface/canvas-item';

interface State {
  items: CanvasItem[];
  // I want to allow for multiple selections down the line, hence the array. For now it's just going to be one item at a time.
  selectedIds: string[];
}
const initialState: State = {
  items: [],
  selectedIds: []
}

const ItemsContext = createContext<State | null>(null);
const ItemsDispatchContext = createContext<ActionDispatch<[action: ItemsAction]> | null>(null);

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    itemsReducer,
    initialState
  );

  return (
    <ItemsContext value={state}>
      <ItemsDispatchContext value={dispatch}>
        {children}
      </ItemsDispatchContext>
    </ItemsContext>
  );
}


type ItemsAction =
  | { type: "added"; item: CanvasItem }
  | { type: "changed"; item: CanvasItem }
  | { type: "deleted"; itemId: string }
  | { type: "selected"; itemId: string }
  | { type: "deselected"; itemId: string }

function itemsReducer(state: State, action: ItemsAction) {
  switch (action.type) {
    case 'added': {
      return {...state, items: [...state.items, action.item], selectedIds: [action.item.id]};
    }
    case 'changed': {
      return {
        ...state, 
        items: state.items.map(item => {
          if (item.id === action.item.id) {
            return action.item;
          } else {
            return item;
          }
        })
      };
    }
    case 'deleted': {
      return {...state, items: state.items.filter(i => i.id !== action.itemId), selectedIds: []};
    }
    case 'selected': {
      return {...state, selectedIds: [action.itemId]};
    }
    case 'deselected': {
      return {...state, selectedIds: []};
    }
    // Set off a TypeScript error if some other type is able to make it here
    default: {
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
    }
  }
}


// These hooks are to eliminate null as a possible type for context. They are also just more descriptively named.
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
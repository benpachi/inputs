import { createContext, useContext, useReducer, type ReactNode, type ActionDispatch } from 'react';
import type { CanvasItem } from '../interface/canvas-item';

interface State {
  items: CanvasItem[];
  selectedId: string;
}
const initialState: State = {
  items: [],
  selectedId: ''
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
  | { type: "added"; kind: string }
  | { type: "changed"; item: CanvasItem }
  | { type: "deleted"; itemId: string }
  | { type: "duplicated"; item: CanvasItem }
  | { type: "selected"; itemId: string }
  | { type: "deselected"; itemId: string }

function itemsReducer(state: State, action: ItemsAction) {
  switch (action.type) {
    case 'added': {
      const newItem: CanvasItem = createItem(action.kind);
      return {...state, items: [...state.items, newItem], selectedId: newItem.id};
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
      return {...state, items: state.items.filter(i => i.id !== action.itemId), selectedId: ''};
    }
    case 'duplicated': {
      const newItem: CanvasItem = {...action.item, id: crypto.randomUUID(), x: action.item.x+15, y: action.item.y+15};
      return {...state, items: [...state.items, newItem], selectedId: newItem.id};
    }
    case 'selected': {
      return {...state, selectedId: action.itemId};
    }
    case 'deselected': {
      return {...state, selectedId: ''};
    }
    // Set off a TypeScript error if some other type is able to make it here
    default: {
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
    }
  }
}

function createItem(kind: string): CanvasItem {
  switch (kind) {
    case 'rectangle': {
      return {
        name: 'Rectangle',
        kind: 'rectangle',
        id: crypto.randomUUID(),
        rotation: 0,
        label: '',
        width: 50,
        height: 50,
        x: 200,
        y: 150,
        fillColor: "#000000",
        strokeColor: "#ff0000",
        strokeWidth: 5,
        borderRadius: 0
      };
    }
    case 'ellipse': {
      return {
        name: 'Ellipse',
        kind: 'ellipse',
        id: crypto.randomUUID(),
        rotation: 0,
        label: '',
        width: 50,
        height: 50,
        x: 200,
        y: 150,
        fillColor: "#000000",
        strokeColor: "#ff0000",
        strokeWidth: 5,
        borderRadius: 0
      };
    }
    case 'd-button': {
      return {
        name: 'D-Button',
        kind: 'd-button',
        id: crypto.randomUUID(),
        rotation: 0,
        label: '',
        pointLength: 25,
        armWidth: 50,
        armLength: 50,
        x: 200,
        y: 150,
        fillColor: "#000000",
        strokeColor: "#ff0000",
        strokeWidth: 5, 
        borderRadius: 0
      }
    }
    case 'd-pad': {
      return {
        name: 'D-Pad',
        kind: 'd-pad',
        id: crypto.randomUUID(),
        rotation: 0,
        label: '',
        armWidth: 50,
        armLength: 50,
        x: 200,
        y: 150,
        fillColor: "#000000",
        strokeColor: "#ff0000",
        strokeWidth: 5, 
        borderRadius: 0
      }
    }
    case 'plus': {
      return {
        name: 'Plus',
        kind: 'plus',
        id: crypto.randomUUID(),
        rotation: 0,
        label: '',
        armWidth: 50,
        armLength: 50,
        x: 200,
        y: 150,
        fillColor: "#000000",
        strokeColor: "#ff0000",
        strokeWidth: 5, 
        borderRadius: 0
      }
    }
    default: {
      throw new Error('Item kind not supported');
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
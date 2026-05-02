import { useReducer, useEffect, createContext, type ReactNode, type ActionDispatch } from 'react';
import type { CanvasItem } from '../types/canvas-item';

export interface State {
  items: CanvasItem[];
  // todo: make this an array selectedIds instead (enable applying changes to multiple items at once)
  selectedId: string;
}

const initialState: State = {
  items: JSON.parse(localStorage.getItem('items') || '[]'),
  selectedId: ''
}

const ItemsContext = createContext<State | null>(null);
const ItemsDispatchContext = createContext<ActionDispatch<[action: ItemsAction]> | null>(null);

const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    itemsReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(state.items))
  }, [state.items]);

  return (
    <ItemsContext value={state}>
      <ItemsDispatchContext value={dispatch}>
        {children}
      </ItemsDispatchContext>
    </ItemsContext>
  );
}

export type ItemsAction =
  | { type: "set"; items: CanvasItem[] }
  | { type: "added"; kind: string }
  | { type: "changed"; item: CanvasItem }
  | { type: "deleted"; itemId: string }
  | { type: "duplicated"; item: CanvasItem }
  | { type: "selected"; itemId: string } 
  | { type: "deselected"; itemId: string }

function itemsReducer(state: State, action: ItemsAction) {
  switch (action.type) {
    case 'set': {
      return {...state, items: action.items, selectedId: ''};
    }
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

// todo: put this somewhere else I just don't know how to go about organizing right now
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
        fillOff: "#2e2e2e",
        fillOn: "#e0e0e0",
        strokeOff: "#0d0d0d",
        strokeOn: "#e0e0e0",
        strokeWidth: 5,
        radius: 5,
        activeBinding: null,
        moveBinding: null,
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
        fillOff: "#2e2e2e",
        fillOn: "#e0e0e0",
        strokeOff: "#0d0d0d",
        strokeOn: "#e0e0e0",
        strokeWidth: 5,
        radius: 0,
        activeBinding: null,
        moveBinding: null,
      };
    }
    case 'd-button': {
      return {
        name: 'D-Button',
        kind: 'd-button',
        id: crypto.randomUUID(),
        rotation: 0,
        label: '',
        pointLength: 15,
        armWidth: 30,
        armLength: 30,
        x: 200,
        y: 150,
        fillOff: "#2e2e2e",
        fillOn: "#e0e0e0",
        strokeOff: "#0d0d0d",
        strokeOn: "#e0e0e0",
        strokeWidth: 5, 
        radius: 5,
        activeBinding: null,
        moveBinding: null,
      }
    }
    case 'd-pad': {
      return {
        name: 'D-Pad',
        kind: 'd-pad',
        id: crypto.randomUUID(),
        rotation: 0,
        label: '',
        armWidth: 30,
        armLength: 60,
        x: 200,
        y: 150,
        fillOff: "#2e2e2e",
        fillOn: "#e0e0e0",
        strokeOff: "#0d0d0d",
        strokeOn: "#e0e0e0",
        strokeWidth: 5, 
        radius: 5,
        moveBinding: null,
        upActiveBinding: null,
        rightActiveBinding: null,
        downActiveBinding: null,
        leftActiveBinding: null,
        strokeActiveBinding: null,
      }
    }
    case 'plus': {
      return {
        name: 'Plus',
        kind: 'plus',
        id: crypto.randomUUID(),
        rotation: 0,
        label: '',
        armWidth: 30,
        armLength: 60,
        x: 200,
        y: 150,
        fillOff: "#2e2e2e",
        fillOn: "#e0e0e0",
        strokeOff: "#0d0d0d",
        strokeOn: "#e0e0e0",
        strokeWidth: 5, 
        radius: 5,
        activeBinding: null,
        moveBinding: null,
      }
    }
    default: {
      throw new Error('Item kind not supported');
    }
  }
}

export { ItemsProvider, ItemsContext, ItemsDispatchContext }
import { useReducer, useEffect, createContext, type ReactNode, type ActionDispatch } from 'react';
import type { DisplayItem } from '../types/display-item';

export interface State {
  items: DisplayItem[];
  selectedIds: string[];
}

const initialState: State = {
  items: JSON.parse(localStorage.getItem('items') || '[]'),
  selectedIds: [] as string[]
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
  | { type: "added_item"; kind: string }
  | { type: "changed_item"; item: DisplayItem }
  | { type: "deleted_selected" }
  | { type: "duplicated_selected"; }
  | { type: "added_selection"; id: string } 
  | { type: "set_single_selection"; id: string }
  | { type: "removed_selection"; id: string }
  | { type: "cleared_selections"; }

function itemsReducer(state: State, action: ItemsAction) {
  switch (action.type) {
    case 'added_item': {
      const newItem: DisplayItem = createItem(action.kind);
      return {...state, items: [...state.items, newItem], selectedIds: [newItem.id]};
    }
    case 'changed_item': {
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
    case 'deleted_selected': {
      return {...state, items: state.items.filter((item) => state.selectedIds.includes(item.id)), selectedIds: [] as string[]};
    }
    case 'duplicated_selected': {
      const newState = { ...state, selectedIds: [] as string[]}
      state.selectedIds.forEach((selectedId) => {
        const selectedItem = state.items.find((item) => item.id === selectedId);
        if (selectedItem !== undefined) {
          const newID = crypto.randomUUID();
          const newItem = {...selectedItem, id: newID, x: selectedItem.x + 15, y: selectedItem.y + 15}
          newState.items.push(newItem);
          newState.selectedIds.push(newID);
        }
      });
      return newState;
    }
    case 'added_selection': {
      if (state.selectedIds.includes(action.id)) {
        return state;
      } else {
        return {...state, selectedIds: [...state.selectedIds, action.id]};
      }
    }
    case 'set_single_selection': {
      return {...state, selectedIds: [action.id]};
    }
    case 'removed_selection': {
      return {...state, selectedIds: state.selectedIds.filter((id) => id !== action.id)}
    }
    case 'cleared_selections': {
      return {...state, selectedIds: [] as string[]};
    }
    // Set off a TypeScript error if some other type is able to make it here
    default: {
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
    }
  }
}

// todo: put this somewhere else I just don't know how to go about organizing right now
function createItem(kind: string): DisplayItem {
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
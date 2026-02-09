import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CanvasItem } from '../interface/canvas-item';

interface DisplayContextType {
  items: CanvasItem[];
  selectedID: string;  
  setSelectedID: (id: string) => void;
  addItem: (newItem: CanvasItem) => string;
  updateItem: (id: string, updatedItem: CanvasItem) => void;
  removeItem: (id: string) => void;
}

const DisplayContext = createContext<DisplayContextType | undefined>(undefined);

export const DisplayProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [selectedID, setSelectedID] = useState('');

  const addItem = (newItem: CanvasItem): string => {
    setItems([...items, newItem]);
    return newItem.id;
  }

  const updateItem = (id: string, updatedItem: CanvasItem) => {
    setItems((prev) => prev.map((item) => item.id === id ? updatedItem : item));
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const contextValue: DisplayContextType = {
    items,
    selectedID,
    setSelectedID,
    addItem,
    updateItem,
    removeItem,
  };

  return (
    <DisplayContext.Provider value={contextValue}>
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplay = () => {
  const context = useContext(DisplayContext);
  if (context === undefined) {
    throw new Error('useDisplay must be used within a DisplayProvider');
  }
  return context;
};
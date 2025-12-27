import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DisplayItem } from '../interface/display-item';

interface DisplayContextType {
  elements: DisplayItem[];
  selectedID: string;  
  setSelectedID: (id: string) => void;
  addElement: (newItem: DisplayItem) => string;
  updateElement: (id: string, updatedItem: DisplayItem) => void;
  removeElement: (removeID: string) => void;
}

const DisplayContext = createContext<DisplayContextType | undefined>(undefined);

export const DisplayProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<DisplayItem[]>([]);
  const [selectedID, setSelectedID] = useState('');

  const addElement = (newItem: DisplayItem): string => {
    setElements([...elements, newItem]);
    return newItem.id;
  }

  const updateElement = (id: string, updatedItem: DisplayItem) => {
    setElements((prev) => prev.map((element) => element.id === id ? updatedItem : element));
  }

  const removeElement = (removeID: string) => {
    setElements((prev) => prev.filter((element) => element.id !== removeID));
  }

  const contextValue: DisplayContextType = {
    elements,
    selectedID,
    setSelectedID,
    addElement,
    updateElement,
    removeElement,
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

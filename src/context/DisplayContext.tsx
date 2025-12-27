import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DisplayItem } from '../interface/display-item';

interface DisplayContextType {
  elements: DisplayItem[];
  selectedIndex: number;
  addElement: (newItem: DisplayItem) => number;
  updateElement: (index: number, updatedItem: DisplayItem) => void;
  removeElement: (removeIndex: number) => void;
  selectElement: (index: number) => void;
}

const DisplayContext = createContext<DisplayContextType | undefined>(undefined);

export const DisplayProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<DisplayItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const addElement = (newItem: DisplayItem): number => {
    setElements([...elements, newItem]);
    return elements.length;
  }

  const updateElement = (index: number, updatedItem: DisplayItem) => {
    setElements((prev) => prev.map((element, i) => i === index ? updatedItem : element));
  }

  const removeElement = (removeIndex: number) => {
    setElements((prev) => prev.filter((_, index) => index !== removeIndex));
  }

  const selectElement = (index: number) => {
    setSelectedIndex(index);
  }

  const contextValue: DisplayContextType = {
    elements,
    selectedIndex,
    addElement,
    updateElement,
    removeElement,
    selectElement,
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

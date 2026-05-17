import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface ComparisonContextType {
  comparisonList: Product[];
  toggleComparison: (product: Product) => void;
  isInComparison: (productId: string) => boolean;
  clearComparison: () => void;
  comparisonCount: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparisonList, setComparisonList] = useState<Product[]>([]);

  const toggleComparison = (product: Product) => {
    setComparisonList(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      if (prev.length >= 4) {
        alert("Maksimal 4 produk untuk dibandingkan");
        return prev;
      }
      return [...prev, product];
    });
  };

  const isInComparison = (productId: string) => {
    return comparisonList.some(item => item.id === productId);
  };

  const clearComparison = () => setComparisonList([]);

  const comparisonCount = comparisonList.length;

  return (
    <ComparisonContext.Provider value={{ comparisonList, toggleComparison, isInComparison, clearComparison, comparisonCount }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) throw new Error('useComparison must be used within a ComparisonProvider');
  return context;
};

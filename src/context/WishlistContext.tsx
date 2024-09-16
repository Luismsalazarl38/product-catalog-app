import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/types';

interface WishlistContextType {
  wishlist: { [key: number]: Product };
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<{ [key: number]: Product }>({});

  const addToWishlist = (product: Product) => {
    setWishlist(prev => ({ ...prev, [product.id]: product }));
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => {
      const { [productId]: removed, ...rest } = prev;
      return rest;
    });
  };

  const isInWishlist = (productId: number): boolean => {
    return productId in wishlist;
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
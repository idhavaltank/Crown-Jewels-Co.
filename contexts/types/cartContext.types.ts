export interface CartItem {
  productId: string;
  quantity: number;
  name: string;
  thumbnailUrl?: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  removeItem: (productId: string) => void;
  updateItemQuantity: (prpos: { productId: string; quantity: number }) => void;
  clearCart: () => void;
  totalItems: number;
  addItem: (props: {
    productId: string;
    quantity?: number;
    name?: string;
    thumbnailUrl?: string;
  }) => void;
}

export interface addItemPropsType {
  productId: string;
  quantity?: number;
  name?: string;
  thumbnailUrl?: string;
}

 export interface updateItemQuantityPropsType {
    productId: string;
    quantity: number;
  }
import { TProduct } from "@/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePopup } from "./PopupContext";

type TProductContextValues = {
  products: TProduct[];
  selectProduct: (product: TProduct) => void;
  selectedProduct: TProduct | undefined;
};

const ProductContext = createContext<TProductContextValues | null>(null);

export function ProductProvider({
  children,
  products,
  serverMessage,
}: {
  children: ReactNode;
  products: TProduct[];
  serverMessage?: string;
}) {
  const { notify } = usePopup();
  const [selectedProduct, setSelectedProduct] = useState<TProduct | undefined>(
    undefined
  );

  const selectProduct = (product?: TProduct) => {
    if (!product) {
      setSelectedProduct(undefined);
      return;
    }

    setSelectedProduct((cur) =>
      cur && product.id === cur.id ? undefined : product
    );
  };

  useEffect(() => {
    if (!serverMessage) return;
    notify(serverMessage);
  }, [serverMessage]);

  return (
    <ProductContext.Provider
      value={{ products, selectProduct, selectedProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProduct must be used inside of it's Provider's scope");
  return context;
}

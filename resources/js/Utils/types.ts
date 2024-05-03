export type TLaravelResource<T> = {
  data: T;
};

export type TInvoice = {
  category: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  invoiceNumber: string;
  postalCode: string;
  shippingAddress: string;
  userId: number;
};

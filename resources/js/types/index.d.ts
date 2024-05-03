export type TUser = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: "admin" | "user";
};

export type TProduct = {
  name: string;
  category: string;
  price: number;
  imageURL: string;
  id: string;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
};

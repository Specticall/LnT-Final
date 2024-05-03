import Button from "../general/Button";
import TextField from "../general/TextField";
import ImageInput from "../general/ImageInput";
import { useProduct } from "@/Context/ProductContext";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ScrollArea } from "../shadcn/ScrollArea";

const formValues = {
  price: 0,
  name: "",
  category: "",
  image_URL: "" as string | null,
  id: "" as string | undefined,
  image_file: null as File | null,
  action: "create" as "create" | "update",
};
type TFieldValues = typeof formValues;

export default function ProductForm() {
  const { selectedProduct } = useProduct();
  const {
    setData,
    data,
    post,
    errors,
    put,
    clearErrors,
    processing: isLoading,
  } = useForm<TFieldValues>(formValues);

  console.log(errors);

  const handleSubmit: React.DOMAttributes<HTMLFormElement>["onSubmit"] = (
    e
  ) => {
    e.preventDefault();
    console.log(data);
    // If a product is not selected then we should create
    post(route("product.store"));
    // if (selectedProduct) {
    //   post(route("product.update"));
    // } else {
    // }
  };

  // Append values to the form the user selects an existing product.
  useEffect(() => {
    clearErrors();
    setData({
      price: selectedProduct?.price || 0,
      name: selectedProduct?.name || "",
      category: selectedProduct?.category || "",
      image_URL: selectedProduct?.imageURL || "",
      id: selectedProduct?.id || "",
      image_file: null,
      action: selectedProduct ? "update" : "create",
    });
  }, [selectedProduct]);

  // On change listener
  // Similar to react hook form.
  // ini ribet bgt bikinnya wkwkwkwkwk
  const register = <TFieldValue extends keyof TFieldValues>(
    fields: TFieldValue
  ) => {
    const onChange = (value: TFieldValues[TFieldValue] | undefined) => {
      setData((current) => {
        return {
          ...current,
          // If input is undefined then reset to default value.
          [fields]: value || formValues[fields],
        };
      });
    };

    return { onChange };
  };

  return (
    <ScrollArea className="min-h-full h-0">
      <form
        className="bg-white rounded-xl p-6 flex flex-col h-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-dark text-xl font-semibold">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h2>
        <p className="text-light text-sm mb-6 mt-1">
          {`Enter the following the information to ${
            selectedProduct ? "edit a" : "add a new"
          } product`}
        </p>
        <ImageInput
          key={selectedProduct?.imageURL}
          defaultURL={selectedProduct?.imageURL}
          onChange={(data) =>
            setData((current) => {
              return {
                ...current,
                image_file: data,
              };
            })
          }
        />
        <TextField
          label="Product Name*"
          placeholder="Nike Shoes"
          className="mt-8"
          defaultValue={selectedProduct?.name}
          {...register("name")}
          errorMessage={errors.name}
        />
        <TextField
          label="Category*"
          placeholder="Trendy"
          className="mt-8"
          hint="The following fields need to be atleast 5 characters long and can not be longer than 30 characters"
          defaultValue={selectedProduct?.category}
          {...register("category")}
          errorMessage={errors.category}
        />
        <TextField
          placeholder="50.000"
          label="Price* (IDR)"
          className="mt-6"
          type="number"
          defaultValue={selectedProduct?.price}
          {...register("price")}
          errorMessage={errors.price}
          key={selectedProduct?.id}
        />
        <Button className="mt-16 ml-auto">
          {selectedProduct ? "Edit" : "Create"}
        </Button>
      </form>{" "}
    </ScrollArea>
  );
}

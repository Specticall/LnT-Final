import { useForm } from "@inertiajs/react";
import TextField from "../general/TextField";
import Button from "../general/Button";
import { useInvoice } from "@/Context/InvoiceContext";
import { useEffect } from "react";

const formFields = {
  shipping_address: "",
  postal_code: undefined as number | undefined,
};
type TFieldValues = typeof formFields;

export default function InvoiceShippingDetails() {
  const { put, setData, data, errors, clearErrors } = useForm(formFields);
  const { recentInvoice } = useInvoice();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(data);

    put(route("invoice.update", recentInvoice.id));
  };

  useEffect(() => {
    clearErrors();
    setData({
      shipping_address: recentInvoice?.shippingAddress || "",
      postal_code: Number(recentInvoice?.postalCode) || undefined,
    });
  }, []);

  const register = <TFieldValue extends keyof TFieldValues>(
    fields: TFieldValue
  ) => {
    const onChange = (value: TFieldValues[TFieldValue] | undefined) => {
      setData((current) => {
        return {
          ...current,
          // If input is undefined then reset to default value.
          [fields]: value || formFields[fields],
        };
      });
    };

    return { onChange };
  };

  return (
    <form className="bg-white p-6 rounded-xl h-fit" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center border-b-[1px]">
        <div>
          <h1 className="text-xl text-dark font-semibold">Shipping Details</h1>
          <p className="text-light text-sm border-lighter mb-4">
            Enter your shipping details
          </p>
        </div>
      </div>
      <TextField
        className="mt-8"
        label="Shipping Address*"
        hint="The following fields need to be atleast 10 characters long and can not be longer than 100 characters"
        placeholder="St. Laravel Breeze No.12"
        errorMessage={errors?.shipping_address}
        {...register("shipping_address")}
        defaultValue={recentInvoice.shippingAddress}
        disabled={recentInvoice.status === "completed"}
      />
      <TextField
        type="number"
        className="mt-8"
        label="Postal Code*"
        placeholder="99934"
        errorMessage={errors?.postal_code}
        shouldFormatNumber={false}
        {...register("postal_code")}
        defaultValue={Number(recentInvoice?.postalCode)}
        disabled={recentInvoice.status === "completed"}
      />
      {recentInvoice.status === "on_progress" && (
        <Button className="w-full mt-16">Complete Invoice</Button>
      )}
    </form>
  );
}

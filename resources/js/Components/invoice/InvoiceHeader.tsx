import { useInvoice } from "@/Context/InvoiceContext";
import { formatNumber } from "@/Utils/Utils";

const BG_GRADIENT =
  "linear-gradient(135deg, rgba(77,74,255,1) 0%, rgba(142,74,255,1) 80%, rgba(255,217,144,1) 100%)";

export default function InvoiceHeader() {
  const { recentInvoice, invoiceItems } = useInvoice();

  const totalPrice = invoiceItems.reduce(
    (total, item) => total + item.price,
    0
  );
  return (
    <div className="bg-white rounded-xl p-6">
      <h1 className="text-xl text-dark font-semibold flex items-center mb-2">
        Invoice
        <span className="text-accent"> - #{recentInvoice.invoiceNumber}</span>
        {recentInvoice.status === "completed" && (
          <span className="py-1 px-4 rounded-full bg-accent text-white text-sm ml-4 font-medium">
            Completed
          </span>
        )}
      </h1>
      <p className="text-light text-sm mb-5">
        Fill the following info to complete your invoice{" "}
      </p>
      <div
        className=" rounded-lg text-white p-6 flex justify-between items-center"
        style={{
          background: BG_GRADIENT,
        }}
      >
        <div className="">
          <p className="text-sm mb-1 ">Total Price </p>
          <h2 className="text-xl font-semibold">
            IDR {formatNumber(totalPrice)}
          </h2>
        </div>
        <i className="bx bx-coin-stack  bg-white text-3xl text-accent w-12 aspect-square flex items-center justify-center rounded-md"></i>
      </div>
    </div>
  );
}

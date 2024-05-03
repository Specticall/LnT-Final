import { cn } from "@/Utils/Utils";
import { VariantProps, cva } from "class-variance-authority";
import { DOMAttributes, ReactNode } from "react";

const variants = cva(
  "text-sm px-5 py-3 text-sm rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:grayscale",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-accent/90",
        secondary: "bg-white text-darkest hover:opacity-80",
        transparent:
          "bg-transparent border-[1px] text-darkest border-darkest hover:bg-black/5",
        dark: "bg-black text-white hover:bg-black hover:opacity-70",
        tertiary: "bg-slate-100 text-light hover:bg-slate-200",
        clean: "p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: VariantProps<typeof variants>["variant"];
  className?: string;
  disabled?: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  to?: string;
  children: ReactNode;
  spinnerIconClass?: string;
};

export default function Button({
  className = "",
  variant,
  disabled,
  children,
  spinnerIconClass,
  to = "",
  onClick = () => {},
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(variants({ variant }), className)}
      onClick={(e) => {
        if (to) {
          e.preventDefault();
        }
        onClick(e);
      }}
    >
      {children}
    </button>
  );
}

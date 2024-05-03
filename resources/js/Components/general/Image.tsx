import { useState } from "react";
import Skeleton from "react-loading-skeleton";

type TImageProps = {
  className: string;
};

export default function Image({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & TImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <img
        {...props}
        className={className}
        // onLoad={() => setIsLoading(false)}
        // onError={() => setIsLoading()}
      />
    </>
  );
}

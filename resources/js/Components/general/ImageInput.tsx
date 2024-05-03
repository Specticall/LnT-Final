import { LegacyRef, useRef, useState } from "react";
import TextInput from "../TextInput";

export default function ImageInput({
  defaultURL = "",
  className,
  onChange,
}: {
  defaultURL?: string;
  className?: string;
  onChange: (file: File) => void;
}) {
  const [imageURL, setImageURL] = useState(defaultURL);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenExplorer = () => {
    const inputEl = inputRef?.current as HTMLInputElement;
    inputEl.click();
  };

  const handleSelectImage: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (e) => {
      if (!e.target.files || !e.target.files[0]) return;
      const temporaryImageURL = URL.createObjectURL(e.target.files[0]);
      setImageURL(temporaryImageURL);

      const imageFile = e.target.files[0];

      onChange(imageFile);
    };

  return (
    <div
      className="hover:bg-slate-300 duration-200 transition-all cursor-pointer group bg-slate-200 w-48 aspect-square rounded-xl relative flex items-center justify-center flex-col overflow-hidden group"
      onClick={handleOpenExplorer}
    >
      <input
        type="file"
        className="w-0 h-0 absolute"
        ref={inputRef}
        onChange={handleSelectImage}
      />
      {defaultURL || imageURL ? (
        <>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center flex-col backdrop-blur-sm">
            <i className="bx bx-camera text-3xl text-white transition-all duration-200"></i>
            <p className="text-sm text-white transition-all duration-200">
              + Edit Product Image
            </p>
          </div>
          <img src={imageURL} className="w-full h-full object-cover" />
        </>
      ) : (
        <>
          <i className="bx bx-camera text-3xl text-lighter group-hover:text-light transition-all duration-200"></i>
          <p className="text-lighter text-sm group-hover:text-light transition-all duration-200">
            + Add Product Image
          </p>
        </>
      )}
    </div>
  );
}

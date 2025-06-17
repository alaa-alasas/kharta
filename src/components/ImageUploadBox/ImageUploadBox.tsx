import { useState, useImperativeHandle, forwardRef, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./ImageUploadBox.css";

type Props = {
  addNewItem?: string;
  initialImage?: string;
};

const ImageUploadBox = forwardRef<HTMLInputElement, Props>(({ initialImage, addNewItem }, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useImperativeHandle(ref, () => fileInputRef.current as HTMLInputElement);


    useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    }
  }, [initialImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form.Group className="text-center">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="d-none"
      />

      <div
        className={`upload-box ${addNewItem || ""}`}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="upload-preview" />
        ) : (
          <img src="/Task5/Images/SignUp/UploadIcon.svg" alt="" className="uploadIcon" />
        )}
      </div>
    </Form.Group>
  );
});

export default ImageUploadBox;

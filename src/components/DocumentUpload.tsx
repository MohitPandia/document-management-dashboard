import { ChangeEvent, useState, useEffect, useRef } from "react";
import uploadDocument from "../app/api/documentUpload/DocumentUploadRoute";

interface DocumentUploadProps {
  onUpload: (document: Document) => void;
}

interface Document {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  url: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Creating a ref for the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (successMessage) {
      // Hide the success message after 2.5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 2500);
      // Cleanup timer on component unmount or message change
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Creating a preview URL for the file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload!");

    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadDocument(formData);
    if (res.status === 200 && res.success) {
      const { document } = res;
      console.log("Upload successful:", document);

      // Passing the file information back via the onUpload callback
      onUpload({
        id: document.id,
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
        url: document.url,
      });

      // Show success message and clear state
      setSuccessMessage("Upload successful!");
      setFile(null);
      setPreview(null);

      // Reset the file input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      console.error("Unexpected response or status:", res);
      alert("Failed to upload the file. Please try again.");
    }
  };

  const renderPreview = () => {
    if (!preview) return null;

    if (file && file.type.startsWith("image/")) {
      return <img src={preview as string} alt="Preview" className="mt-4 max-w-xs" />;
    } else if (file && file.type === "application/pdf") {
      return (
        <embed
          src={preview as string}
          type="application/pdf"
          className="mt-4 w-full h-64 border border-gray-300 rounded"
        />
      );
    } else {
      return (
        <div className="mt-4 text-gray-600">
          {file?.name} - Unsupported file type preview.
        </div>
      );
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {renderPreview()}
      {successMessage && (
        <div className="absolute top-4 right-4 p-2 bg-green-100 text-green-800 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
      <button
        onClick={handleUpload}
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
      >
        Upload
      </button>
    </div>
  );
};

export default DocumentUpload;

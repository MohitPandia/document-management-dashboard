import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Document {
  name: string;
  size: number;
  uploadDate: string;
  url: string;
}

interface DocumentListProps {
  documents: Document[];
  pageCount: number;
  onPageChange: (event: { selected: number }) => void;
  search: (term: string) => void;
  onDelete: (url: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  pageCount,
  onPageChange,
  search,
  onDelete,
}) => {
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  // Calculate the slice of documents to display based on the current page
  const displayedDocuments = documents.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Function to close the modal
  const closeModal = () => setPreviewDocument(null);

  // Modal rendering logic for document preview
  const renderPreviewModal = () => {
    if (!previewDocument) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl font-bold px-4 py-2"
          >
            &times;
          </button>

          {/* Updated document name color */}
          <h3 className="text-lg font-bold mb-4" style={{ color: "#4A90E2" }}>
            {previewDocument.name}
          </h3>

          {previewDocument.url.endsWith(".pdf") ? (
            <embed
              src={previewDocument.url}
              type="application/pdf"
              className="w-full h-96 border"
            />
          ) : (
            <img
              src={previewDocument.url}
              alt={previewDocument.name}
              className="w-full h-96 object-contain"
            />
          )}

          <button
            onClick={closeModal}
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <ul className="space-y-4">
        {displayedDocuments.map((doc) => (
          <li
            key={doc.url}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl flex items-start justify-between"
          >
            <div className="flex flex-col flex-grow">
              <p className="font-bold text-xl text-gray-800 mb-2 truncate">
                {doc.name}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Size: {doc.size} bytes
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Preview button with tooltip */}
              <button
                onClick={() => setPreviewDocument(doc)}
                className="text-indigo-600 hover:underline text-sm flex items-center group relative"
              >
                <EyeIcon className="h-6 w-6" />
                <span className="ml-2 hidden group-hover:inline absolute -bottom-8 left-0 bg-gray-800 text-white text-xs rounded py-1 px-2">
                  Preview
                </span>
              </button>

              {/* Delete button with tooltip */}
              <button
                onClick={() => onDelete(doc.url)}
                className="text-red-600 hover:text-red-800 flex-shrink-0 flex items-center group relative"
              >
                <TrashIcon className="h-6 w-6" />
                <span className="ml-2 hidden group-hover:inline absolute -bottom-8 left-0 bg-gray-800 text-white text-xs rounded py-1 px-2">
                  Delete
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {renderPreviewModal()}

      <div className="mt-6">
        <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={"pagination flex justify-center mt-4"}
        pageClassName={"mx-1"}
        pageLinkClassName={"px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-200"}
        previousLinkClassName={"px-4 py-2 bg-white text-gray-700 rounded-l-lg hover:bg-gray-200"}
        nextLinkClassName={"px-4 py-2 bg-white text-gray-700 rounded-r-lg hover:bg-gray-200"}
        activeClassName={"bg-blue-500 text-white"}
      />
      </div>
    </div>
  );
};

export default DocumentList;

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import PreviewModal from '../components/DocumentPreview'; // Adjust the path if necessary

export interface Document {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  url: string;
}

interface DocumentListProps {
  documents: Document[];
  pageCount: number;
  onPageChange: (event: { selected: number }) => void;
  onDelete: (id: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  pageCount,
  onPageChange,
  onDelete,
}) => {
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    onDelete(id);
    setMessage('Document deleted successfully!');
    setTimeout(() => setMessage(null), 2500); // Hide the message after 2.5 seconds
  };

  // Calculate the slice of documents to display based on the current page
  const displayedDocuments = documents.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 text-green-800 py-2 px-4 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

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
              <button
                onClick={() => setPreviewDocument(doc)}
                className="text-indigo-600 hover:underline text-sm flex items-center group relative"
              >
                <EyeIcon className="h-6 w-6" />
                <span className="ml-2 hidden group-hover:inline absolute -bottom-8 left-0 bg-gray-800 text-white text-xs rounded py-1 px-2">
                  Preview
                </span>
              </button>
              <button
                onClick={() => handleDeleteClick(doc.id)}
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

      {previewDocument && (
        <PreviewModal
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
        />
      )}

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

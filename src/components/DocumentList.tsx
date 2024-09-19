// import ReactPaginate from "react-paginate";

// interface Document {
//   name: string;
//   size: number;
//   uploadDate: string;
//   url: string;
// }

// interface DocumentListProps {
//   documents: Document[];
//   pageCount: number;
//   onPageChange: (event: { selected: number }) => void;
//   search: (term: string) => void;
// }

// const DocumentList: React.FC<DocumentListProps> = ({
//   documents,
//   pageCount,
//   onPageChange,
//   search,
// }) => {
//   return (
//     <div className="mt-8 max-w-4xl mx-auto">
//       <ul className="space-y-4">
//         {documents.map((doc) => (
//           <li
//             key={doc.url}
//             className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl"
//           >
//             <div className="flex flex-col">
//               <p className="font-bold text-2xl text-gray-800 mb-2 truncate">
//                 {doc.name}
//               </p>
//               <p className="text-sm text-gray-600 mb-1">
//                 Size: {doc.size} bytes
//               </p>
//               <p className="text-sm text-gray-600 mb-4">
//                 Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
//               </p>
//               <a
//                 href={doc.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-indigo-600 hover:underline text-sm"
//               >
//                 Preview
//               </a>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="mt-6">
//         <ReactPaginate
//           previousLabel={"Previous"}
//           nextLabel={"Next"}
//           pageCount={pageCount}
//           onPageChange={onPageChange}
//           containerClassName={"flex justify-center space-x-2"}
//           pageClassName={"page-item"}
//           pageLinkClassName={
//             "py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
//           }
//           previousClassName={"page-item"}
//           previousLinkClassName={
//             "py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
//           }
//           nextClassName={"page-item"}
//           nextLinkClassName={
//             "py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
//           }
//           activeClassName={"bg-indigo-600 text-white"}
//           disabledClassName={"cursor-not-allowed opacity-50"}
//         />
//       </div>
//     </div>
//   );
// };

// export default DocumentList;


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

  // Calculate the slice of documents to display based on the current page
  const displayedDocuments = documents.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline text-sm flex items-center group relative"
              >
                <EyeIcon className="h-6 w-6" />
                <span className="ml-2 hidden group-hover:inline absolute -bottom-8 left-0 bg-gray-800 text-white text-xs rounded py-1 px-2">
                  Preview
                </span>
              </a>
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

      <div className="mt-6">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={(event) => {
            setCurrentPage(event.selected);
            onPageChange(event);
          }}
          containerClassName={"flex justify-center space-x-2"}
          pageClassName={"page-item"}
          pageLinkClassName={
            "py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          }
          previousClassName={"page-item"}
          previousLinkClassName={
            "py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          }
          nextClassName={"page-item"}
          nextLinkClassName={
            "py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          }
          activeClassName={"bg-indigo-600 text-white"}
          disabledClassName={"cursor-not-allowed opacity-50"}
        />
      </div>
    </div>
  );
};

export default DocumentList;

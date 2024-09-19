'use client';

import { useState, useEffect } from 'react';
import DocumentUpload from '../../components/DocumentUpload';
import DocumentList from '../../components/DocumentList';

interface Document {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  url: string;
}

const Dashboard = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check local storage first
    const storedDocuments = JSON.parse(localStorage.getItem("image") || "[]");
    if (storedDocuments.length > 0) {
      setDocuments(storedDocuments);
    } else {
      fetchDocuments(currentPage, searchTerm);
    }
  }, [currentPage, searchTerm]);

  const fetchDocuments = async (page = 0, search = '') => {
    const res = await fetch(`/api/documents?page=${page}&search=${search}`);
    const data = await res.json();
    setDocuments(data.documents);
    setPageCount(data.totalPages);
  };

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleDelete = (id: string) => {
    // Remove document from local storage
    let imageArray = JSON.parse(localStorage.getItem("image") || "[]");
    imageArray = imageArray.filter((doc: Document) => doc.id !== id);
    localStorage.setItem("image", JSON.stringify(imageArray));

    // Update the state to remove the document from the list
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  };

  const handleUpload = (document: Document) => {
    console.log("Document uploaded:", document);
    setDocuments([document, ...documents]);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Document Management Dashboard</h1>
      <div className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg">
        <DocumentUpload onUpload={handleUpload} />
      </div>
      <div className="w-full max-w-4xl mt-8 bg-white p-6 shadow-lg rounded-lg">
        <DocumentList 
          documents={documents}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          search={handleSearch}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;

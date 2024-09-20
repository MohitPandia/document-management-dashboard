//this app is developed by Yash Pandia to demonstrate his code writing skills in next.js 14 and to showcase the concept of modularity
'use client';

import { useState, useEffect } from 'react';
import DocumentUpload from '../../components/DocumentUpload';
import DocumentList from '../../components/DocumentList';
import DocumentDelete from '../api/documentDelete/DocumentDeleteRoute'; // Import the delete function

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
    const storedDocuments = JSON.parse(localStorage.getItem("image") || "[]");
    if (storedDocuments.length > 0) {
      setDocuments(storedDocuments.reverse());
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

  const handleDelete = (id: string) => {
    try {
      const updatedDocuments = DocumentDelete(id);  
      setDocuments(updatedDocuments);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleUpload = (document: Document) => {
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
          onDelete={handleDelete}  // Updated to use direct delete logic
        />
      </div>
    </div>
  );
};

export default Dashboard;

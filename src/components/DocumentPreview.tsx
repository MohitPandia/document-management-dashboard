import React from 'react';
import { Document } from './DocumentList';

interface PreviewModalProps {
  document: Document | null;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  const openPreviewInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl font-bold px-4 py-2"
        >
          &times;
        </button>

        {/* Updated document name color */}
        <h3 className="text-lg font-bold mb-4" style={{ color: '#4A90E2' }}>
          {document.name}
        </h3>

        {/* Display PDF in a new tab */}
        {document.url.endsWith('.pdf') ? (
          <p
            className="text-blue-500 cursor-pointer"
            onClick={() => openPreviewInNewTab(document.url)}
          >
            click here to Open PDF in new tab as opening pdf in small preview is disabled by server
          </p>
        ) : (
          <img
            src={document.url}
            alt={document.name}
            className="w-full h-96 object-contain"
          />
        )}

        <button
          onClick={onClose}
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PreviewModal;

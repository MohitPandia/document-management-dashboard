interface DocumentPreviewProps {
  url: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ url }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <iframe src={url} width="100%" height="800" title="Document Preview" className="border border-gray-300 rounded-lg"></iframe>
    </div>
  );
};

export default DocumentPreview;

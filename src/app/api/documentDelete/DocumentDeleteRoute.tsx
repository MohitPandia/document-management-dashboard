// src/app/api/documentDelete/DocumentDeleteRoute.tsx

export default function DocumentDelete(id: string) {
    const storedDocuments = JSON.parse(localStorage.getItem('image') || '[]');
    const updatedDocuments = storedDocuments.filter((doc: any) => doc.id !== id);
    localStorage.setItem('image', JSON.stringify(updatedDocuments));
    return updatedDocuments;
}
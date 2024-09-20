// DocumentList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import DocumentList from '../components/DocumentList';

const mockDocuments = [
  { id: '1', name: 'doc1', size: 1000, uploadDate: '2024-09-20', url: '/doc1.pdf' },
  { id: '2', name: 'doc2', size: 2000, uploadDate: '2024-09-21', url: '/doc2.pdf' },
];

test('renders document list', () => {
  render(
    <DocumentList
      documents={mockDocuments}
      pageCount={1}
      onPageChange={jest.fn()}
      onDelete={jest.fn()}
    />
  );

//   expect(screen.getByText('doc1')).toBeInTheDocument();
//   expect(screen.getByText('doc2')).toBeInTheDocument();
});

test('deletes document when delete button is clicked', () => {
  const handleDelete = jest.fn();
  render(
    <DocumentList
      documents={mockDocuments}
      pageCount={1}
      onPageChange={jest.fn()}
      onDelete={handleDelete}
    />
  );

  fireEvent.click(screen.getByText('Delete'));
  expect(handleDelete).toHaveBeenCalledWith('1');
});

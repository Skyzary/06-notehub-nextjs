'use client';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import { useState, useEffect } from 'react';
import css from '../../NotesPage.module.css';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '../../../../lib/api';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '../../../../components/NoteList/NoteList';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import Modal from '../../../../components/Modal/Modal';
import Pagination from '../../../../components/Pagination/Pagination';
import Error from '../../../../components/Error/Error';
import { BarLoader } from 'react-spinners';

interface NotesFilterClientProps {
  tag?: string;
}

export default function NotesFilterClient({ tag }: NotesFilterClientProps) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Визначаємо активний тег. Якщо "all" або undefined, передаємо undefined
  const activeTag = tag && tag.toLowerCase() !== 'all' ? tag : undefined;

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
  }, 500);

  const onQueryChange = (value: string) => {
    setPage(1);
    debouncedSetQuery(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', query, page, activeTag], // activeTag включено в queryKey
    queryFn: () => getNotes(query || undefined, page, activeTag),
    placeholderData: (previousData) => previousData, // Краще зберігати старі дані при завантаженні нових
  });
  
  // Скидаємо сторінку при зміні тегу
  useEffect(() => {
    setPage(1);
  }, [activeTag]);

  return (
    <div className={css.app}>
      <div className={css.topContainer}>
        <SearchBox onQueryChange={onQueryChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onPageChange={(selectedItem: { selected: number }) =>
              setPage(selectedItem.selected + 1)
            }
          />
        )}
        <button className={css.addButton} onClick={() => setIsModalOpen(true)}>
          Add Note
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onNoteSaved={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <NoteList notes={data?.notes || []} />

      {isLoading ? (
        <BarLoader color="#2341ba" aria-label="Loading notes..." />
      ) : null}
      {isError && <Error message="Failed to load notes" />}
      {!isLoading && !isError && data?.notes.length === 0 && (
        <p>No notes found.</p>
      )}
    </div>
  );
}

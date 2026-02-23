'use client'
import SearchBox from '@/components/SearchBox/SearchBox';
import { useState } from 'react';
import css from '@/app/notes/NotesPage.module.css';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import Error from '@/components/Error/Error';
import { BarLoader } from 'react-spinners';
import ModalManager from '@/components/ModalManager/modalManager';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const { data, isLoading, refetch } = useQuery({
    queryKey: query ? ['notes', query, page] : ['notes', page],
    queryFn: query
      ? () => getNotes(query, page)
      : () => getNotes(undefined, page),
  });

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onUpdate(value);
  }
  const onUpdate = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <div className={css.topContainer}>
        <SearchBox query={query} onInputChange={onInputChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onPageChange={(selectedItem) => setPage(selectedItem.selected + 1)}
          />
        )}
        <ModalManager btnText={'Add Note'}>
          {(close) => (
            <NoteForm onClose={close} onNoteSaved={close} onCancel={close}  />
          )}
        </ModalManager>
      </div>

      <NoteList notes={data?.notes || []} />

      {isLoading ? (
        <BarLoader color="#2341ba" area-label="Loading notes..." />
      ) : null}
      {!isLoading && data?.notes.length === 0 && <p>No notes found.</p>}
    </div>
  );
}

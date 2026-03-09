'use client'
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '../../../lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data: note, isError, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <div className={css.container}>Loading...</div>;
  }

  if (isError || !note) {
    return null;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

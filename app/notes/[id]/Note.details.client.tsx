'use client'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getNoteById } from '../../../lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams();
  const noteId = Array.isArray(id) ? id[0] : id;

  const { data: note, isError, isLoading } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => getNoteById(noteId as string),
    enabled: !!noteId,
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

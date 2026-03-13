'use client';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '../../lib/api';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className={css.container}>Loading...</div>;
  }

  if (isError || !note) {
    return <div className={css.container}>Failed to load note.</div>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

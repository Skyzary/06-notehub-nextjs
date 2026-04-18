'use client';
import type { Note } from '../../types/note'
import css from './NoteList.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '../../lib/api'
import Link from 'next/link';

interface NoteItemProps {
  note: Note;
}

function NoteItem({ note }: NoteItemProps) {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  return (
    <li className={css.listItem}>
      <Link href={`/notes/${note.id}`} className={css.link}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note.tag}</span>
        </div>
      </Link>
      <button
        className={css.button}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteMutation.mutate(String(note.id));
        }}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
}

interface NoteListProps {
  notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  )
}

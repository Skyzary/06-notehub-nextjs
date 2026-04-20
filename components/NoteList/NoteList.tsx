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
    onSuccess: (_, deletedId) => {
      // Immediately remove the note from all cached lists to prevent 404s on stale items
      queryClient.setQueriesData({ queryKey: ['notes'] }, (old: any) => {
        if (!old || !old.notes) return old;
        return {
          ...old,
          notes: old.notes.filter((note: Note) => String(note.id) !== deletedId),
        };
      });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.removeQueries({ queryKey: ['note', deletedId] });
    },
  });

  return (
    <li className={`${css.listItem} ${deleteMutation.isPending ? css.deleting : ''}`}>
      <Link 
        href={`/notes/${note.id}`} 
        className={`${css.link} ${deleteMutation.isPending ? css.disabled : ''}`}
        onClick={(e) => deleteMutation.isPending && e.preventDefault()}
      >
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

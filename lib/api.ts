import axios from 'axios';
import type { Note, NoteCreationPayload } from '../types/note';
interface Response {
  notes: Note[];
  totalPages: number;
}
const params = {
  baseURL: 'https://notehub-public.goit.study/api',
  endpoints: {
    notes: '/notes',
  },
};
const instance = axios.create({
  baseURL: params.baseURL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});
export async function getNotes(
  query?: string,
  page: number = 0,
  tag?: string
): Promise<Response> {
  const { data } = await instance.get<Response>(params.endpoints.notes, {
    params: {
      ...(query ? { search: query } : {}),
      ...(tag && tag !== 'all' ? { tag: tag } : {}), // changed 'tags' to 'tag' according to common API patterns or confirmed behavior
      page: page,
    },
  });
  return data;
}
export async function getNoteById(id: string): Promise<Note> {
  const { data } = await instance.get<Note>(`${params.endpoints.notes}/${id}`);
  return data;
}
export async function addNote(note: NoteCreationPayload): Promise<Note> {
  const { data } = await instance.post<Note>(params.endpoints.notes, note);
  return data;
}
export async function deleteNote(id: string): Promise<Note> {
  const res = await instance.delete<Note>(`${params.endpoints.notes}/${id}`);
  return res.data;

}

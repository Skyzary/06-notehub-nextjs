import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getNotes } from '../../../../lib/api';
import NotesFilterClient from './NotesFilter.client';

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ tag: string[] }>;
}) {
  const { tag } = await params;
  const activeTag = tag?.[0];
  const queryClient = new QueryClient();

  const tagForApi = activeTag && activeTag !== 'all' ? activeTag : undefined;

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tagForApi],
    queryFn: () => getNotes(undefined, 1, tagForApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterClient tag={activeTag} />
    </HydrationBoundary>
  );
}

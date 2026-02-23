import {dehydrate, HydrationBoundary,  QueryClient} from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import NotesClient from '@/app/notes/Notes.client';
export default async function NotePage (){
  const  queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1],
    queryFn: () =>
      getNotes(undefined, 1)
  })
  return(
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  )
}
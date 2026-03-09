import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {getNoteById} from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client'
export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id)
  }
  )

return(
  <HydrationBoundary state={dehydrate(queryClient)}>
    <NoteDetailsClient id={id} />
  </HydrationBoundary>

)

}
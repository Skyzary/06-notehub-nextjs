import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {getNoteById} from '../../../lib/api';
import NoteDetailsClient from './Note.details.client'
export default async function NotePage(id: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id)
  }
  )

return(
  <HydrationBoundary state={dehydrate(queryClient)}>
    <NoteDetailsClient />
  </HydrationBoundary>

)

}
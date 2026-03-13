'use client';

import { useRouter } from 'next/navigation';
import Modal from '../../../../components/Modal/Modal';
import NotePreview from '../../../../components/NotePreview/NotePreview';
import { use } from 'react';

export default function InterceptedNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview id={id} />
    </Modal>
  );
}

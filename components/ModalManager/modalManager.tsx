'use client';
import Modal from '../Modal/Modal';
import OpenModalBtn from '../OpenModalBtn/OpenModalBtn';
import { JSX, useState } from 'react';
interface ModalManagerProps {
  btnText: string;
  children: (onClose: () => void) => JSX.Element;

}
export default function ModalManager({
  children,
}: ModalManagerProps){

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  return (
    <div>
      <OpenModalBtn text={'Create new note'} onClick={() => setIsOpen(true)} />
      {isOpen && <Modal onClose={() => setIsOpen(false)}>{children(closeModal)}</Modal>}
    </div>
  )}

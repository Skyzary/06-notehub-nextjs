import css from './OpenModalBtn.module.css'
interface OpenModalBtnProps {
  text: string;
  onClick: () => void;
}

export default function OpenModalBtn({ text, onClick }: OpenModalBtnProps) {
  return (
    <button
      className={css.button}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

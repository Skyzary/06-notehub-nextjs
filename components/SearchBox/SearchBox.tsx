'use client'
import { useState } from 'react';
import css from './SearchBox.module.css'

interface SearchBoxProps {
  onQueryChange: (query: string) => void
}

export default function SearchBox({ onQueryChange }: SearchBoxProps) {
  const [localQuery, setLocalQuery] = useState('');

  return (
    <input
      type="text"
      placeholder="Search"
      value={localQuery}
      onChange={(e) => {
        const v = e.target.value;
        setLocalQuery(v);
        onQueryChange(v);
      }}
      className={css.input}
    />
  )
}

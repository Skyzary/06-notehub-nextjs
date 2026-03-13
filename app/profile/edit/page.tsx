'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Простий локальний стан для імітації збереження (оскільки API для профілю немає)
const saveProfile = (data: { name: string; email: string; about: string }) => {
  localStorage.setItem('userProfile', JSON.stringify(data));
};

const getProfile = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('userProfile');
    if (saved) return JSON.parse(saved);
  }
  return {
    name: 'User Name',
    email: 'user@example.com',
    about: 'I love taking notes with Next.js!'
  };
};

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    about: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFormData(getProfile());
    setIsLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(formData);
    router.push('/profile');
    router.refresh(); // Оновити дані на сторінці профілю
  };

  if (isLoading) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <section style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <label>
          Name:
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
            required
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
            required
          />
        </label>
        <label>
          About:
          <textarea 
            name="about"
            value={formData.about}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', minHeight: '100px', marginTop: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
          />
        </label>
        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
          <button 
            type="submit"
            style={{ 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '0.5rem 1rem', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Save Changes
          </button>
          <Link 
            href="/profile" 
            style={{ 
              textDecoration: 'none', 
              color: '#333', 
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Повторне використання логіки читання, в ідеалі це має бути в контексті або хуку
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

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    about: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProfile(getProfile());
    setIsLoading(false);
  }, []);

  if (isLoading) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <section style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Profile</h1>
      <div style={{ marginTop: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
        <h2>Name: {profile.name}</h2>
        <p>Email: {profile.email}</p>
        <p>About: {profile.about}</p>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Link 
          href="/profile/edit" 
          style={{ 
            background: '#2341ba', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '4px', 
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          Edit Profile
        </Link>
      </div>
    </section>
  );
}

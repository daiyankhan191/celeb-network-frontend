import React, { useState, FormEvent } from 'react';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (...args: any[]) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (type === 'register') onSubmit(name, email, password);
    else onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === 'register' && (
        <input className="border" value={name} onChange={(e) => setName(e.target.value)} />
      )}
      <input className="border" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
    </form>
  );
}

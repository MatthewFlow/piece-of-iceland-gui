import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useEmailValidation } from '../hooks/useEmailValidation';
import { useSession } from '../hooks/useSession';
import { login, register } from '../lib/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login: setSession } = useSession();
  const { emailError, validateEmail } = useEmailValidation();

  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'email') validateEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await register(form.email, form.username, form.password);
      const data = await login(form.email, form.password);
      setSession(data.token);
      toast.success('Registered successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      if (error?.response?.status === 409) {
        toast.error('User with this email already exists');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm p-6 bg-zinc-900 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {emailError && <p className="text-red-400 text-sm">{emailError}</p>}

        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={submitting}
          className="p-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold disabled:opacity-50 transition-all"
        >
          {submitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

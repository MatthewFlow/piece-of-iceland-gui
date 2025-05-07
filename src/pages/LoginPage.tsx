import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useEmailValidation } from '../hooks/useEmailValidation';
import { useSession } from '../hooks/useSession';
import { login as loginApi } from '../lib/auth';
import { ApiError } from '../lib/errors';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useSession();
  const { emailError, validateEmail } = useEmailValidation();
  const [form, setForm] = useState({ email: '', password: '' });
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
      const response = await loginApi(form.email, form.password);
      if (!response.ok || !response.token) {
        throw new ApiError(response.status, 'Login failed');
      }
      login(response.token);
      toast.success('Logged in!');
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err?.status === 401) {
        toast.error('Invalid email or password');
      } else {
        toast.error('Login failed. Try again later.');
        console.log(err);
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
        <h1 className="text-2xl font-bold text-center">Log in</h1>

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={submitting}
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold disabled:opacity-50"
        >
          {submitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { useEmailValidation } from '../hooks/useEmailValidation';
import { login } from '../lib/api';

function SubmitButton() {
  
  const { pending } = useFormStatus();
  
  return (
    <button
    type="submit"
    disabled={pending}
    className="p-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
    >
      {pending ? 'Logging in...' : 'Log In'}
    </button>
  );
}

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { emailError, validateEmail } = useEmailValidation();
  const navigate = useNavigate();
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
        const data = await login(email, password);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: 'Invalid email or password' };
      }
    },
    { success: false, error: null }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));

  if (name === 'email') {
    validateEmail(value);
  }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form action={formAction} className="flex flex-col w-full max-w-sm gap-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 rounded bg-zinc-800 text-white"
        />

        {emailError && <p className="text-red-400 text-sm">{emailError}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="p-2 rounded bg-zinc-800 text-white"
        />

        {state.error && <p className="text-red-400 text-sm text-center">{state.error}</p>}

        <SubmitButton />
      </form>
    </div>
  );
}

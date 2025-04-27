import { useAuthGuard } from '../hooks/useAuthGuard';

export default function DashboardPage() {
  useAuthGuard();

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Welcome to your dashboard!</h1>
    </div>
  );
}

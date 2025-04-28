export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950 text-white animate-fade-in">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
    </div>
  );
}

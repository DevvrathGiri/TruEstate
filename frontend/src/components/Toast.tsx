export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}

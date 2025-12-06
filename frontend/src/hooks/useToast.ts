import { useState } from "react";

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  const show = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  return { message, show };
}

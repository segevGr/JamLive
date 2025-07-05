// src/hooks/useModal.ts
import { useState, useCallback } from "react";
import type { DialogProps } from "components/dialogs";

type DialogData = Omit<DialogProps, "isOpen">;

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DialogData | null>(null);

  const open = useCallback((newData?: DialogData) => {
    setData(newData ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return [isOpen, open, close, data] as const;
}

"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Portal({ children }: PropsWithChildren) {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    if (document) {
      setContainer(document.body);
    }
  }, [container]);

  if (!container) return null;

  return createPortal(children, container);
}

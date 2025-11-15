"use client";
import { useEffect, useState } from "react";

export function useIsClient() {
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return client;
}
"use client";

import * as React from "react";
import { MicProvider } from "@/providers/MicProvider";
import { SettingsProvider } from "@workspace/ui/hooks/useSettings";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <MicProvider>{children}</MicProvider>
    </SettingsProvider>
  );
}

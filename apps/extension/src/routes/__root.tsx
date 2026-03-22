import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider as NextThemesProvider } from "@workspace/ui/components/theme-provider";

export const Route = createRootRoute({
  component: () => (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <Outlet />
    </NextThemesProvider>
  ),
});

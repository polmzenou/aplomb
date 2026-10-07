"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Ctx = { dark: boolean; setDark: (v: boolean) => void };
const HeaderThemeContext = createContext<Ctx>({ dark: false, setDark: () => {} });

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  return <HeaderThemeContext.Provider value={{ dark, setDark }}>{children}</HeaderThemeContext.Provider>;
}

export const useHeaderTheme = () => useContext(HeaderThemeContext);

/** Rendered by pages whose top section is dark, so the header switches to light text. */
export function DarkHeader() {
  const { setDark } = useHeaderTheme();
  useEffect(() => {
    setDark(true);
    return () => setDark(false);
  }, [setDark]);
  return null;
}

/// <reference types="vite/client" />

declare module '@asafarim/simple-md-viewer' {
  import { ComponentType, ReactNode } from 'react';
  
  export interface MarkdownContentProps {
    apiBaseUrl?: string;
    showHomePage?: boolean;
    hideFileTree?: boolean;
    hideHeader?: boolean;
    hideFooter?: boolean;
  }
  
  export interface ThemeProviderProps {
    theme: 'light' | 'dark';
    toggleTheme?: () => void;
    children: ReactNode;
  }
  
  export const MarkdownContent: ComponentType<MarkdownContentProps>;
  export const ThemeProvider: ComponentType<ThemeProviderProps>;
}

declare module '@asafarim/simple-md-viewer/dist/style.css' {}

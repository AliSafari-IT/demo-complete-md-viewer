/// <reference types="vite/client" />

declare module '@asafarim/complete-md-viewer' {
  import { ComponentType } from 'react';
  
  export interface MarkdownViewerBaseProps {
    apiBaseUrl: string;
    basePath?: string;
    hideFileTree?: boolean;
    useExternalRouter?: boolean;
    showHomePage?: boolean;
    sidebarCollapsed?: boolean;
  }
  
  export const MarkdownViewerBase: ComponentType<MarkdownViewerBaseProps>;
}

declare module '@asafarim/complete-md-viewer/dist/style.css' {}

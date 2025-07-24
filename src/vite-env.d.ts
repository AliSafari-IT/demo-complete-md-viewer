/// <reference types="vite/client" />

declare module '@asafarim/complete-md-viewer' {
  import { ComponentType } from 'react';
  
  export interface MarkdownViewerBaseProps {
    apiBaseUrl: string;
    basePath?: string;
    hideFileTree?: boolean;
    useExternalRouter?: boolean;
    initialFilePath?: string;
    selectedFile?: string;
    currentFilePath?: string;
    integrated?: boolean;
    showHomePage?: boolean;
    sidebarCollapsed?: boolean;
    onFileSelect?: (filePath: string) => void;
  }
  
  export const MarkdownViewerBase: ComponentType<MarkdownViewerBaseProps>;
}

declare module '@asafarim/complete-md-viewer/dist/style.css' {}

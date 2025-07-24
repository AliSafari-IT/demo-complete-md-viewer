import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MarkdownViewerBase } from '@asafarim/complete-md-viewer';
import '@asafarim/complete-md-viewer/dist/style.css';

// Enhanced viewer wrapper with mobile optimizations and URL path management
const EnhancedMobileViewer: React.FC<{
  apiBaseUrl: string;
  basePath?: string;
  hideFileTree?: boolean;
  useExternalRouter?: boolean;
}> = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Extract the file path from the current URL
  const getCurrentFilePath = () => {
    const basePath = props.basePath || '/md-docs';
    const currentPath = location.pathname;
    
    // Remove the base path to get the file path
    if (currentPath.startsWith(basePath + '/')) {
      const filePath = currentPath.substring(basePath.length + 1);
      console.log('🔍 Extracted file path from URL:', filePath);
      return filePath;
    }
    
    console.log('🏠 No specific file path, using default');
    return '';
  };

  // Get the current file path
  const currentFilePath = getCurrentFilePath();

  return (
    <>      
      <div className={`enhanced-viewer ${isMobile ? 'mobile' : ''}`} key={location.pathname}>
        <MarkdownViewerBase
          {...props}
          hideFileTree={isMobile ? false : props.hideFileTree}
          useExternalRouter={props.useExternalRouter || true}
          showHomePage={!currentFilePath}
          initialFilePath={currentFilePath}
          selectedFile={currentFilePath}
          integrated={true}
          onFileSelect={(filePath: string) => {
            console.log('📄 File selected:', filePath);
            const basePath = props.basePath || '/md-docs';
            const newPath = filePath ? `${basePath}/${filePath}` : basePath;
            navigate(newPath);
          }}
        />
      </div>
    </>
  );
};

/**
 * Custom implementation of the standalone viewer that doesn't create its own router
 * This avoids the "You cannot render a <Router> inside another <Router>" error
 */
export const CustomStandaloneViewer: React.FC<{
  apiBaseUrl: string;
  basePath?: string;
  hideFileTree?: boolean;
}> = (props) => {
  return (
    <EnhancedMobileViewer
      {...props}
      useExternalRouter={true} // Use the app's router instead of creating a new one
    />
  );
};

/**
 * Custom implementation of the integrated viewer
 * This ensures we're using the same approach for both viewers
 */
export const CustomIntegratedViewer: React.FC<{
  apiBaseUrl: string;
  basePath?: string;
  hideFileTree?: boolean;
}> = (props) => {
  return (
    <EnhancedMobileViewer
      {...props}
      useExternalRouter={true} // Use the app's router instead of creating a new one
    />
  );
};

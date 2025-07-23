// Import our custom viewers that avoid router nesting issues
import { CustomStandaloneViewer, CustomIntegratedViewer } from './CustomViewers';

const MarkdownViewer = ({
  apiBaseUrl,
  basePath,
  hideFileTree,
  integrated
}: {
  apiBaseUrl: string;
  basePath?: string;
  hideFileTree?: boolean;
  integrated?: boolean;
}) => {
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      <div style={{ flex: 1 }}>
        {integrated ? 
          <CustomIntegratedViewer
            apiBaseUrl={apiBaseUrl}
            basePath={basePath || '/md-docs'}
            hideFileTree={hideFileTree}
          /> :
          <CustomStandaloneViewer
            apiBaseUrl={apiBaseUrl}
            basePath={basePath || '/docs'}
            hideFileTree={hideFileTree}
          />
        }
      </div>
    </div>
  );
};

export default MarkdownViewer;

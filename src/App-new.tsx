import { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { MarkdownContent, ThemeProvider } from '@asafarim/simple-md-viewer';
import '@asafarim/simple-md-viewer/dist/style.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('smv-theme') as 'light' | 'dark' | null;
    return savedTheme || 'light';
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('smv-theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HashRouter>
      <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
        <MarkdownContent 
          apiBaseUrl="http://localhost:3300" 
          showHomePage={true}
          hideFileTree={false}
        />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;

# @asafarim/complete-md-viewer

A flexible, production-ready markdown viewer component for React applications with support for both standalone and integrated use cases. Transform your markdown files into a professional documentation website with an intuitive file tree, responsive design, and beautiful theming.

## ✨ Features

- 📁 **Interactive File Tree Navigation** - Browse markdown files with collapsible sidebar
- 📝 **Professional Markdown Rendering** - Syntax highlighting and GitHub Flavored Markdown support
- 🔍 **YAML Front Matter Support** - Rich document metadata display
- 🌗 **Light & Dark Themes** - Seamless theme switching with consistent styling
- 📱 **Mobile Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Customizable Styling** - Easy theme customization and CSS overrides
- 🔄 **Flexible Integration Options**:
  - **Standalone mode** with built-in router for independent documentation sites
  - **Integrated mode** that works seamlessly with your existing React Router setup
- 🚀 **Production Ready** - Optimized for performance and professional documentation sites

## 🚀 Quick Start

For a complete tutorial with screenshots and advanced features, see our [Complete Tutorial](./how-to.md).

### Basic Setup

```bash
npm install @asafarim/complete-md-viewer
# Ensure you have peer dependencies
npm install react react-dom react-router-dom
```

### Minimal Example

```tsx
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MarkdownContent, ThemeProvider } from '@asafarim/complete-md-viewer';
import '@asafarim/complete-md-viewer/dist/style.css';

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeProvider theme={theme} toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <HashRouter>
        <Routes>
          <Route 
            path="/*" 
            element={
              <MarkdownContent 
                apiBaseUrl="http://localhost:3300" 
                showHomePage={true}
                hideFileTree={false}
              />
            } 
          />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
```

## 📖 Usage Examples

### Standalone Mode

Perfect for dedicated documentation sites. Includes built-in routing and theme management:

```tsx
import { StandaloneMarkdownViewer } from '@asafarim/complete-md-viewer';
import '@asafarim/complete-md-viewer/dist/style.css';

function App() {
  return (
    <StandaloneMarkdownViewer 
      apiBaseUrl="http://localhost:3300"
      showHomePage={true}
      hideFileTree={false}
      sidebarCollapsed={true} // Professional collapsed sidebar by default
    />
  );
}
```

### Integrated Mode

Embed within your existing React Router application:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntegratedMarkdownViewer } from '@asafarim/complete-md-viewer';
import '@asafarim/complete-md-viewer/dist/style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/*" element={
          <IntegratedMarkdownViewer 
            apiBaseUrl="http://localhost:3300"
            basePath="/docs"
            hideFileTree={false}
          />
        } />
      </Routes>
    </BrowserRouter>
  );
}
```

### Advanced: Custom Components

For maximum flexibility, use individual components:

```tsx
import { MarkdownContent, FileTree, ThemeProvider } from '@asafarim/complete-md-viewer';
import '@asafarim/complete-md-viewer/dist/style.css';

function CustomViewer() {
  const [content, setContent] = useState('');
  const [frontMatter, setFrontMatter] = useState({});
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeProvider theme={theme} toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <div className="custom-layout">
        <FileTree 
          data={treeData}
          onFileSelect={(path) => loadFile(path)}
        />
        <MarkdownContent 
          content={content}
          frontMatter={frontMatter}
        />
      </div>
    </ThemeProvider>
  );
}
```

## ⚙️ Backend Setup

The package requires a simple backend server to serve your markdown files. Here's a minimal Express.js setup:

```javascript
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3300;
const mdDocsPath = path.join(process.cwd(), 'markdown-files');

app.use(cors());

// API to return folder structure
app.get('/api/folder-structure', (req, res) => {
  const folderStructure = getFolderStructure(mdDocsPath);
  res.json({ nodes: folderStructure });
});

// API to serve markdown files
app.get('/api/file', (req, res) => {
  const filePath = path.join(mdDocsPath, req.query.path);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ content });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

function getFolderStructure(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath);
  const result = [];

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    const itemRelativePath = path.join(relativePath, item).replace(/\\/g, '/');

    if (stats.isDirectory()) {
      result.push({
        name: item,
        path: itemRelativePath,
        type: 'folder',
        children: getFolderStructure(itemPath, itemRelativePath)
      });
    } else if (item.endsWith('.md')) {
      result.push({
        name: item,
        path: itemRelativePath,
        type: 'file'
      });
    }
  }
  return result;
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

### Required API Endpoints

- `GET /api/folder-structure` - Returns the file tree structure
- `GET /api/file?path=<file-path>` - Returns the content of a specific file

## 🎨 YAML Front Matter Support

Enhance your markdown files with rich metadata:

```markdown
---
title: "API Documentation"
description: "Complete API reference guide"
author: "Your Name"
date: "2025-01-22"
category: "Documentation"
tags: ["api", "reference", "guide"]
toc: true
---

# Your markdown content here...
```

The front matter will be automatically parsed and displayed in a beautiful metadata section.

## 📋 API Reference

### StandaloneMarkdownViewer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| apiBaseUrl | string | - | API base URL for fetching markdown content |
| showHomePage | boolean | true | Whether to show the home page when no file is selected |
| hideFileTree | boolean | false | Whether to hide the file tree sidebar |
| sidebarCollapsed | boolean | false | Initial state of the sidebar (collapsed/expanded) |
| className | string | - | Custom CSS class name |
| style | object | - | Custom inline styles |
| basePath | string | '/' | Base path for routing |

### IntegratedMarkdownViewer

Same props as `StandaloneMarkdownViewer`, designed for use within existing React Router applications.

### MarkdownContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| apiBaseUrl | string | - | API base URL for fetching markdown content |
| showHomePage | boolean | true | Whether to show the home page |
| hideFileTree | boolean | false | Whether to hide the file tree |
| sidebarCollapsed | boolean | false | Control sidebar collapsed state |
| content | string | - | Direct markdown content (alternative to API fetching) |
| frontMatter | object | - | Front matter metadata object |
| className | string | - | Custom CSS class name |

### FileTree

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | TreeNode[] | - | Tree data structure |
| selectedPath | string | - | Currently selected file path |
| onFileSelect | function | - | Callback when a file is selected |
| className | string | - | Custom CSS class name |

### ThemeProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| theme | 'light' \| 'dark' | 'light' | Current theme |
| toggleTheme | function | - | Function to toggle between themes |
| children | ReactNode | - | Child components |

## 💡 Advanced Features

### Theme Customization

Override CSS variables to customize the appearance:

```css
:root {
  /* Light theme */
  --smv-bg-primary: #ffffff;
  --smv-text-primary: #333333;
  --smv-accent-primary: #2196f3;
  
  /* Dark theme */
  --smv-bg-primary-dark: #1e1e1e;
  --smv-text-primary-dark: #e0e0e0;
  --smv-accent-primary-dark: #64b5f6;
}
```

### Mobile Responsiveness

The component automatically adapts to different screen sizes:

- **Desktop**: Professional sidebar with toggle control
- **Tablet**: Compressed sidebar with easy access
- **Mobile**: Overlay sidebar optimized for touch

### File Structure

Organize your markdown files in any directory structure:

```
markdown-files/
├── README.md
├── getting-started/
│   ├── installation.md
│   └── quick-start.md
├── api/
│   ├── overview.md
│   └── endpoints.md
└── guides/
    ├── styling.md
    └── deployment.md
```

## 🚀 Complete Tutorial

For a comprehensive step-by-step guide with screenshots and advanced implementation examples, check out our [Complete Tutorial](./how-to.md). It covers:

- 📖 **Complete project setup** from scratch
- 🎨 **Advanced styling** and theme customization  
- 📱 **Mobile optimization** techniques
- 🔧 **Production deployment** strategies
- 💡 **Best practices** and troubleshooting
- 🖼️ **Visual examples** with screenshots

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [ASafariM](https://github.com/alisafari-it)

## 🔗 Links

- [GitHub Repository](https://github.com/alisafari-it/complete-md-viewer)
- [npm Package](https://www.npmjs.com/package/@asafarim/complete-md-viewer)
- [Issues & Support](https://github.com/alisafari-it/complete-md-viewer/issues)

---

**Transform your markdown files into a professional documentation website today!** 🚀

import React from 'react';

interface HtmlPreviewProps {
  content: string;
  isDarkMode?: boolean;
}

const HtmlPreview: React.FC<HtmlPreviewProps> = ({ content, isDarkMode = false }) => {
  // Generate a unique ID for this preview
  const containerId = `preview-${Math.random().toString(36).substring(2, 9)}`;

  // Apply custom styles to the preview container
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      #${containerId} {
        font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.8;
        color: ${isDarkMode ? '#e2e8f0' : '#1a202c'};
        background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
        padding: 2rem;
        border-radius: 0.5rem;
        max-width: 100%;
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
      }
      
      #${containerId} h1, #${containerId} h2, #${containerId} h3, 
      #${containerId} h4, #${containerId} h5, #${containerId} h6 {
        color: ${isDarkMode ? '#93c5fd' : '#3b82f6'};
        margin-top: 1.5em;
        margin-bottom: 0.75em;
        font-weight: 700;
        line-height: 1.2;
      }
      
      #${containerId} h1 {
        font-size: 2.25em;
        border-bottom: 2px solid ${isDarkMode ? '#334155' : '#e2e8f0'};
        padding-bottom: 0.25em;
      }
      
      #${containerId} h2 {
        font-size: 1.875em;
        border-bottom: 1px solid ${isDarkMode ? '#334155' : '#e2e8f0'};
        padding-bottom: 0.25em;
      }
      
      #${containerId} h3 { font-size: 1.5em; }
      #${containerId} h4 { font-size: 1.25em; }
      
      #${containerId} p {
        margin-top: 1em;
        margin-bottom: 1em;
      }
      
      #${containerId} a {
        color: ${isDarkMode ? '#60a5fa' : '#2563eb'};
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      
      #${containerId} a:hover {
        color: ${isDarkMode ? '#93c5fd' : '#3b82f6'};
      }
      
      #${containerId} strong, #${containerId} b {
        font-weight: 700;
        color: ${isDarkMode ? '#f8fafc' : '#0f172a'};
      }
      
      #${containerId} ul, #${containerId} ol {
        margin-top: 1em;
        margin-bottom: 1em;
        padding-left: 2em;
      }
      
      #${containerId} ul {
        list-style-type: disc;
      }
      
      #${containerId} ol {
        list-style-type: decimal;
      }
      
      #${containerId} li {
        margin-top: 0.25em;
        margin-bottom: 0.25em;
      }
      
      #${containerId} blockquote {
        border-left: 4px solid ${isDarkMode ? '#475569' : '#cbd5e1'};
        padding-left: 1em;
        margin-left: 0;
        margin-right: 0;
        font-style: italic;
        color: ${isDarkMode ? '#cbd5e1' : '#475569'};
      }
      
      #${containerId} code {
        font-family: monospace;
        background-color: ${isDarkMode ? '#334155' : '#f1f5f9'};
        padding: 0.2em 0.4em;
        border-radius: 0.25em;
        font-size: 0.875em;
      }
      
      #${containerId} pre {
        background-color: ${isDarkMode ? '#1e293b' : '#f8fafc'};
        border: 1px solid ${isDarkMode ? '#334155' : '#e2e8f0'};
        border-radius: 0.5em;
        padding: 1em;
        overflow-x: auto;
        margin: 1em 0;
      }
      
      #${containerId} pre code {
        background-color: transparent;
        padding: 0;
        font-size: 0.875em;
        color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
      }
      
      #${containerId} table {
        width: 100%;
        border-collapse: collapse;
        margin: 1em 0;
      }
      
      #${containerId} th, #${containerId} td {
        border: 1px solid ${isDarkMode ? '#334155' : '#e2e8f0'};
        padding: 0.5em;
        text-align: left;
      }
      
      #${containerId} th {
        background-color: ${isDarkMode ? '#334155' : '#f1f5f9'};
        font-weight: 700;
      }
      
      #${containerId} tr:nth-child(even) {
        background-color: ${isDarkMode ? '#1e293b' : '#f8fafc'};
      }
      
      #${containerId} img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1em auto;
        border-radius: 0.25em;
      }
      
      #${containerId} hr {
        border: none;
        border-top: 1px solid ${isDarkMode ? '#334155' : '#e2e8f0'};
        margin: 2em 0;
      }
      
      @media (max-width: 768px) {
        #${containerId} {
          padding: 1rem;
        }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [containerId, isDarkMode]);

  return (
    <div id={containerId} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default HtmlPreview; 
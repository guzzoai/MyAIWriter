import React from 'react';

interface MarkdownPreviewProps {
  content: string;
  isDarkMode?: boolean;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content, isDarkMode = false }) => {
  // Generate a unique ID for this preview
  const containerId = `md-preview-${Math.random().toString(36).substring(2, 9)}`;

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
        font-family: monospace;
        white-space: pre-wrap;
      }
      
      @media (max-width: 768px) {
        #${containerId} {
          padding: 1rem;
          font-size: 0.875rem;
        }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [containerId, isDarkMode]);

  return (
    <div id={containerId}>{content}</div>
  );
};

export default MarkdownPreview; 
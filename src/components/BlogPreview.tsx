import React, { useState, useEffect } from 'react';
import { Blog } from '../types';
import { formatDate } from '../utils/dateUtils';
import { htmlToMarkdown, copyToClipboard } from '../utils/formatUtils';
import HtmlPreview from './HtmlPreview';
import MarkdownPreview from './MarkdownPreview';
import PrintView from './PrintView';

interface BlogPreviewProps {
  blog: Blog | null;
  blogs: Blog[];
  onSave: (blog: Blog) => void;
  onDelete: (id: string) => void;
  onSelect: (blog: Blog) => void;
  isEditing?: boolean;
}

type ViewMode = 'formatted' | 'raw-html' | 'raw-md';

const BlogPreview = ({ blog, blogs, onSave, onDelete, onSelect, isEditing: initialEditing = false }: BlogPreviewProps) => {
  const [editContent, setEditContent] = useState('');
  const [isEditing, setIsEditing] = useState(initialEditing);
  const [viewMode, setViewMode] = useState<ViewMode>('formatted');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  
  useEffect(() => {
    setIsEditing(initialEditing);
  }, [initialEditing]);
  
  useEffect(() => {
    if (blog && (isEditing || initialEditing)) {
      setEditContent(blog.content);
    }
  }, [blog, isEditing, initialEditing]);
  
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (blog && (viewMode === 'raw-md' || viewMode === 'formatted')) {
      setMarkdownContent(htmlToMarkdown(blog.content));
    }
  }, [blog, viewMode]);

  const handleEdit = () => {
    if (blog) {
      setEditContent(blog.content);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (blog) {
      onSave({ ...blog, content: editContent });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const toggleViewMode = () => {
    if (viewMode === 'formatted') {
      setViewMode('raw-html');
    } else if (viewMode === 'raw-html') {
      setViewMode('raw-md');
    } else {
      setViewMode('formatted');
    }
  };

  const handlePrintView = () => {
    setShowPrintView(true);
  };

  const closePrintView = () => {
    setShowPrintView(false);
  };
  
  const handleCopy = async () => {
    if (!blog) return;
    
    let textToCopy = '';
    
    if (viewMode === 'raw-md') {
      textToCopy = markdownContent;
    } else {
      textToCopy = blog.content;
    }
    
    const success = await copyToClipboard(textToCopy);
    
    if (success) {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } else {
      setCopySuccess('Failed to copy');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  const getViewModeLabel = () => {
    switch (viewMode) {
      case 'formatted':
        return 'Formatted';
      case 'raw-html':
        return 'Raw HTML';
      case 'raw-md':
        return 'Markdown';
      default:
        return 'View';
    }
  };

  if (!blog) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
        <div className="h-full flex items-center justify-center p-10">
          <p className="text-gray-500 dark:text-gray-400">No blog post selected. Please select a post from the dashboard or create a new one.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{blog.blogTopic}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {blog.articleType}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  {blog.tone}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  {blog.wordCount} words
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {blog.createdAt ? formatDate(blog.createdAt) : 'Unknown date'}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Target Keyword:</strong> {blog.targetKeyword}</p>
                <p><strong>Intended Audience:</strong> {blog.intendedAudience}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              {!isEditing && (
                <>
                  <button
                    onClick={handlePrintView}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded dark:bg-green-700 dark:hover:bg-green-600 transition-colors"
                  >
                    Print
                  </button>
                  <button
                    onClick={toggleViewMode}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded dark:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                  >
                    {getViewModeLabel()}
                  </button>
                  {(viewMode === 'raw-html' || viewMode === 'raw-md') && (
                    <button
                      onClick={handleCopy}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors relative"
                    >
                      {copySuccess ? copySuccess : `Copy ${viewMode === 'raw-md' ? 'Markdown' : 'HTML'}`}
                    </button>
                  )}
                </>
              )}
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={isEditing}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(blog.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded dark:bg-red-600 dark:hover:bg-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-auto flex-1">
          {isEditing ? (
            <div className="h-full flex flex-col">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full min-h-[500px] p-4 border border-gray-300 dark:border-gray-600 rounded resize-vertical flex-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-mono"
                autoFocus
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : viewMode === 'formatted' ? (
            <HtmlPreview content={blog.content} isDarkMode={isDarkMode} />
          ) : viewMode === 'raw-md' ? (
            <MarkdownPreview content={markdownContent} isDarkMode={isDarkMode} />
          ) : (
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 overflow-auto">
              {blog.content}
            </div>
          )}
        </div>

        {blogs.length > 1 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Other Posts</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {blogs.filter(item => item.id !== blog.id).map((item) => (
                <div 
                  key={item.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-gray-200 dark:border-gray-700 min-w-[200px] max-w-[200px] flex-shrink-0"
                  onClick={() => onSelect(item)}
                >
                  <div className="font-medium truncate text-gray-800 dark:text-gray-200">{item.blogTopic}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {item.articleType} | {item.tone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {showPrintView && blog && (
        <PrintView blog={blog} onClose={closePrintView} />
      )}
    </>
  );
};

export default BlogPreview; 
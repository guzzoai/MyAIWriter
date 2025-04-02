import React, { useRef, useEffect, useState } from 'react';
import { Blog } from '../types';
import { formatDate } from '../utils/dateUtils';
import { htmlToMarkdown, markdownToHtml } from '../utils/formatUtils';

interface PrintViewProps {
  blog: Blog;
  onClose: () => void;
}

const PrintView: React.FC<PrintViewProps> = ({ blog, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [formattedContent, setFormattedContent] = useState('');
  
  useEffect(() => {
    if (blog) {
      // Convert content to markdown then to properly formatted HTML
      const md = htmlToMarkdown(blog.content);
      setFormattedContent(markdownToHtml(md));
    }
  }, [blog]);
  
  const handlePrint = () => {
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <style>
        @media print {
          @page {
            margin: 1cm;
          }
          
          body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            color: #000;
            font-size: 12pt;
          }
          
          h1 {
            font-size: 24pt;
            margin-bottom: 0.5cm;
            color: #2563eb;
          }
          
          h2 {
            font-size: 18pt;
            margin-top: 1cm;
            margin-bottom: 0.5cm;
            color: #2563eb;
          }
          
          h3 {
            font-size: 14pt;
            margin-top: 0.8cm;
            margin-bottom: 0.4cm;
            color: #2563eb;
          }
          
          p {
            margin-bottom: 0.5cm;
            orphans: 3;
            widows: 3;
          }
          
          ul, ol {
            margin-bottom: 0.5cm;
            padding-left: 1cm;
          }
          
          a {
            color: #2563eb;
            text-decoration: underline;
          }
          
          .article-meta {
            font-size: 10pt;
            color: #6b7280;
            margin-bottom: 1cm;
          }
          
          .page-break {
            page-break-before: always;
          }
          
          .hidden-print {
            display: none !important;
          }
          
          img {
            max-width: 100%;
          }
          
          code, pre {
            font-family: monospace;
            background-color: #f3f4f6;
            padding: 0.1cm;
            border-radius: 0.1cm;
          }
          
          pre {
            padding: 0.3cm;
            margin: 0.5cm 0;
            white-space: pre-wrap;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 0.5cm 0;
          }
          
          th, td {
            border: 1px solid #d1d5db;
            padding: 0.2cm;
          }
          
          th {
            background-color: #f3f4f6;
          }
        }
      </style>
      <div>
        <h1>${blog.blogTopic}</h1>
        <div class="article-meta">
          <p><strong>Date:</strong> ${formatDate(blog.createdAt)}</p>
          <p><strong>Target Keyword:</strong> ${blog.targetKeyword}</p>
          <p><strong>Type:</strong> ${blog.articleType} | <strong>Tone:</strong> ${blog.tone}</p>
          <p><strong>Word Count:</strong> ${blog.wordCount} words</p>
        </div>
        ${formattedContent}
      </div>
    `;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.close();
      printWindow.focus();
      // Wait for content to load before printing
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col"
        ref={printRef}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Print Preview: {blog.blogTopic}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        
        <div className="overflow-auto p-6 flex-1">
          <div className="max-w-3xl mx-auto bg-white text-black p-8 shadow-md rounded-lg print:shadow-none">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">{blog.blogTopic}</h1>
            <div className="text-sm text-gray-600 mb-8">
              <p><strong>Date:</strong> {formatDate(blog.createdAt)}</p>
              <p><strong>Target Keyword:</strong> {blog.targetKeyword}</p>
              <p><strong>Type:</strong> {blog.articleType} | <strong>Tone:</strong> {blog.tone}</p>
              <p><strong>Word Count:</strong> {blog.wordCount} words</p>
            </div>
            <div 
              className="prose prose-lg max-w-none prose-headings:text-blue-600 prose-a:text-blue-600" 
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintView; 
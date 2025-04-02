import React from 'react';

const InstructionsPanel: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Creating Great Affiliate Content</h2>
      
      <div className="prose dark:prose-invert prose-gray dark:prose-gray max-w-none text-gray-700 dark:text-gray-200">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">Key Elements of a Successful Post</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Focus on solving a specific problem for your audience</li>
            <li>Include natural keyword placement (avoid keyword stuffing)</li>
            <li>Write compelling headlines and subheadings</li>
            <li>Add valuable content that educates the reader</li>
            <li>Include clear calls-to-action that don't feel forced</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">Tips for Better Conversions</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Build trust before promoting products</li>
            <li>Use personal experiences when discussing products</li>
            <li>Compare multiple products to show objectivity</li>
            <li>Include both pros and cons of products</li>
            <li>Use compelling product images (add these after generation)</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">SEO Best Practices</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Include your main keyword in title, headings, and content</li>
            <li>Write meta descriptions with clear value propositions</li>
            <li>Use proper heading structure (H1, H2, H3)</li>
            <li>Create content that's at least 1,000 words for depth</li>
            <li>Include internal and outbound links to authoritative sources</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">Ready to Get Started?</h3>
        <p className="text-blue-700 dark:text-blue-300">Fill out the form with your blog details and click "Generate" to create your SEO-optimized affiliate blog post!</p>
      </div>
    </div>
  );
};

export default InstructionsPanel; 
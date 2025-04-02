import React, { useState } from 'react';
import { ArticleType, ToneType, Blog } from '../types';

interface BlogFormProps {
  onSubmit: (formData: Omit<Blog, 'id' | 'content' | 'createdAt'>) => void;
  isLoading: boolean;
}

const BlogForm = ({ onSubmit, isLoading }: BlogFormProps) => {
  const [formData, setFormData] = useState<Omit<Blog, 'id' | 'content' | 'createdAt'>>({
    blogTopic: '',
    targetKeyword: '',
    wordCount: 1000,
    additionalContext: '',
    articleType: 'Informational',
    tone: 'Professional',
    intendedAudience: '',
    useFirstPerson: false,
    includeStories: false,
    addHook: true,
    addInteractiveHtml: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Blog Post Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Blog Post Topic</label>
          <input
            type="text"
            name="blogTopic"
            value={formData.blogTopic}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Target Keyword</label>
          <input
            type="text"
            name="targetKeyword"
            value={formData.targetKeyword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Word Count</label>
          <input
            type="number"
            name="wordCount"
            value={formData.wordCount}
            onChange={handleChange}
            min="500"
            max="3000"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Additional Context</label>
          <textarea
            name="additionalContext"
            value={formData.additionalContext}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            rows={3}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Article Type</label>
            <select
              name="articleType"
              value={formData.articleType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              required
            >
              <option value="Informational">Informational</option>
              <option value="Listicle">Listicle</option>
              <option value="How-To Guide">How-To Guide</option>
              <option value="Anecdote">Anecdote</option>
              <option value="Story">Story</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Tone</label>
            <select
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              required
            >
              <option value="Professional">Professional</option>
              <option value="Conversational">Conversational</option>
              <option value="Friendly">Friendly</option>
              <option value="Authoritative">Authoritative</option>
              <option value="Casual">Casual</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Intended Audience</label>
          <input
            type="text"
            name="intendedAudience"
            value={formData.intendedAudience}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="useFirstPerson"
              id="useFirstPerson"
              checked={formData.useFirstPerson}
              onChange={handleToggleChange}
              className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label htmlFor="useFirstPerson" className="text-gray-700 dark:text-gray-300">Use First Person</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="includeStories"
              id="includeStories"
              checked={formData.includeStories}
              onChange={handleToggleChange}
              className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label htmlFor="includeStories" className="text-gray-700 dark:text-gray-300">Include Stories & Examples</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="addHook"
              id="addHook"
              checked={formData.addHook}
              onChange={handleToggleChange}
              className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label htmlFor="addHook" className="text-gray-700 dark:text-gray-300">Add a Hook</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="addInteractiveHtml"
              id="addInteractiveHtml"
              checked={formData.addInteractiveHtml}
              onChange={handleToggleChange}
              className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label htmlFor="addInteractiveHtml" className="text-gray-700 dark:text-gray-300">Add Interactive HTML</label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:disabled:bg-blue-800 transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Blog Post'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm; 
import React, { useState } from 'react';
import { Blog } from '../types';
import { formatRelativeTime } from '../utils/dateUtils';

interface DashboardProps {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  onView: (blog: Blog) => void;
}

const Dashboard = ({ blogs, onEdit, onDelete, onView }: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs.filter(blog => 
    blog.blogTopic.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.targetKeyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate some stats
  const totalPosts = blogs.length;
  const totalWords = blogs.reduce((sum, blog) => sum + blog.wordCount, 0);
  const averageWordsPerPost = totalPosts > 0 ? Math.round(totalWords / totalPosts) : 0;
  
  // Get the most used article type and tone
  const articleTypeCounts = blogs.reduce((counts, blog) => {
    counts[blog.articleType] = (counts[blog.articleType] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  const toneCounts = blogs.reduce((counts, blog) => {
    counts[blog.tone] = (counts[blog.tone] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  const mostUsedArticleType = Object.entries(articleTypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  const mostUsedTone = Object.entries(toneCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  return (
    <div className="space-y-6">
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalPosts}</div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{totalWords}</div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Words</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{averageWordsPerPost}</div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Words/Post</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <div className="flex flex-col">
            <div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {mostUsedArticleType}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">Type</span>
            </div>
            <div className="mt-2">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                {mostUsedTone}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">Tone</span>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Most Used</div>
        </div>
      </div>

      {/* Main posts table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your Blog Posts</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-10">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-300">No blog posts found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {searchTerm ? 'Try a different search term' : 'Generate your first blog post to get started!'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Topic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Keyword</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Word Count</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{blog.blogTopic}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{blog.targetKeyword}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {blog.articleType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {blog.tone}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {blog.wordCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {blog.createdAt ? formatRelativeTime(blog.createdAt) : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onView(blog)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onEdit(blog)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(blog.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 
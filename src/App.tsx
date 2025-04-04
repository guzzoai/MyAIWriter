import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogPreview from './components/BlogPreview'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import InstructionsPanel from './components/InstructionsPanel'
import { Blog } from './types'
import { saveBlog, getAllBlogs, deleteBlog as dbDeleteBlog, updateBlog } from './db'

type ViewType = 'dashboard' | 'generate' | 'view' | 'edit';

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentView, setCurrentView] = useState<ViewType>('dashboard')

  // Load saved blogs from database on initial load
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const savedBlogs = await getAllBlogs();
        setBlogs(savedBlogs);
      } catch (error) {
        console.error('Error loading saved blogs:', error);
      }
    };
    
    loadBlogs();
  }, []);

  const handleGenerateBlog = async (formData: Omit<Blog, 'id' | 'content' | 'createdAt'>) => {
    setIsLoading(true)
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('openrouter_api_key') || ''}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: 'google/gemini-pro',
          messages: [
            {
              role: 'system',
              content: `You are an expert SEO content writer specialized in affiliate marketing. Your task is to write a long-form, high-quality blog post optimized for Google SEO and affiliate link conversion.

Topic: ${formData.blogTopic}  
Target Keyword: ${formData.targetKeyword}  
Word Count: ${formData.wordCount}  
Additional Context: ${formData.additionalContext}  
Article Type: ${formData.articleType}  
Tone: ${formData.tone}  
Intended Audience: ${formData.intendedAudience}  
Use First Person: ${formData.useFirstPerson}  
Include Stories: ${formData.includeStories}  
Hook: ${formData.addHook}  
Interactive HTML Element: ${formData.addInteractiveHtml}

Follow a structure with an engaging intro, well-structured body with subheadings, and a strong CTA conclusion. Include product comparisons, tips, and relevant CTAs for affiliate offers. Write in a clear, human tone, ready to publish.`
            }
          ]
        })
      })

      const data = await response.json()
      const generatedContent = data.choices[0].message.content

      const newBlog = {
        id: crypto.randomUUID(),
        content: generatedContent,
        createdAt: Date.now(),
        ...formData
      }

      // Save to database
      await saveBlog(newBlog);
      
      // Update state
      setBlogs([...blogs, newBlog])
      setCurrentBlog(newBlog)
      setCurrentView('view')
    } catch (error) {
      console.error('Error generating blog:', error)
      alert('Failed to generate blog. Please check your API key and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveBlog = async (updatedBlog: Blog) => {
    try {
      // Update in database
      await updateBlog(updatedBlog);
      
      // Update state
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
      setCurrentBlog(updatedBlog)
      setCurrentView('view') // Return to view mode after saving
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save changes. Please try again.');
    }
  }

  const handleDeleteBlog = async (id: string) => {
    try {
      // Delete from database
      await dbDeleteBlog(id);
      
      // Update state
      setBlogs(blogs.filter(blog => blog.id !== id))
      if (currentBlog?.id === id) {
        setCurrentBlog(null)
        setCurrentView('dashboard')
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  }

  const handleCreateNew = () => {
    setCurrentBlog(null)
    setCurrentView('generate')
  }

  const handleViewBlog = (blog: Blog) => {
    setCurrentBlog(blog)
    setCurrentView('view')
  }

  const handleEditBlog = (blog: Blog) => {
    setCurrentBlog(blog)
    setCurrentView('edit') // Changed to 'edit' instead of 'view'
  }

  const renderNavigation = () => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 transition-colors duration-200">
      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentView === 'dashboard'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={handleCreateNew}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentView === 'generate'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Create New Post
        </button>
        {currentBlog && currentView === 'view' && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md dark:bg-blue-700"
          >
            Viewing Post
          </button>
        )}
        {currentBlog && currentView === 'edit' && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md dark:bg-blue-700"
          >
            Editing Post
          </button>
        )}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            blogs={blogs}
            onView={handleViewBlog}
            onEdit={handleEditBlog}
            onDelete={handleDeleteBlog}
          />
        )
      case 'generate':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <BlogForm onSubmit={handleGenerateBlog} isLoading={isLoading} />
            <InstructionsPanel />
          </div>
        )
      case 'view':
        return (
          <BlogPreview
            blog={currentBlog}
            blogs={blogs}
            onSave={handleSaveBlog}
            onDelete={handleDeleteBlog}
            onSelect={handleViewBlog}
            isEditing={false}
          />
        )
      case 'edit':
        return (
          <BlogPreview
            blog={currentBlog}
            blogs={blogs}
            onSave={handleSaveBlog}
            onDelete={handleDeleteBlog}
            onSelect={handleViewBlog}
            isEditing={true}
          />
        )
      default:
        return <div>Unknown view</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="container mx-auto py-8 px-4">
        {renderNavigation()}
        {renderContent()}
      </main>
    </div>
  )
}

export default App 
import Dexie, { Table } from 'dexie';
import { Blog } from './types';

class BlogDatabase extends Dexie {
  blogs!: Table<Blog, string>;

  constructor() {
    super('myaiwriter-db');
    
    this.version(1).stores({
      blogs: 'id, blogTopic, targetKeyword, createdAt'
    });
  }
}

export const db = new BlogDatabase();

/**
 * Save blog to database
 */
export async function saveBlog(blog: Blog): Promise<string> {
  try {
    // If the blog doesn't have an ID, generate one
    if (!blog.id) {
      blog.id = crypto.randomUUID();
    }
    
    // If blog doesn't have createdAt, add it
    if (!blog.createdAt) {
      blog.createdAt = Date.now(); // Use timestamp in milliseconds
    }
    
    await db.blogs.put(blog);
    return blog.id;
  } catch (error) {
    console.error('Error saving blog:', error);
    throw error;
  }
}

/**
 * Get all blogs from database
 */
export async function getAllBlogs(): Promise<Blog[]> {
  try {
    return await db.blogs.toArray();
  } catch (error) {
    console.error('Error getting blogs:', error);
    return [];
  }
}

/**
 * Delete blog from database
 */
export async function deleteBlog(id: string): Promise<void> {
  try {
    await db.blogs.delete(id);
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}

/**
 * Update existing blog in database
 */
export async function updateBlog(blog: Blog): Promise<void> {
  try {
    await db.blogs.update(blog.id, blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
} 
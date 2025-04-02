/**
 * Converts HTML content to Markdown format
 * @param htmlContent The HTML content to convert
 * @returns The converted Markdown content
 */
export function htmlToMarkdown(htmlContent: string): string {
  if (!htmlContent) return '';
  
  let markdown = htmlContent;
  
  // Replace headings (h1-h6)
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');
  
  // Replace paragraph tags
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  
  // Replace strong/bold tags
  markdown = markdown.replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**');
  
  // Replace em/italic tags
  markdown = markdown.replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*');
  
  // Replace links
  markdown = markdown.replace(/<a[^>]*href=["'](.*?)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Replace images
  markdown = markdown.replace(/<img[^>]*src=["'](.*?)["'][^>]*alt=["'](.*?)["'][^>]*>/gi, '![$2]($1)');
  markdown = markdown.replace(/<img[^>]*alt=["'](.*?)["'][^>]*src=["'](.*?)["'][^>]*>/gi, '![$1]($2)');
  markdown = markdown.replace(/<img[^>]*src=["'](.*?)["'][^>]*>/gi, '![]($1)');
  
  // Replace unordered lists
  markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, listContent) => {
    const items = listContent.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
    return items + '\n';
  });
  
  // Replace ordered lists
  markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, listContent) => {
    let items = '';
    let count = 1;
    const listItems = listContent.match(/<li[^>]*>(.*?)<\/li>/gi);
    if (listItems) {
      items = listItems.map((item: string) => {
        const content = item.replace(/<li[^>]*>(.*?)<\/li>/i, '$1');
        return `${count++}. ${content}\n`;
      }).join('');
    }
    return items + '\n';
  });
  
  // Replace blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n');
  
  // Replace code blocks
  markdown = markdown.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```\n\n');
  
  // Replace inline code
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  
  // Replace horizontal rule
  markdown = markdown.replace(/<hr[^>]*>/gi, '---\n\n');
  
  // Replace line breaks
  markdown = markdown.replace(/<br[^>]*>/gi, '\n');
  
  // Clean up any excessive newlines
  markdown = markdown.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // Remove any remaining HTML tags
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  markdown = markdown.replace(/&nbsp;/g, ' ');
  markdown = markdown.replace(/&lt;/g, '<');
  markdown = markdown.replace(/&gt;/g, '>');
  markdown = markdown.replace(/&quot;/g, '"');
  markdown = markdown.replace(/&apos;/g, "'");
  markdown = markdown.replace(/&amp;/g, '&');
  
  return markdown.trim();
}

/**
 * Copies text to the clipboard
 * @param text The text to copy
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Try to use the modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

const formatUtils = {
  htmlToMarkdown,
  copyToClipboard,
};

export default formatUtils; 
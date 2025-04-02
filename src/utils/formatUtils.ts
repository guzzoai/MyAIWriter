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
 * Converts Markdown content to HTML format
 * @param markdownContent The Markdown content to convert
 * @returns The converted HTML content
 */
export function markdownToHtml(markdownContent: string): string {
  if (!markdownContent) return '';
  
  let html = markdownContent;
  
  // Convert headers
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
  html = html.replace(/^##### (.*?)$/gm, '<h5>$1</h5>');
  html = html.replace(/^###### (.*?)$/gm, '<h6>$1</h6>');
  
  // Convert bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Convert code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Convert links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Convert images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
  
  // Convert tables (Markdown tables format)
  // First, we need to detect table blocks
  const tableRegex = /^\|(.+)\|\r?\n\|(?:[-:]+\|)+\r?\n(\|.+\|\r?\n)+/gm;
  
  html = html.replace(tableRegex, (tableBlock) => {
    const rows = tableBlock.trim().split('\n');
    const headerRow = rows[0];
    const alignmentRow = rows[1];
    const bodyRows = rows.slice(2);
    
    // Process header cells
    const headerCells = headerRow
      .split('|')
      .filter(cell => cell.trim() !== '')
      .map(cell => `<th>${cell.trim()}</th>`)
      .join('');
    
    // Get alignment information
    const alignments = alignmentRow
      .split('|')
      .filter(cell => cell.trim() !== '')
      .map(cell => {
        const trimmed = cell.trim();
        if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
        if (trimmed.endsWith(':')) return 'right';
        return 'left';
      });
    
    // Process body rows
    const bodyHtml = bodyRows
      .map(row => {
        const cells = row
          .split('|')
          .filter(cell => cell.trim() !== '')
          .map((cell, i) => `<td style="text-align: ${alignments[i] || 'left'}">${cell.trim()}</td>`)
          .join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');
    
    return `<table class="border-collapse w-full">
      <thead>
        <tr>${headerCells}</tr>
      </thead>
      <tbody>
        ${bodyHtml}
      </tbody>
    </table>`;
  });
  
  // Convert unordered lists
  html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>\n)+/g, '<ul>$&</ul>');
  
  // Convert ordered lists - this is a bit more complex
  let index = 1;
  html = html.replace(/^\d+\. (.*?)$/gm, (match, p1) => {
    return `<li>${p1}</li>`;
  });
  html = html.replace(/(<li>.*?<\/li>\n)+/g, (match) => {
    // Check if this is already wrapped in <ul> tags (we processed it above)
    if (match.includes('<ul>')) return match;
    return `<ol>${match}</ol>`;
  });
  
  // Convert blockquotes
  html = html.replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>');
  
  // Convert horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  
  // Convert paragraphs (any line that's not processed yet)
  html = html.replace(/^([^<].*?)$/gm, (match, p1) => {
    // Ignore empty lines
    if (p1.trim() === '') return p1;
    // Avoid wrapping already processed elements
    if (p1.startsWith('<')) return p1;
    return `<p>${p1}</p>`;
  });
  
  // Clean up: replace multiple consecutive newlines with a single one
  html = html.replace(/\n\s*\n/g, '\n');
  
  return html;
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
  markdownToHtml,
  copyToClipboard,
};

export default formatUtils; 
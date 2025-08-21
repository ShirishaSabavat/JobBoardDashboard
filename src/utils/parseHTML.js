export const parseHTML = (htmlString) => {
  if (!htmlString) return '';
  
  try {
    // Basic HTML sanitization - remove script tags and other potentially dangerous content
    const sanitized = htmlString
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
    
    return sanitized;
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return htmlString || '';
  }
};

export const stripHTML = (htmlString) => {
  if (!htmlString) return '';
  
  try {
    return htmlString
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .trim();
  } catch (error) {
    console.error('Error stripping HTML:', error);
    return htmlString || '';
  }
};

export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  
  const strippedText = stripHTML(text);
  
  if (strippedText.length <= maxLength) {
    return strippedText;
  }
  
  return strippedText.substring(0, maxLength).trim() + '...';
};

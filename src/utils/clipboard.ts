/**
 * Clipboard Utilities
 * 
 * Safe clipboard operations that work in all browsers and contexts,
 * including when Clipboard API is blocked by permissions policy.
 */

/**
 * Copy text to clipboard with fallback for restricted contexts
 * 
 * Tries modern Clipboard API first, falls back to legacy execCommand
 * if blocked by permissions policy or not supported.
 * 
 * @param text - Text to copy
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Method 1: Try modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('[Clipboard] ✓ Copied using Clipboard API');
      return true;
    } catch (error) {
      // Silently fall through to Method 2 (this is expected in some contexts)
      // Fall through to Method 2
    }
  }

  // Method 2: Fallback - Legacy execCommand (works in iframes and non-HTTPS)
  try {
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    // Make textarea invisible but accessible
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.style.opacity = '0';
    
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.focus();
    textarea.select();
    
    // For iOS
    textarea.setSelectionRange(0, 99999);
    
    const successful = document.execCommand('copy');
    
    // Cleanup
    document.body.removeChild(textarea);
    
    if (successful) {
      console.log('[Clipboard] ✓ Copied using execCommand fallback');
      return true;
    } else {
      console.error('[Clipboard] ✗ execCommand failed');
      return false;
    }
  } catch (error) {
    console.error('[Clipboard] ✗ All copy methods failed:', error);
    return false;
  }
}

/**
 * Copy text to clipboard and show toast notification
 * 
 * @param text - Text to copy
 * @param successMessage - Message to show on success (optional)
 * @param errorMessage - Message to show on error (optional)
 * @param toast - Toast function from sonner (optional)
 * @returns Promise that resolves to true if successful
 */
export async function copyWithToast(
  text: string,
  successMessage: string = '✓ Copiado al portapapeles',
  errorMessage: string = '❌ Error al copiar',
  toast?: any
): Promise<boolean> {
  const success = await copyToClipboard(text);
  
  if (toast) {
    if (success) {
      toast.success(successMessage);
    } else {
      toast.error(errorMessage);
    }
  }
  
  return success;
}
// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = 'G-MSWPQ1R76K';

// Track custom events
export const trackEvent = (action: string, category?: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track PDF downloads
export const trackPdfDownload = (fileName: string, source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pdf_download', {
      event_category: 'engagement',
      event_label: fileName,
      custom_parameter_source: source,
      custom_parameter_file_type: 'pdf',
    });
    
    console.log(`📊 Analytics: PDF download tracked - ${fileName} from ${source}`);
  }
};

// Track page views (useful for SPAs)
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
      page_title: title,
    });
  }
};

// Track navigation clicks
export const trackNavigation = (linkText: string, destination: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'navigation_click', {
      event_category: 'navigation',
      event_label: linkText,
      custom_parameter_destination: destination,
    });
  }
};

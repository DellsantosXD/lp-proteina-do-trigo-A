// Meta Pixel & Analytics Utility

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    pixelId?: string;
  }
}

// Track fired events to prevent duplicate triggers
const firedEvents = new Set<string>();

export const trackPageView = () => {
  if (firedEvents.has('PageView')) return;
  firedEvents.add('PageView');

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

export const trackViewContent = (protocolName: string, price: number) => {
  const eventKey = `ViewContent_${protocolName}_${price}`;
  if (firedEvents.has(eventKey)) return;
  firedEvents.add(eventKey);

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: protocolName,
      content_type: 'product',
      value: price,
      currency: 'BRL',
    });
  }
};

export const trackInitiateCheckout = (protocolName: string, price: number, checkoutUrl?: string) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_name: protocolName,
      content_type: 'product',
      value: price,
      currency: 'BRL',
    });
  }
};

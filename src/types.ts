export type HeadlineId = 'a' | 'b' | 'c';

export interface HeadlineVariant {
  id: HeadlineId;
  label: string;
  text: string;
  isLong?: boolean;
}

export type LeadId = 'a' | 'b' | 'c';

export interface LeadVariant {
  id: LeadId;
  label: string;
  paragraphs: string[];
}

export interface TimelineItem {
  id: number;
  title: string;
  description: string;
  extraElement?: 'beforeAfter' | 'current';
}

export interface ReconstuctionStep {
  step: number;
  label: string;
  caption: string;
  strandWidth: number;
  color: string;
  glowOpacity: number;
  glowWidth: number;
  cracksVisible: boolean;
  dotsVisible: boolean;
  sheenActive: boolean;
}

export interface ProductLayer {
  number: number;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  type: 'video' | 'photo' | 'text';
  tag: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface Protocol {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  items: string[];
  isMostPopular?: boolean;
  badge?: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

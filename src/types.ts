/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  category: 'hair' | 'skin' | 'makeup' | 'nails' | 'spa' | 'bridal' | 'mehendi';
  price: number;
  duration: string;
  description: string;
  benefits: string[];
  image: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  rating: number;
  experience: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'bridal' | 'engagement' | 'hair' | 'mehendi' | 'interior' | 'before-after';
  image: string;
  beforeImage?: string; // For before-after sliders
  afterImage?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Hair Care' | 'Skincare' | 'Makeup Trends' | 'Wellness';
  summary: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  price: number;
  createdAt: string;
}

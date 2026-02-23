import React from 'react';
import { LucideIcon } from 'lucide-react';

export type Category = 
  | 'Image' 
  | 'Document' 
  | 'Calculator' 
  | 'Text' 
  | 'Developer' 
  | 'Color' 
  | 'Utility';

export type StaticPageType = 
  | 'privacy' 
  | 'terms' 
  | 'disclaimer' 
  | 'cookies' 
  | 'about' 
  | 'contact' 
  | 'dmca';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon: LucideIcon;
  component: React.ComponentType<any>;
}

export interface CategoryInfo {
  id: Category;
  title: string;
  icon: LucideIcon;
  color: string;
}

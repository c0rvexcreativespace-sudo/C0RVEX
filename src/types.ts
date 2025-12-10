// Import React to resolve namespace error
import React from 'react';

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Badge {
  icon: React.ReactNode;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  message: string;
  icon: React.ReactNode;
}
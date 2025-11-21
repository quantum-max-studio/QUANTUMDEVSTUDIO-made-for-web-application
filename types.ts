export enum UserRole {
  VISITOR = 'VISITOR',
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface ChatbotConfig {
  id: string;
  name: string;
  persona: string;
  primaryColor: string;
  textColor: string;
  avatarUrl?: string;
  knowledgeBaseFiles: string[];
}

export enum ViewState {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  EDITOR = 'EDITOR',
  CHATBOT_BUILDER = 'CHATBOT_BUILDER'
}

export interface FileUpload {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'link';
}
// In-memory store for shared documents
// In a production app, this would be a database
export const sharedDocuments = new Map();

export type SharedDocument = {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  expiresAt: string;
  createdAt: string;
}; 
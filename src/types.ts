export type ArticleType = 'Informational' | 'Listicle' | 'How-To Guide' | 'Anecdote' | 'Story';
export type ToneType = 'Professional' | 'Conversational' | 'Friendly' | 'Authoritative' | 'Casual';

export interface Blog {
  id: string;
  blogTopic: string;
  targetKeyword: string;
  wordCount: number;
  additionalContext: string;
  articleType: ArticleType;
  tone: ToneType;
  intendedAudience: string;
  useFirstPerson: boolean;
  includeStories: boolean;
  addHook: boolean;
  addInteractiveHtml: boolean;
  content: string;
  createdAt: number; // timestamp in milliseconds
} 
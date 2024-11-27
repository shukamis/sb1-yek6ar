export interface User {
  id: string;
  email: string;
  name: string;
  photoURL: string;
  premium: boolean;
}

export interface Relationship {
  id: string;
  userId: string;
  partnerId: string | null;
  startDate: string;
  photos: string[];
  monthlyReminder: boolean;
  lastChecked: string;
  partner1Name: string;
  partner2Name: string;
}

export interface DateIdea {
  id: string;
  title: string;
  description: string;
  category: 'romantic' | 'adventure' | 'casual' | 'intimate';
  premiumOnly: boolean;
}
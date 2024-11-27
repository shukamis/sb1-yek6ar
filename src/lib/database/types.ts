export interface BaseRecord {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface UserRecord extends BaseRecord {
  firebase_id: string;
  email: string;
  name: string;
  photo_url: string;
  premium: boolean;
  premium_expires_at: string | null;
}

export interface RelationshipRecord extends BaseRecord {
  user_id: string;
  partner1_name: string;
  partner2_name: string;
  start_date: string;
  photos: string[];
  monthly_reminder: boolean;
  last_checked: string;
}

export type RecordType = 'user' | 'relationship';
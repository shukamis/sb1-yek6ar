import { BaserowField } from '../types/baserow';

export const TABLES = {
  USERS: 'users',
  MEDIA: 'media',
  GOALS: 'goals',
  ACHIEVEMENTS: 'achievements',
} as const;

export const FIELDS = {
  USERS: {
    id: 'id',
    firebase_id: 'firebase_id',
    full_name: 'full_name',
    email: 'email',
    created_at: 'created_at',
    subscription_status: 'subscription_status',
    premium_expires_at: 'premium_expires_at',
    profile_photo: 'profile_photo',
    last_login: 'last_login',
  },

  MEDIA: {
    id: 'id',
    user_id: 'user_id',
    type: 'type', // profile_photo, progress_photo, document
    url: 'url',
    thumbnail_url: 'thumbnail_url',
    created_at: 'created_at',
    description: 'description',
    metadata: 'metadata', // JSON field for additional data
  },

  GOALS: {
    id: 'id',
    user_id: 'user_id',
    title: 'title',
    description: 'description',
    start_date: 'start_date',
    target_date: 'target_date',
    status: 'status', // in_progress, completed, archived
    category: 'category',
    progress: 'progress', // 0-100
    created_at: 'created_at',
    updated_at: 'updated_at',
    related_media: 'related_media', // Link to media table
  },

  ACHIEVEMENTS: {
    id: 'id',
    user_id: 'user_id',
    name: 'name',
    description: 'description',
    achieved_at: 'achieved_at',
    badge_level: 'badge_level', // bronze, silver, gold, platinum
    points: 'points',
    category: 'category',
    related_goal: 'related_goal', // Link to goals table
    metadata: 'metadata', // JSON field for additional data
  },
} as const;

export const FIELD_TYPES: Record<string, BaserowField[]> = {
  [TABLES.USERS]: [
    { name: FIELDS.USERS.id, type: 'number', primary: true },
    { name: FIELDS.USERS.firebase_id, type: 'text', required: true, unique: true },
    { name: FIELDS.USERS.full_name, type: 'text', required: true },
    { name: FIELDS.USERS.email, type: 'email', required: true, unique: true },
    { name: FIELDS.USERS.created_at, type: 'date', required: true },
    { 
      name: FIELDS.USERS.subscription_status,
      type: 'single_select',
      options: ['free', 'premium'],
      default_value: 'free'
    },
    { name: FIELDS.USERS.premium_expires_at, type: 'date' },
    { name: FIELDS.USERS.profile_photo, type: 'url' },
    { name: FIELDS.USERS.last_login, type: 'date' },
  ],

  [TABLES.MEDIA]: [
    { name: FIELDS.MEDIA.id, type: 'number', primary: true },
    { name: FIELDS.MEDIA.user_id, type: 'link_row', link_table: TABLES.USERS },
    { 
      name: FIELDS.MEDIA.type,
      type: 'single_select',
      options: ['profile_photo', 'progress_photo', 'document'],
      required: true
    },
    { name: FIELDS.MEDIA.url, type: 'url', required: true },
    { name: FIELDS.MEDIA.thumbnail_url, type: 'url' },
    { name: FIELDS.MEDIA.created_at, type: 'date', required: true },
    { name: FIELDS.MEDIA.description, type: 'long_text' },
    { name: FIELDS.MEDIA.metadata, type: 'json' },
  ],

  [TABLES.GOALS]: [
    { name: FIELDS.GOALS.id, type: 'number', primary: true },
    { name: FIELDS.GOALS.user_id, type: 'link_row', link_table: TABLES.USERS },
    { name: FIELDS.GOALS.title, type: 'text', required: true },
    { name: FIELDS.GOALS.description, type: 'long_text' },
    { name: FIELDS.GOALS.start_date, type: 'date', required: true },
    { name: FIELDS.GOALS.target_date, type: 'date' },
    { 
      name: FIELDS.GOALS.status,
      type: 'single_select',
      options: ['in_progress', 'completed', 'archived'],
      required: true,
      default_value: 'in_progress'
    },
    { 
      name: FIELDS.GOALS.category,
      type: 'single_select',
      options: ['health', 'career', 'education', 'personal'],
      required: true
    },
    { name: FIELDS.GOALS.progress, type: 'number', min: 0, max: 100 },
    { name: FIELDS.GOALS.created_at, type: 'date', required: true },
    { name: FIELDS.GOALS.updated_at, type: 'date', required: true },
    { name: FIELDS.GOALS.related_media, type: 'link_row', link_table: TABLES.MEDIA },
  ],

  [TABLES.ACHIEVEMENTS]: [
    { name: FIELDS.ACHIEVEMENTS.id, type: 'number', primary: true },
    { name: FIELDS.ACHIEVEMENTS.user_id, type: 'link_row', link_table: TABLES.USERS },
    { name: FIELDS.ACHIEVEMENTS.name, type: 'text', required: true },
    { name: FIELDS.ACHIEVEMENTS.description, type: 'long_text' },
    { name: FIELDS.ACHIEVEMENTS.achieved_at, type: 'date', required: true },
    { 
      name: FIELDS.ACHIEVEMENTS.badge_level,
      type: 'single_select',
      options: ['bronze', 'silver', 'gold', 'platinum'],
      required: true
    },
    { name: FIELDS.ACHIEVEMENTS.points, type: 'number', min: 0 },
    { 
      name: FIELDS.ACHIEVEMENTS.category,
      type: 'single_select',
      options: ['health', 'career', 'education', 'personal'],
      required: true
    },
    { name: FIELDS.ACHIEVEMENTS.related_goal, type: 'link_row', link_table: TABLES.GOALS },
    { name: FIELDS.ACHIEVEMENTS.metadata, type: 'json' },
  ],
};
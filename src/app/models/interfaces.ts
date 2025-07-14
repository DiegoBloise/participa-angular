export interface Event {
  id?: string;
  name: string;
  banner?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  startAt: Date;
  endAt: Date;
  location: string;
  maxParticipants: number;
  categoryId?: string;
  organizerId?: string;
  participants?: number;
  organizer: User;
  category: Category;
}

export interface Category {
  id?: string;
  title: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

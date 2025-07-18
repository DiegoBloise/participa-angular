export interface UserEvent {
  id?: string;
  name: string;
  banner?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  startAt: string;
  endAt: string;
  location: string;
  maxParticipants: number;
  organizer: User;
  category: Category;
}

export interface EventAccessCode {
  accessCode: string;
}

export interface Category {
  id?: string;
  title: string;
}

export interface User {
  id?: string;
  email: string;
  name: string;
  phone: string;
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatedEvent, UserEvent } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events';
  private http = inject(HttpClient);

  constructor() {}

  getEvents(): Observable<UserEvent[]> {
    return this.http.get<UserEvent[]>(this.apiUrl);
  }

  getEventById(id: string): Observable<UserEvent> {
    return this.http.get<UserEvent>(`${this.apiUrl}/${id}`);
  }

  getEventByAccessCode(accessCode: string): Observable<UserEvent> {
    return this.http.get<UserEvent>(`${this.apiUrl}/code/${accessCode}`);
  }

  createEvent(userEvent: UserEvent): Observable<CreatedEvent> {
    return this.http.post<CreatedEvent>(this.apiUrl, userEvent);
  }

  updateEvent(userEvent: UserEvent): Observable<CreatedEvent> {
    return this.http.put<CreatedEvent>(this.apiUrl, userEvent);
  }

  deleteEvent(userEventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userEventId}`);
  }
}

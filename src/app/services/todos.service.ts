import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { API_URL } from '../constants/api-url';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]> {
    const headers = new HttpHeaders({
      MyCustomHeader: Math.random().toString(),
    });
    const params = new HttpParams()
      .append('_limit', '33')
      .append('custom', 'custom');
    return this.http
      .get<Todo[]>(`${API_URL}`, {
        headers,
        params,
        // observe: 'body'
        observe: 'response',
      })
      .pipe(
        tap((response) => console.log(response)),
        map((response) => response.body),
        delay(1500),
        catchError((error) => {
          console.log(error.message);
          return throwError(error);
        })
      );
  }

  addTodo(newTodo: Omit<Todo, 'id'>) {
    return this.http.post<Todo>(`${API_URL}`, newTodo);
  }

  removeTodo(id: number) {
    console.log(HttpEventType);
    return this.http
      .delete<void>(`${API_URL}/${id}`, {
        observe: 'events',
      })
      .pipe(tap((event) => console.log(event)));
  }

  completeTodo(id: number) {
    return this.http.patch<Todo>(
      `${API_URL}/${id}`,
      { completed: true },
      { responseType: 'json' }
    );
  }
}

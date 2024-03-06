import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Base URL of your backend API

  constructor(private http: HttpClient) { }

  get(endpoint: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  post(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  put(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(endpoint: string, headers?: HttpHeaders): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    // Your error handling logic here
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

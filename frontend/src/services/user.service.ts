import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getAllUsers(page: number = 0, limit: number = 30): Observable<User[]> {
    return this.apiService.get(`users?page=${page}&limit=${limit}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching users:', error);
        return throwError(
          () => new Error('Failed to fetch users. Please try again later.')
        );
      })
    );
  }

  getUser(userId: string): Observable<User> {
    return this.apiService.get(`users/${userId}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching user:', error);
        return throwError(
          () => new Error('Failed to fetch user. Please try again later.')
        );
      })
    );
  }

  createUser(userData: any): Observable<any> {
    return this.apiService.post('users/register', userData).pipe(
      catchError((error) => {
        console.error('Error occurred while creating user:', error);
        return throwError(
          () => new Error('Failed to create user. Please try again later.')
        );
      })
    );
  }

  updateUser(userId: string, userData: User): Observable<any> {
    return this.apiService.put(`users/${userId}`, userData).pipe(
      catchError((error) => {
        console.error('Error occurred while updating user:', error);
        return throwError(
          () => new Error('Failed to update user. Please try again later.')
        );
      })
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.apiService.delete(`users/${userId}`).pipe(
      catchError((error) => {
        console.error('Error occurred while deleting user:', error);
        return throwError(
          () => new Error('Failed to delete user. Please try again later.')
        );
      })
    );
  }

  login(userData: User): Observable<any> {
    return this.apiService.post('users/login', userData).pipe(
      catchError((error) => {
        console.error('Error occurred while creating user:', error);
        return throwError(
          () => new Error('Failed to create user. Please try again later.')
        );
      })
    );
  }
}

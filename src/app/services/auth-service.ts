import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_V0_BASE_URL } from '../config/api-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = `${API_V0_BASE_URL}/Auth/login`;


  constructor(private http: HttpClient) { }

  loginUser(data: LoginUser): Observable<UserResponse> {
    console.log("LoginData", data)
    return this.http.post<UserResponse>(`${this.baseUrl}`, data, { withCredentials: true });
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  getEmployeeId(): string {
    return this.getUser().employeeId;
  }

  getCompanyId(): string | null {
    return this.getUser()!.companyId;
  }

  getRole() {
    return this.getUser()!.role;
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  logout() {
    localStorage.clear();
  }

  hasRole(...roles: string[]): boolean {
    const role = this.getRole();

    return role !== null && roles.includes(role);
  }
}

export class LoginUser {
  email!: string;
  password!: string;
}

export class UserResponse {
  data!: {
    employeeId: string,
    name: string;
    email: string;
    companyId: string;
    phoneNumber: number;
    role: string;
    token: string;
    userId: string;
  }
  message!: string;
  success!: boolean;
}

export enum Role {
  SuperAdmin = 'SuperAdmin',
  Manager = 'Manager',
  HR = 'HR',
  Employee = 'Employee'
}
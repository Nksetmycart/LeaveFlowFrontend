import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_V0_BASE_URL } from '../config/api-config';
// Optional: Import your auth service to resolve the active employee identifier
// import { AuthService } from './auth.service'; 

// TypeScript model mapping LeaveManagementSystemBackend.Models.DTOs.EmployeeDto.CreateEmployeeDto
export interface CreateEmployeeDto {
  departmentId: string; // Maps to .NET Guid
  roleId: string;       // Maps to .NET Guid
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address?: string | null;
  joiningDate: string | Date;
}

// TypeScript model mapping LeaveManagementSystemBackend.Models.DTOs.EmployeeDto.EmployeeResponseDto
export interface EmployeeResponseDto {
  id: string;
  userId: string;
  companyId: string;
  department: string;
  role: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  joiningDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Wrapper interface structure standard for handling server response wrapper payloads
export interface EmployeeListResponse {
  success: boolean;
  message: string;
  data: EmployeeResponseDto[];
}

export interface SingleEmployeeResponse {
  success: boolean;
  message: string;
  data: EmployeeResponseDto;
}

export interface UpdateEmployeeDto {
  departmentId: string;
  roleId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  joiningDate: string;
}

export interface DeleteEmployeeResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private baseUrl = `${API_V0_BASE_URL}/Employee`;

  private employeeData: EmployeeResponseDto | null = null;

  constructor(
    private http: HttpClient,
  ) { }

  setEmployee(employee: EmployeeResponseDto) {
    this.employeeData = employee;
  }

  getEmployee(): EmployeeResponseDto | null {
    return this.employeeData;
  }

  clearEmployee(): void {
    this.employeeData = null;
  }

  CreateEmployee(data: CreateEmployeeDto): Observable<any> {
    console.log("Provisioning new employee record entry:", data);
    return this.http.post<any>(this.baseUrl, data);
  }

  GetEmployeeById(employeeId?: string): Observable<SingleEmployeeResponse> {
    const targetId = employeeId || 'fetch-fallback-guid';

    console.log(`Requesting structural information map profile for identity: ${targetId}`);
    return this.http.get<SingleEmployeeResponse>(`${this.baseUrl}/${targetId}`);
  }

  GetEmployees(page: number, pageSize: number): Observable<EmployeeListResponse> {
    return this.http.get<EmployeeListResponse>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }

  UpdateEmployeeById(data: UpdateEmployeeDto, employeeId: string): Observable<SingleEmployeeResponse> {
    return this.http.put<SingleEmployeeResponse>(`${this.baseUrl}/${employeeId}`, data)
  }

  DeleteEmployeeById(employeeId: string): Observable<DeleteEmployeeResponse> {
    return this.http.delete<DeleteEmployeeResponse>(`${this.baseUrl}/${employeeId}`)
  }
}
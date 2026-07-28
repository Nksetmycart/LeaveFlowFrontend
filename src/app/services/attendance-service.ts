import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_V0_BASE_URL } from '../config/api-config';

@Injectable({
  providedIn: 'root',
})

export class AttendanceService {
  private baseUrl = `${API_V0_BASE_URL}/Attendance`;

  constructor(private http: HttpClient) { }

  GetAttendanceByEmployee(employeeId?: string): Observable<AttendanceListResponse> {
    return this.http.get<AttendanceListResponse>(`${this.baseUrl}/${employeeId}`);
  }

  MarkAttendance(data: MarkAttendance, employeeId?: string): Observable<MarkAttendanceResponse> {
    return this.http.post<MarkAttendanceResponse>(`${this.baseUrl}/${employeeId}`, data);
  }

  MarkBulkAttendance(data: MarkAttendance[], employeeId?: string): Observable<MarkAttendanceListResponse> {
    return this.http.post<MarkAttendanceListResponse>(`${this.baseUrl}/${employeeId}/bulk`, data);
  }
}

export interface MarkAttendance {
  attendanceDate: string;
  status: string;
}

export interface MarkAttendanceResponse {
  success: boolean;
  message: string;
  data: string;
}
export interface MarkAttendanceListResponse {
  success: boolean;
  message: string;
  data: string[];
}

export interface AttendanceListResponse {
  success: boolean;
  message: string;
  data: Array<{
    id: string;
    companyId: string;
    employeeName: string;
    attendanceDate: Date;
    status: string;
    createdAt: Date;
  }>

}
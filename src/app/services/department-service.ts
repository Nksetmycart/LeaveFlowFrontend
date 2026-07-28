import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_V0_BASE_URL } from '../config/api-config';

export interface DeleteDepartmentResponse {
  success: boolean;
  message: string;
}

export interface CreateDepartment {
  name: string;
  description: string;
}

export interface UpdateDepartmentDto {
  name: string;
  description: string;
}

export interface DepartmentResponse {
  message: string;
  success: boolean;
  data: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  private baseUrl = `${API_V0_BASE_URL}/Department`;



  constructor(private http: HttpClient) {}

  CreateDepartment(data: CreateDepartment): Observable<DepartmentResponse> {
    console.log("CreateDepartmentData: ",data)
    return this.http.post<DepartmentResponse>(
      `${this.baseUrl}`,
      data,
    );
  }

  GetAllDepartments(): Observable<GetDepartmentsList> {
    return this.http.get<GetDepartmentsList> (
      `${this.baseUrl}`
    );
  }

  DeleteDepartmentById(departmentId: string): Observable<DeleteDepartmentResponse> {
    return this.http.delete<DeleteDepartmentResponse> (`${this.baseUrl}/${departmentId}`)
  }

  UpdateDepartmentById(data: UpdateDepartmentDto, departmentId: string): Observable<DepartmentResponse> {
    return this.http.put<DepartmentResponse> (`${this.baseUrl}/${departmentId}`, data);
  }

}



export class GetDepartmentsList {
  data!: Array<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }>
  message!: string;
  success!: boolean;
}
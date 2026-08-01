import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_V0_BASE_URL } from '../config/api-config';

// Structural replica mapping your C# CreateHolidayDto class exactly
export interface CreateHolidayDto {
  name: string;
  type: string;
  date: string; // Transmitted as an ISO date string format
}

export interface HolidayResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class HolidaysList {
  data!: Array<{
    id: string;
    name: string;
    type: string;
    date: Date;
  }>;
  message!: string;
  success!: boolean;
}

export interface UpdateHolidayDto {
  name: string;
  type: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private baseUrl = `${API_V0_BASE_URL}/Holiday`;

  constructor(private http: HttpClient) { }

  CreateHoliday(data: CreateHolidayDto): Observable<HolidayResponse> {
    console.log("Submitting Holiday Payload:", data);
    return this.http.post<HolidayResponse>(this.baseUrl, data);
  }

  GetHolidays(): Observable<HolidaysList> {
    return this.http.get<HolidaysList>(this.baseUrl);
  }

  UpdateHolidayById(holidayId: string, data: UpdateHolidayDto): Observable<HolidayResponse> {
    return this.http.put<HolidayResponse>(`${this.baseUrl}/${holidayId}`, data)
  }
  
  DeleteHolidayById(holidayId: string): Observable<HolidayResponse> {
    return this.http.delete<HolidayResponse>(`${this.baseUrl}/${holidayId}`)
  }

}
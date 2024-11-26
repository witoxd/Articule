import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleI } from '../Models/Articule';


@Injectable({
  providedIn: 'root'
})
export class Articuleservice {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/Articule2`
  base_path_service = `${this.api_uri_node}/Articule2`
  constructor(
    private http: HttpClient
  ) { }

  getAllActivity(): Observable<{ Articles: ArticleI[] }> {
    return this.http
      .get<{ Articles: ArticleI[] }>(this.base_path)
  }


  getOneActivity(id: number): Observable<{ Articles: ArticleI[] }> {
    return this.http
      .get<{ Articles: ArticleI[] }>(`${this.base_path_service}/${id}`)
  }

  createActivity(data: any): Observable<ArticleI> {
    return this.http.post<ArticleI>(this.base_path_service, data)
  }

  updateActivity(id: number, data: any): Observable<ArticleI> {
    return this.http.put<ArticleI>(`${this.base_path_service}/${id}`, data);
  }

  deleteActivity(id: number): Observable<ArticleI> {
    return this.http.delete<ArticleI>(`${this.base_path_service}/${id}`);
  }

}



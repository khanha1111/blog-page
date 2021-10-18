import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = 'https://5f55a98f39221c00167fb11a.mockapi.io/';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    })
  };

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public get(path: string, params: HttpParams = new HttpParams()
  ): Observable<any> {
    this.options.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    });
    return this.httpClient
      .get(BASE_URL + path, { ...this.options, params })
      .pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}): Observable<any> {
    this.options.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    });
    return this.httpClient
      .put(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}): Observable<any> {
    this.options.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    });
    return this.httpClient
      .post(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }


  public delete(path: string): Observable<any> {
    this.options.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    });
    return this.httpClient.delete(BASE_URL + path, this.options)
      .pipe(catchError(this.formatErrors));
  }

  public formatErrors(error: any): Observable<any> {
    console.log(error);
    return throwError(error.error);
  }

  /**
   * Get base url of web api.
   */
  public getBaseUrl() {
    return BASE_URL;
  }
}

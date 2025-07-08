import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface SalesforceAuthResponse {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly AUTH_KEY = 'sf_auth_data';
  private authData$ = new BehaviorSubject<SalesforceAuthResponse | null>(null);

  constructor(private http: HttpClient) {
    // Load auth data from session storage on service initialization
    this.loadAuthDataFromSession();
  }

  private loadAuthDataFromSession(): void {
    const storedData = sessionStorage.getItem(this.AUTH_KEY);
    if (storedData) {
      try {
        const authData = JSON.parse(storedData);
        this.authData$.next(authData);
      } catch (e) {
        console.error('Error parsing stored auth data:', e);
        sessionStorage.removeItem(this.AUTH_KEY);
      }
    }
  }

  /**
   * Authenticate with Salesforce using environment configuration.
   * Uses a backend proxy to avoid CORS issues with direct Salesforce API calls.
   */
  async authenticateWithConfig(): Promise<Observable<SalesforceAuthResponse>> {

    const authData = await this.getCurrentAuthData();
    
    if (!authData || !authData.id) {
      return this.http.get<SalesforceAuthResponse>('http://localhost:3000/api/salesforce/auth')
      .pipe(
        tap(response => this.storeAuthData(response)),
        catchError(error => {
          console.error('Authentication error:', error);
          return throwError(() => new Error('Authentication failed'));
        })
      );
    }

    // If already authenticated, return an observable of the current auth data
    return of(authData as SalesforceAuthResponse);
  }

  async getCurrentAuthData(): Promise<SalesforceAuthResponse | null> {
    this.loadAuthDataFromSession();
    var authData = this.authData$.getValue();
    
    if (!authData || !authData.instance_url) {
      await this.authenticateWithConfig();
      authData = this.authData$.getValue();
    }

    return authData;
  }

  private storeAuthData(authData: SalesforceAuthResponse): void {
    // Store in service
    this.authData$.next(authData);
    
    // Store in session storage
    sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(authData));
  }

  logout(): void {
    // Clear from service
    this.authData$.next(null);
    
    // Clear from session storage
    sessionStorage.removeItem(this.AUTH_KEY);
  }

} 
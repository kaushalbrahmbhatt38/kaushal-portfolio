import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesforceService {

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Query Salesforce records using SOQL
   * @param soql SOQL query string
   */
  async query(soql: string): Promise<Observable<any>> {
    
    const endpoint = '/services/data/v64.0/query';
    return this.http.get<any>(endpoint, {
      params: { q: soql }
    });
  }

  /**
   * Create a record in Salesforce
   * @param objectName API name of the object (e.g., 'Account')
   * @param data Record data
   */
  async createRecord(objectName: string, data: any): Promise<Observable<any>> {
    const endpoint = '/services/data/v64.0/sobjects/${objectName}';
    return this.http.post<any>(endpoint, data);
  }

  /**
   * Update a record in Salesforce
   * @param objectName API name of the object (e.g., 'Account')
   * @param recordId Record ID
   * @param data Record data
   */
  async updateRecord(objectName: string, recordId: string, data: any): Promise<Observable<any>> {
    const endpoint = '/services/data/v64.0/sobjects/${objectName}/${recordId}';
    return this.http.patch<any>(endpoint, data);
  }

  /**
   * Delete a record in Salesforce
   * @param objectName API name of the object (e.g., 'Account')
   * @param recordId Record ID
   */
  async deleteRecord(objectName: string, recordId: string): Promise<Observable<any>> {
    const endpoint = '/services/data/v64.0/sobjects/${objectName}/${recordId}';
    return this.http.delete<any>(endpoint);
  }
} 
import { Injectable } from '@angular/core';
import { Set } from '../shared/set';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class SetService{
    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }
    
      getSets(): Observable<Set[]> {
        return this.http.get<Set[]>(baseURL + 'sets')
          .pipe(catchError(this.processHTTPMsgService.handleError));
      }
    
      getSet(id: string): Observable<Set> {
        return this.http.get<Set>(baseURL + 'sets/' + id)
          .pipe(catchError(this.processHTTPMsgService.handleError));
      }
    
      getFeaturedSet(): Observable<Set> {
        return this.http.get<Set[]>(baseURL + 'sets?featured=true').pipe(map(sets => sets[0]))
          .pipe(catchError(this.processHTTPMsgService.handleError));
      }
    
      getSetIds(): Observable<number[] | any> {
        return this.getSets().pipe(map(Sets => Sets.map(set => set._id)))
          .pipe(catchError(error => error));
      }

      postNewPage(setId: string, page: any) {
        return this.http.post(baseURL + 'sets/' + setId +'/pages/', page)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      }
    
      postNote(setId: string, pageId: string, note: any) {
        return this.http.post(baseURL + 'sets/' + setId +'/pages/' + pageId + '/notes/', note)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      }
}
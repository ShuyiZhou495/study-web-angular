import { Injectable } from '@angular/core';
import { Set } from '../shared/set';
import { Page } from '../shared/page';

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
    
      getSetIds(): Observable<string[] | any> {
        return this.getSets().pipe(map(Sets => Sets.map(set => set._id)))
          .pipe(catchError(error => error));
      }

      getPageIds(id: string): Observable<string[] | any> {
        return this.http.get<Page[]>(baseURL + 'sets/' + id+'/pages/').pipe(map(Pages => Pages.map(page => page._id)))
          .pipe(catchError(error => error));
      }

      postNewSet(set: any) {
        return this.http.post(baseURL + 'sets/', set)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      }

      postNewPage(setId: string, page: any) {
        return this.http.post(baseURL + 'sets/' + setId +'/pages/', page)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      }
    
      postNote(setId: string, pageId: string, note: any) {
        return this.http.post(baseURL + 'sets/' + setId +'/pages/' + pageId + '/notes/', note)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      }

      deleteSet(setId: string){
        return this.http.delete(baseURL + 'sets/' + setId)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      }


      deletePage(setId: string, pageId: string){
        return this.http.delete(baseURL + 'sets/' + setId +'/pages/' + pageId)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      }

      deleteNote(setId: string, pageId: string, noteId: string){
        return this.http.delete(baseURL + 'sets/' + setId +'/pages/' + pageId + '/notes/' + noteId)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      }
}
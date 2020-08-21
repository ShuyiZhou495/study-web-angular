import { Component, OnInit, Inject } from '@angular/core';
import { SetService } from '../services/set.service';
import { Page } from '../shared/page';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PageDialog } from '../add-page/add-page.component';
import { MatDialog } from '@angular/material/dialog'
import { baseURL } from '../shared/baseurl';


@Component({
    selector: 'app-nopage',
    templateUrl: './pagehome.component.html',
    styleUrls: ['../app.component.css', '../bootstrap.min.css'],
    // tslint:disable-next-line:use-host-property-decorator
    // host: {
    //   '[@flyInOut]': 'true',
    //   'style': 'display: block;'
    // }
  })
  export class PageHomeComponent implements OnInit {
  
    setId: string;
    setName: string;
    totalPage: number;
    newPage: Page;
    pages: Page[];
  
    constructor(private setservice: SetService,
      @Inject('baseURL') private baseURL,
      private route: ActivatedRoute,
      public dialog: MatDialog) { }
  
    ngOnInit() {
        this.route.params.pipe(switchMap((params: Params) => {
             this.setId = params['setId'];
             return this.setservice.getSet(params['setId']);}))
        .subscribe(set=>{
            this.setName = set.setname;
            this.totalPage = set.pages.length;
            this.pages = set.pages;
        });
    }
      openPostPageDialog(): void {
        const dialogPageRef = this.dialog.open(PageDialog, {
          width: '500px',
          data: {
            set: this.setName,
            descripPlaceHolder: 'page ' + this.totalPage.toString()
          }
        });
    
        dialogPageRef.afterClosed().subscribe(result => {
          this.newPage = result;
          
          if(result){
          this.setservice.postNewPage(this.setId, this.newPage).subscribe(()=>{
            console.log('posted');
            window.location.assign("http://localhost:4200/onepage/"+this.setId+"/"+this.totalPage);
          })
        }
        });
      }

      deleteThisPage(setId: string, pageId: string){
        this.setservice.deletePage(setId, pageId).subscribe(()=>{
          window.location.reload();
        })
    }

  }
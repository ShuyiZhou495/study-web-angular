import { Component, OnInit, Inject } from '@angular/core';
import { SetService } from '../services/set.service';
import { Note } from '../shared/note';
import { Page } from '../shared/page';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NoteDialog } from '../add-note/add-note.component';
import { PageDialog } from '../add-page/add-page.component';
import { MatDialog } from '@angular/material/dialog'
import { baseURL } from '../shared/baseurl';


@Component({
    selector: 'app-onepage',
    templateUrl: './onepage.component.html',
    styleUrls: ['../app.component.css', '../bootstrap.min.css'],
    // tslint:disable-next-line:use-host-property-decorator
    // host: {
    //   '[@flyInOut]': 'true',
    //   'style': 'display: block;'
    // }
  })
  export class OnePageComponent implements OnInit {
  
    page: Page;
    setId: string;
    setName: string;
    pageNo: number;
    pageId: string;
    description: string;
    notes: Note[];
    totalPage: number;
    newNote: Note;
    newPage: Page;
  
    constructor(private setservice: SetService,
      @Inject('baseURL') private baseURL,
      private route: ActivatedRoute,
      public dialog: MatDialog) { }
  
    ngOnInit() {
        this.route.params.pipe(switchMap((params: Params) => {
             this.setId = params['setId'];
             this.pageNo = params['pageNo'];
             return this.setservice.getSet(params['setId']); }))
        .subscribe(set=>{
            this.page = set.pages[this.pageNo];
            this.pageId = this.page._id;
            this.totalPage = set.pages.length;
            this.description = this.page.description;
            this.notes = this.page.notes;
            this.setName = set.setname;
        });
        // console.log(this.route.params);
        // this.setservice.getPage()
        // .subscribe(set=> this.sets = set,
        //   errmess => this.setErrMess = <any>errmess);
    }

    deleteThisNote(setId: string, pageId: string, noteId: string){
        this.setservice.deleteNote(setId, pageId, noteId).subscribe(
            ()=>{location.reload();}
        );
    }

    openPostNoteDialog(): void {
        const dialogRef = this.dialog.open(NoteDialog, {
          width: '500px',
          data: {
            set: this.setName, 
            page: this.description,
          }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.newNote = result;
          if(result){
          this.setservice.postNote(this.setId, this.pageId, this.newNote).subscribe(()=>{
            console.log('posted');
            window.location.reload();
          })
        }
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
          var togo, link;
          if(this.totalPage>1) {
            link="http://localhost:4200/onepage/"+this.setId;
              if(this.pageNo==0) togo=0;
              else togo = +this.pageNo - +1;
              link = link + "/" + togo;
          }
          else link="http://localhost:4200/oneset/"+this.setId;
          this.setservice.deletePage(setId, pageId).subscribe(()=>{
            window.location.assign(link);
          })
      }

  }
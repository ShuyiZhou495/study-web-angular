import { Component, OnInit, Inject } from '@angular/core';
import { Set } from '../shared/set';
import { SetService } from '../services/set.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import { Note } from '../shared/note';
import { Page } from '../shared/page';
import {NoteDialog} from '../add-note/add-note.component';
import {PageDialog} from '../add-page/add-page.component';
import { SetDialog } from '../add-set/add-set.component';


@Component({
    selector: 'app-mynote',
    templateUrl: './mynotes.component.html',
    styleUrls: ['../app.component.css', '../bootstrap.min.css'],
    // tslint:disable-next-line:use-host-property-decorator
    // host: {
    //   '[@flyInOut]': 'true',
    //   'style': 'display: block;'
    // }
  })
  export class MyNoteComponent implements OnInit {
  
    sets: Set[];
    setErrMess: String;
    selectedSet: Set;
    selectedPage: Page;
    pageDescription: String;
    noteForm: FormGroup;
    newNote: Note;
    newPage: Page;
    newSet: Set;
  
    constructor(private setservice: SetService,
      @Inject('baseURL') private baseURL, 
      public dialog: MatDialog) { }
  
    ngOnInit() {
      this.setservice.getSets()
        .subscribe(set=> this.sets = set,
          errmess => this.setErrMess = <any>errmess);
    }

    onSelect(set: Set, page: Page) {
      this.selectedSet = set;
      this.selectedPage = page;
    }

    onSelectSet(set: Set) {
      this.selectedSet = set;
    }

    openPostNoteDialog(): void {
      const dialogRef = this.dialog.open(NoteDialog, {
        width: '500px',
        data: {
          set: this.selectedSet.setname, 
          page: this.selectedPage.description,
          practice: true
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.newNote = result;
        if(result){
        this.setservice.postNote(this.selectedSet._id, this.selectedPage._id, this.newNote).subscribe(()=>{
          console.log('posted');
        })
      }
      });
    }
    openPostPageDialog(): void {
      const dialogPageRef = this.dialog.open(PageDialog, {
        width: '500px',
        data: {
          set: this.selectedSet.setname,
        }
      });
  
      dialogPageRef.afterClosed().subscribe(result => {
        this.newPage = result;
        
        if(result){
        this.setservice.postNewPage(this.selectedSet._id, this.newPage).subscribe(()=>{
          
          console.log('posted');
          window.location.reload();
        })
      }
      });
    }

    openPostSetDialog(): void {
      const dialogSetRef = this.dialog.open(SetDialog, {
        width: '500px'
      });
  
      dialogSetRef.afterClosed().subscribe(result => {
        this.newSet = result;
        console.log(result);
        if(result){
        this.setservice.postNewSet(this.newSet).subscribe(()=>{
          console.log('posted');
          window.location.reload();
        })
      }
      });
    }


    deleteThisPage(setId: string, pageId: string){
      this.setservice.deletePage(setId, pageId).subscribe(()=>{location.reload();});
    }
  }



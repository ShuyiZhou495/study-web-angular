import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogPage{
    description: string;
    descripPlaceHolder: string;
    setid: string;
  }

  @Component({
    selector: 'app-addpage-dialog',
    templateUrl: 'add-page.component.html',
  })
  export class PageDialog {
    description: string;
    set: string;
    constructor(
      public dialogPageRef: MatDialogRef<PageDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogPage) {}
  
    onNoClick(): void {
      this.dialogPageRef.close();
    }
  
  }
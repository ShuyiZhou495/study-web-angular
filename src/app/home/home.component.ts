import { Component, OnInit, Inject } from '@angular/core';
import { Set } from '../shared/set';
import { SetService } from '../services/set.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['../app.component.css', '../bootstrap.min.css'],
    // tslint:disable-next-line:use-host-property-decorator
    // host: {
    //   '[@flyInOut]': 'true',
    //   'style': 'display: block;'
    // }
  })
  export class HomeComponent implements OnInit {
  
    sets: Set[];
    setErrMess: String;
  
    constructor(private setservice: SetService,
      @Inject('baseURL') private baseURL) { }
  
    ngOnInit() {
      this.setservice.getSets()
        .subscribe(set=> this.sets = set,
          errmess => this.setErrMess = <any>errmess);
    }
  }
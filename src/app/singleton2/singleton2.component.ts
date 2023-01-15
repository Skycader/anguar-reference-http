import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../services/singleton.service';

@Component({
  selector: 'app-singleton2',
  templateUrl: './singleton2.component.html',
  styleUrls: ['./singleton2.component.scss']
})
export class Singleton2Component implements OnInit {

  ref = this.singleton
  
  constructor(protected singleton: SingletonService) { }

  ngOnInit(): void {
  }

}

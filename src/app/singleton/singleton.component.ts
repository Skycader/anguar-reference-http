import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../services/singleton.service';

@Component({
  selector: 'app-singleton',
  templateUrl: './singleton.component.html',
  styleUrls: ['./singleton.component.scss']
})
export class SingletonComponent implements OnInit {

  singletonReference = this.singleton
  constructor(protected singleton: SingletonService) { }

   
  ngOnInit(): void {
  }

}

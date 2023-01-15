import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
  property1 = 0.23
  constructor() { 
    // setInterval(() => {
    //   this.property1 = Math.random()
    // },500)
  }
}

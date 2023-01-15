import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  filter,
  interval,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
})
export class StreamComponent implements OnInit {
  sub: Subscription;
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  number: string = '0';
  interval: NodeJS.Timer;
  stream$: Subject<string> = new Subject<string>();
  constructor() {}

  ngOnInit(): void {
    this.sub = this.stream$.subscribe((res) => console.log(res));
    // const myStream$ = interval(1000)
    //  
    // this.sub = myStream$
    //   .pipe(
    //     // filter((value) => value % 2 === 0),
    //     map((value) => 'Mapped value: ' + value)
    //     // switchMap(() => interval(500)),
    //     // map((value) => String(value))
    //   )
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.emitter.emit(res);
    //       this.number = res;
    //     },
    //     error: (error) => console.log('ERROR: ', error),
    //     complete: () => console.log('complete'),
    //   });
  }

  next() {
    this.stream$.next(Math.random().toFixed(2));
  }

  ngOnDestroy(): void {
    this.emitter.emit('0');
    this.sub.unsubscribe();
    clearInterval(this.interval);
  }
}

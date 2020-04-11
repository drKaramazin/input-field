import { Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject, interval } from 'rxjs';
import { delay, mergeMap, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.sass']
})
export class InputFieldComponent implements OnInit, OnDestroy {

  readonly DELAY = 200;

  willBeDestroyed$ = new Subject();
  input$ = new Subject<string>();

  @Input() minLength: number;
  @Input() maxLength: number;

  @Output() currentValue = new BehaviorSubject<string>(null);

  constructor() { }

  ngOnInit() {
    this.input$
      .pipe(takeUntil(this.willBeDestroyed$))
      .subscribe((value) => {
        interval(this.DELAY)
          .pipe(take(1), takeUntil(this.input$), takeUntil(this.willBeDestroyed$))
          .subscribe(() => this.currentValue.next(value));
      });
  }

  inputValue(event: any) {
    this.input$.next(event.target.value);
  }

  ngOnDestroy(): void {
    this.willBeDestroyed$.next();
    this.willBeDestroyed$.complete();

    this.input$.complete();
  }

}

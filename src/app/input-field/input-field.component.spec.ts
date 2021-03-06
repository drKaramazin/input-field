import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { filter, take } from 'rxjs/operators';

import { InputFieldComponent } from './input-field.component';

const setInputValue = (fixture: ComponentFixture<any>, selector: string, value: string) => {
  const input = fixture.debugElement.query(By.css(selector));
  const el = input.nativeElement;

  el.value = value;
  el.dispatchEvent(new Event('input'));
};

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('simple input test', () => {
    setInputValue(fixture, 'input', 'someValue');
    return component.currentValue.pipe(filter(val => val !== null), take(1)).toPromise()
      .then(value => expect(value).toBe('someValue'));
  });

  it('input test with many changes of value', () => {
    setInputValue(fixture, 'input', 'someValue 1');
    setInputValue(fixture, 'input', 'someValue 2');
    setInputValue(fixture, 'input', 'someValue 3');

    return component.currentValue.pipe(filter(val => val !== null), take(1)).toPromise()
      .then(value => expect(value).toBe('someValue 3'));
  });

  it('minLength error test', () => {
    fixture.componentInstance.minLength = 3;
    let input = fixture.debugElement.query(By.css('.has-error'));
    fixture.detectChanges();
    expect(input).toBe(null);
    setInputValue(fixture, 'input', 'ay');
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('.has-error'));
    expect(input).not.toBe(null);
    setInputValue(fixture, 'input', 'ay-ay-ay');
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('.has-error'));
    expect(input).toBe(null);
  });

  it('maxLength error test', () => {
    fixture.componentInstance.maxLength = 5;
    let input = fixture.debugElement.query(By.css('.has-error'));
    fixture.detectChanges();
    expect(input).toBe(null);
    setInputValue(fixture, 'input', 'ay');
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('.has-error'));
    expect(input).toBe(null);
    setInputValue(fixture, 'input', 'ay-ay-ay');
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('.has-error'));
    expect(input).not.toBe(null);
  });

  it('minLength and maxLength error test', () => {
    fixture.componentInstance.minLength = 3;
    fixture.componentInstance.maxLength = 5;
    let input = fixture.debugElement.query(By.css('.has-error'));
    fixture.detectChanges();
    expect(input).toBe(null);
    setInputValue(fixture, 'input', 'ay');
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('.has-error'));
    expect(input).not.toBe(null);
    setInputValue(fixture, 'input', 'ay-ay');
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('.has-error'));
    expect(input).toBe(null);
    setInputValue(fixture, 'input', 'ay-ay-ay');
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('.has-error'));
    expect(input).not.toBe(null);
  });

});

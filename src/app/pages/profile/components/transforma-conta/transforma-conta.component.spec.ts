import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformaContaComponent } from './transforma-conta.component';

describe('TransformaContaComponent', () => {
  let component: TransformaContaComponent;
  let fixture: ComponentFixture<TransformaContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformaContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformaContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

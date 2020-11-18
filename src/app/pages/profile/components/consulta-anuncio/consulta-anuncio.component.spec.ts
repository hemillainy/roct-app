import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAnuncioComponent } from './consulta-anuncio.component';

describe('ConsultaAnuncioComponent', () => {
  let component: ConsultaAnuncioComponent;
  let fixture: ComponentFixture<ConsultaAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

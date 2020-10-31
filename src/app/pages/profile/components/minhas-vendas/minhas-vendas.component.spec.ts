import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasVendasComponent } from './minhas-vendas.component';

describe('MinhasVendasComponent', () => {
  let component: MinhasVendasComponent;
  let fixture: ComponentFixture<MinhasVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoUsuariosComponent } from './gerenciamento-usuarios.component';

describe('GerenciamentoUsuariosComponent', () => {
  let component: GerenciamentoUsuariosComponent;
  let fixture: ComponentFixture<GerenciamentoUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciamentoUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciamentoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

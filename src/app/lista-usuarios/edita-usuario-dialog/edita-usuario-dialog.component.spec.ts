import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaUsuarioDialog } from './edita-usuario-dialog.component';

describe('EditaUsuarioDialog', () => {
  let component: EditaUsuarioDialog;
  let fixture: ComponentFixture<EditaUsuarioDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaUsuarioDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaUsuarioDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

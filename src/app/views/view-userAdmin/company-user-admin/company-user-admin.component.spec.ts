import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUserAdminComponent } from './company-user-admin.component';

describe('CompanyUserAdminComponent', () => {
  let component: CompanyUserAdminComponent;
  let fixture: ComponentFixture<CompanyUserAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyUserAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

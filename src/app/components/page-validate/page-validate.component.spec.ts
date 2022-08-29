import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageValidateComponent } from './page-validate.component';

describe('PageValidateComponent', () => {
  let component: PageValidateComponent;
  let fixture: ComponentFixture<PageValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageValidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

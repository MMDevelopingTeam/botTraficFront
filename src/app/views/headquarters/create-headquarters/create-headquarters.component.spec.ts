import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeadquartersComponent } from './create-headquarters.component';

describe('CreateHeadquartersComponent', () => {
  let component: CreateHeadquartersComponent;
  let fixture: ComponentFixture<CreateHeadquartersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHeadquartersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeadquartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

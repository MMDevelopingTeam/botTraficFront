import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsHeadQComponent } from './models-head-q.component';

describe('ModelsHeadQComponent', () => {
  let component: ModelsHeadQComponent;
  let fixture: ComponentFixture<ModelsHeadQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelsHeadQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsHeadQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

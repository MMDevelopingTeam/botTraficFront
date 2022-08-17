import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowedDevicesComponent } from './allowed-devices.component';

describe('AllowedDevicesComponent', () => {
  let component: AllowedDevicesComponent;
  let fixture: ComponentFixture<AllowedDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowedDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowedDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

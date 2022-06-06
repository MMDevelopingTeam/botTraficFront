import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotContainersComponent } from './bot-containers.component';

describe('BotContainersComponent', () => {
  let component: BotContainersComponent;
  let fixture: ComponentFixture<BotContainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotContainersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

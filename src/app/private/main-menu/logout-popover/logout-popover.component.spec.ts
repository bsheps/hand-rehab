import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPopoverComponent } from './logout-popover.component';

describe('LogoutPopoverComponent', () => {
  let component: LogoutPopoverComponent;
  let fixture: ComponentFixture<LogoutPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

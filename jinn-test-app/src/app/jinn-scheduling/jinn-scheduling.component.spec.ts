import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JinnSchedulingComponent } from './jinn-scheduling.component';

describe('JinnSchedulingComponent', () => {
  let component: JinnSchedulingComponent;
  let fixture: ComponentFixture<JinnSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JinnSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JinnSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

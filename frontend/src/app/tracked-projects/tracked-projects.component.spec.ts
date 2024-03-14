import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackedProjectsComponent } from './tracked-projects.component';

describe('TrackedProjectsComponent', () => {
  let component: TrackedProjectsComponent;
  let fixture: ComponentFixture<TrackedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackedProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

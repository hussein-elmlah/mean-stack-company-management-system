import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSkillsComponent } from './section-skills.component';

describe('SectionSkillsComponent', () => {
  let component: SectionSkillsComponent;
  let fixture: ComponentFixture<SectionSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

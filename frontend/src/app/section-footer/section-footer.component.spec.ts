import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFooterComponent } from './section-footer.component';

describe('SectionFooterComponent', () => {
  let component: SectionFooterComponent;
  let fixture: ComponentFixture<SectionFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

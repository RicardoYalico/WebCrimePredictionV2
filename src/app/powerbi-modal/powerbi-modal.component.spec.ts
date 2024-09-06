import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerbiModalComponent } from './powerbi-modal.component';

describe('PowerbiModalComponent', () => {
  let component: PowerbiModalComponent;
  let fixture: ComponentFixture<PowerbiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerbiModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PowerbiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

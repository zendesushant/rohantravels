import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricecalculatorComponent } from './pricecalculator.component';

describe('PricecalculatorComponent', () => {
  let component: PricecalculatorComponent;
  let fixture: ComponentFixture<PricecalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricecalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProvinceComponent } from './province.component';

describe('ProvinceComponent', () => {
  let component: ProvinceComponent;
  let fixture: ComponentFixture<ProvinceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

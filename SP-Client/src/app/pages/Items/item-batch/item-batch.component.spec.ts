import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBatchComponent } from './item-batch.component';

describe('ItemBatchComponent', () => {
  let component: ItemBatchComponent;
  let fixture: ComponentFixture<ItemBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

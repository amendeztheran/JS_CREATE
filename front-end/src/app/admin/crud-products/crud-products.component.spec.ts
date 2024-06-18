import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProductsComponent } from './crud-products.component';

describe('CrudProductsComponent', () => {
  let component: CrudProductsComponent;
  let fixture: ComponentFixture<CrudProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

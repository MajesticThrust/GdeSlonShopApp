import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferListPage } from './offer-list.page';

describe('OfferListPage', () => {
  let component: OfferListPage;
  let fixture: ComponentFixture<OfferListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DetailCommentPageRoutingModule } from './detail-comment-routing.module';

import { DetailCommentPage } from './detail-comment.page';

describe('ViewMessagePage', () => {
  let component: DetailCommentPage;
  let fixture: ComponentFixture<DetailCommentPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCommentPage],
      imports: [IonicModule.forRoot(), DetailCommentPageRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

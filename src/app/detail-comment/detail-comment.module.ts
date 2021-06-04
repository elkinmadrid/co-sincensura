import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailCommentPage } from './detail-comment.page';

import { IonicModule } from '@ionic/angular';

import { DetailCommentPageRoutingModule } from './detail-comment-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCommentPageRoutingModule
  ],
  declarations: [DetailCommentPage]
})
export class DetailCommentPageModule { }

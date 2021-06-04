import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comments, DataService } from '../services/data.service';

@Component({
  selector: 'app-detail-comment',
  templateUrl: './detail-comment.page.html',
  styleUrls: ['./detail-comment.page.scss'],
})
export class DetailCommentPage implements OnInit {
  comment: Comments;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const item = await this.data.getComment(id).get().toPromise();
    const data = item.data();

    const newData = { ...data as any, id: item.id };

    this.comment = (newData as Comments);
  }

}

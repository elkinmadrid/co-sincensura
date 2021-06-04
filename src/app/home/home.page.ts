import { Component, OnInit } from '@angular/core';
import { Comments, DataService } from '../services/data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listComments: Observable<Comments[]>;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getAllComments();
  }

  getAllComments() {
    this.listComments = this.data.getAll().snapshotChanges().pipe(
      map(item => {
        item.sort((a, b) => (new Date(b.payload.doc.data().createDate).getTime() - (new Date(a.payload.doc.data().createDate).getTime())));
        return item.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Comments {
  createDate: string;
  title: string;
  description: string;
  id?: string;
  urlPhoto: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dbPath = '/comments';
  private commentsRef: AngularFirestoreCollection<Comments>;

  constructor(public firestore: AngularFirestore) {
    this.commentsRef = firestore.collection(this.dbPath);
  }

  getAll() {
    return this.commentsRef;
  }

  create(comment: Comments): any {
    const fileId = this.firestore.createId();
    return this.commentsRef.doc(fileId).set(comment);
  }

  getComment(id: string) {
    return this.commentsRef.doc(id);
  }
}

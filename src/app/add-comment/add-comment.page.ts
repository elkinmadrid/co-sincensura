import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Comments, DataService } from '../services/data.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.page.html',
  styleUrls: ['./add-comment.page.scss'],
})
export class AddCommentPage implements OnInit {

  form: FormGroup;
  datosFormulario = new FormData();
  nombreArchivo = '';
  urlPhotoFirebase = '';
  porcentaje = 0;
  loading: any;

  constructor(public loadingController: LoadingController,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    private data: DataService) {
    this.form = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      archivo: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.nombreArchivo = file.name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', file, file.name);
      }
    }
  }

  async subirArchivo() {
    this.presentLoading('Por favor, espere...');
    const archivo = this.datosFormulario.get('archivo');
    const referencia = this.afStorage.ref(`filesStorage/${new Date().getTime()}_${this.nombreArchivo}`);

    const upload = referencia.put(archivo);

    //Cambia el porcentaje
    await upload.percentageChanges().toPromise().then((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje === 100) {
        this.loading.dismiss();
      }

    });
    await referencia.getDownloadURL().toPromise().then(res => {
      this.urlPhotoFirebase = res;
    });

    const comments: Comments = {
      title: this.form.value.title,
      createDate: new Date().toString(),
      urlPhoto: this.urlPhotoFirebase,
      description: this.form.value.description
    };

    this.data.create(comments);
    this.form.reset();
    this.showAlert('Información', '¡Comentario publicado exitosamente!');
  }

  async presentLoading(msj: string) {
    this.loading = await this.loadingController.create({
      message: msj
    });
    await this.loading.present();
  }

  async showAlert(headerParam: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: headerParam,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}

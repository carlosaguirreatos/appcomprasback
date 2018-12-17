import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase';
import { Archivo } from '../uploads/file.modal';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class LoadfileService {

  private basePath: string = '/uploads'; // ruta en el servicio de almacenamiento de firebase
  uploadsRef: AngularFireList<Archivo>;
  uploads: Observable<any[]>;

  uploadfiletemp: any;


  constructor(public angularFireDatabase: AngularFireDatabase) { }

  pushUpload(upload: Archivo){
    console.log('---------------- loadfile.service.ts pushUpload()');
    console.log('upload es de tipo: ' + typeof upload); 
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${ this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
                  (snapshot) => {
                    upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes * 100);
                    uploadTask.snapshot.ref.getDownloadURL().then(
                          ref => {
                            upload.url = ref;
                            console.log('url: ' + upload.url);
                            console.log('File available at: ', upload.url);
                            upload.name = upload.file.name;
                            this.saveFileData(upload);
                          }
                      );
                  },
                  (error) => {
                    console.log(error);
                  },
                 // () => {
                   // upload.url = uploadTask.snapshot.downloadURL;
                  // upload.url = uploadTask.snapshot.ref.getDownloadURL.toString();
                   //upload.url = storageRef.child(`${ this.basePath}/${upload.file.name}`).getDownloadURL; 
                //   upload.url = uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    /*console.log('File available at', downloadURL); 
                    console.log('downloadURL es: ' + downloadURL);
                    console.log('downloadURL.toString() es: ' + downloadURL.toString());
                    return downloadURL;                   
                    }).toString();

                    
                    //upload.url = this.uploadfiletemp.; 
                    console.log('La url del archivo es: ' + upload.url );                 
                    upload.name = upload.file.name;
                    this.saveFileData(upload);
                  }*/
                );
    
  }

  private saveFileData(upload: Archivo){
    this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
  }

  getUploads(){
    console.log('---------------- loadfile.service.ts getUploads()');
    this.uploadsRef = this.angularFireDatabase.list(this.basePath);
    this.uploads = this.uploadsRef.valueChanges();
    return this.uploads;
  }

  deleteUpload(upload: Archivo){
    console.log('---------------- loadfile.service.ts deleteUpload()');
    console.log('detalles del archivo: ' + upload.name + '; key: ' + upload.$key);
    this.deleteFileData(upload.$key)
        .then(() => {
          this.deleteFileStorage(upload.name)
        })
        .catch(error => console.log(error));
  }

  private deleteFileData(key: string){ // le llega undefined y por eso borra todo lo que trinca
    console.log('---------------- loadfile.service.ts deleteFileData()');
    console.log('detalles de key: ' + key);
    return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);
  }
  private deleteFileStorage(name: string){
    console.log('---------------- loadfile.service.ts deleteFileStorage()');
    console.log('detalles de name: ' + name);
    const storageref = firebase.storage().ref();
    storageref.child(`${this.basePath}/${name}`).delete();
  }
}

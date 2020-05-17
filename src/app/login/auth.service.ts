//Módulo que permite dejar una clase disponible para creación
import { Injectable } from '@angular/core';
//Módulos con objetos HTTP y Headers para URLs y establecer cabezales de documentos
import { Http, Headers } from '@angular/http';
//Módulo que me proporciona soporte para pasar mensajes entre publishers y subscribers en la aplicación.
import { Observable } from 'rxjs/Observable';
//Módulo que me permite transformar tipos de valores
import 'rxjs/add/operator/map';

//Inyecto y exporto la clase para el servicio de autenticación
@Injectable()
export class AuthService {
    //Defino las propiedades para el nombre de usuario, el estado del login y la URL del servicio
    userName: string;
    loggedIn: boolean;
    url = 'http://localhost:8001/auth';
    //Defino el contrstructor con la propiedad privada http
    constructor(private http: Http) {
        //Asigno los valores por defecto a las propiedades de la clase definidas antes
        this.userName = '';
        this.loggedIn = false;
    }
    //Método para establecer el login, recibe como parámetro un objecto con los datos del formulario (user y pass)
    login(userInfo){
        //Defino una variable local para concatenar la sección login al final
        let url = `${this.url}/login`;
        //Paso el tipo de datos del parámetro a Json
        let iJon = JSON.stringify(userInfo);
        //retorno el resultado de la consulta a la API, enviando la URL y el objeto de datos en formato Json
        return this.http.post(url, iJon, {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        //paso la respuesta a formato texto
        .map(res => res.text())
        .map(res => {
            //Si la respuesta es un error, establecer la propiedad del login como falsa
            if(res=="error" || res=="nofound"){
                this.loggedIn = false;
            }else{
            //De lo contrario, configuro el token con el valor de la respuesta y cargo las propiedades de la clase (usuario y true para el login)
                localStorage.setItem('token', res);
                this.userName = userInfo.user;
                this.loggedIn = true;
            }
            //Retorno definitivamente el valor del login (true o false)
            return this.loggedIn;
        });
    }
    //Método para desloguearme
    logout(): void {
        //Configuro el token como vacío y vuelvo las propiedades a sus valores iniciales por defecto
        localStorage.setItem('token', '');
        this.userName = '';
        this.loggedIn = false;
    }
    //Método para testear el status del login
    isLoggedIn(){
        return this.loggedIn;
    }


}
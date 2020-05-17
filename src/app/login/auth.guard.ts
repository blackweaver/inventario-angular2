//Módulo que permite dejar una clase disponible para creación
import { Injectable } from '@angular/core';
//Módulos para redireccionamiento de una URL y módulo de la interface para decidir si la ruta puede ser activada
import { Router, CanActivate } from '@angular/router';
//Clase del servicio de autenticación
import { AuthService } from './auth.service';

//Inyecto y exporto la clase implementando la interface para activar la ruta
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        //Defino las propiedades de la clase para redireccionar y el servicio para conocer el status del login
        private router: Router,
        private auth: AuthService
    ) {}

    canActivate(){
        //Si el status es de logueado, retorno true, de lo contrario retorno false. Siempre redirecciono al componente login
        if(this.auth.isLoggedIn()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;

    }
}
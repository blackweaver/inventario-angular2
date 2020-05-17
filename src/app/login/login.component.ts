//Módulo para la creación de componentes y para saber cuando un componente ha sido iniciado
import { Component, OnInit } from '@angular/core';
//Módulos para la creación, redireccionamiento y recepción de parámetros de una URL
import { Router, ActivatedRoute, Params } from '@angular/router';
//Módulos para el manejo de formularios
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//Importo el servicio correspondiente al login
import { AuthService } from './auth.service';

@Component({
    //Referencia del componente de la sección login
    selector: 'login',
    //Referencia del template de la sección login
    templateUrl: './login.component.html'
})
//Exporto la clase del componente, la cual, implementa la interface OnInit para asegurar que el componente se inicia una vez se crea
export class LoginComponent implements OnInit {
    //Defino propiedad de texto para el título
    titulo: string;
    //Defino propiedad boleana para el status del login
    isLogged: boolean = false;
    //Defino propiedad para el error
    error: string = '';
    //Defino propiead para los datos del formulario
    form: FormGroup;

    //Una ver construida la clase
    constructor(
        //private route: ActivatedRoute,
        //Defino la variable router para hacer las redirecciones de URLs
        private router: Router,
        //Defino la propiedad del objeto del servicio
        private auth: AuthService,
        //Defino la propiedad del constructor del formulario
        private fb: FormBuilder

    ){}
    //Una vez creado el componente lo inicio
    ngOnInit(){
        //Asigno el título de la página a la propiedad "titulo"
        this.titulo = 'Login';
        //Deslogueo la aplicación, ejecutando el método de la clase AuthService
        this.auth.logout();
        //Construyo el formulario en base a sus campos
        this.crearControles();
    }

    //Método para construir el formulario con sus respectivas campos -usuario y contraseña-
    crearControles() {
        this.form = this.fb.group({
            user: ['',Validators.required],
            pass: ['',Validators.required]
        })
    }

    //Método para loguear a los usuarios, recibe como parámetro los datos del formulario -usuario y contraseña-
    Login(f){
        //let token: string;
        //Ejecuto el método de autenticación del usuario del servicio, pasando como parámetro los datos del formulario
        this.auth.login(f)
            //Recibo el status del login y asigno su valor a la variable isLogged
            .subscribe(
                rs => this.isLogged = rs,
                er => console.log(er),
                //Si es true, voy a mostrar el inventario, de lo contrario marco un error.
                () => {
                    if (this.isLogged){
                        this.goInventario();
                    }else{
                        this.error = 'error';
                    }
                }
            )
    }
    //Simplemente redirecciono a la sección inventario, si isLogged está en true, ya fue enviado y aceptado el token, con lo cual los datos del inventario serán listados
    goInventario(){
        let link = ['./inventario'];
        this.router.navigate(link);

    }
 }
//Módulo para la creación de componentes
import { Component } from '@angular/core';
//Módulo para el redireccionamiento de las URL
import { Router } from '@angular/router';
//Importo el servicio de autenticación
import { AuthService } from './login/auth.service';

//Defino el componente con sus partes
@Component({
  //Referencia del componente general de la aplicación
  selector: 'app-root',
  //Referencia del template donde se imprimirán los datos
  templateUrl: './app.component.html',
  //Referencia de los estilos generales de la aplicación
  styleUrls: ['./app.component.css']
})
//Exporto la clase del componente
export class AppComponent {
  //Constructor de la clase
  constructor(
    private router: Router, //Propiedad para referenciar el objeto de las rutas
    private auth: AuthService //Propiedad para referenciar el objeto del servicio
  ){}
  //Método que me redirecciona al login una vez esté autorizado
  Login(){
    let link = ['/login']; //Arreglo con URL
    this.router.navigate(link); //Redirección de URL
  }
  //Método que me desloguea y vuelve a cargar el formulario de login
  Logout(){
    this.auth.logout(); //Llamo al método logout del servicio de autenticación
    let link = ['/login']; //Arreglo con URL
    this.router.navigate(link); //Redirección de URL
  }
}

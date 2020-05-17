//Módulo para la creación de componentes y para saber cuando un componente ha sido iniciado
import { Component, OnInit } from '@angular/core';

//Defino el componente con sus partes
@Component({
  //Referencia del componente de la sección home
  selector: 'app-home',
  //Referencia del template donde se imprimirán los datos
  templateUrl: './home.component.html',
  //Referencia de los estilos de la sección clientes
  styleUrls: ['./home.component.css']
})
//Exporto la clase del componente
export class HomeComponent implements OnInit {
  //Constructor de la clase
  constructor() { }

  //Método que se ejecuta cuando el componente ha sido creado
  ngOnInit() {
  }

}

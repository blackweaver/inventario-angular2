//Módulo para la creación de componentes y para saber cuando un componente ha sido iniciado
import { Component, OnInit } from '@angular/core';

//Defino el componente con sus partes
@Component({
  //Referencia del componente de la sección contactos
  selector: 'contactos',
  //Referencia del template donde se imprimirán los datos
  templateUrl: './contactos.component.html',
  //Referencia de los estilos de la sección contactos
  styleUrls: ['./contactos.component.css']
})
//Exporto la clase del componente
export class ContactosComponent implements OnInit {
  //Constructor de la clase
  constructor() { }
  //Método que se ejecuta cuando el componente ha sido creado
  ngOnInit() {
  }

}

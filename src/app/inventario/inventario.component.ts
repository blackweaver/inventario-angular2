//Módulos para la creación de componentes y para saber cuando un componente ha sido iniciado
import { Component, OnInit } from '@angular/core';
//Componentes para la fabricación de animaciones
import { trigger, state, style, transition, animate } from '@angular/core';

@Component({
  //Referencia del componente de la sección inventario
  selector: 'app-inventario',
  //Referencia del template donde se imprimirán los datos
  templateUrl: './inventario.component.html',
  //Construcción del tipo de animación para los botones "Lista" y "Nuevo artículo"
  animations: [
    //Creo el trigger (gatillo) con objeto de estados y transición
  	trigger('animacion',[
  			state('inactive', style({
  				transform: 'scale(1)'
  			})),
  			state('active', style({
  				backgroundColor: '#cfd8dc',
  				transform: 'scale(1.2)'
        })),
        //Puentes, tiempo y ecuación de movimiento
  			transition('inactive => active', animate('100ms ease-in')),
  			transition('active => inactive', animate('100ms ease-out'))
  		])
  ],
  //Referencia de los estilos de la sección clientes
  styleUrls: ['./inventario.component.css']
})
//Exporto la clase del componente
export class InventarioComponent implements OnInit {
  //Declaro propiedades con los estados iniciales
  private estado1 = 'inactive';
  private estado2 = 'inactive';
  //Declaro el constructor vacío, ya que no requiero nada más del componente
  constructor() { }
  //Cuando el componente se inicia no sucede nada
  ngOnInit() {
  }

}

//Todos los módulos necesarios para la creación de la sección inventario

//Define el conjunto de objetos inyectables que están disponibles en el inyector de este módulo.
import { NgModule } from '@angular/core';
//Esto módulo incluye todas las directivas básicas de angular: NgIf, NgForOf, etc
import { CommonModule } from '@angular/common';
//Módulo para formularios y formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//El módulo que incluye los proveedores de http
import { HttpModule } from '@angular/http';

//Componente principal de la sección inventario
import { InventarioComponent } from './inventario.component';
//Componente de la subsección para el listado
import { InventarioListaComponent } from './inventario-lista.component';
//Componente de la subsección para el formulario de mostrar o crear ítem
import { InventarioDetalleComponent } from './inventario-detalle.component';
//Importa el servicio para cargar el inventario
import { InventarioService } from './inventario.service';
//Módulo para las rutas de la sección inventario, crear, editar y listado
import { InventarioRoutingModule } from './inventario-routing.module';

//Establezco las declaraciones de componentes, importación de módulos y proveedores de servicios
@NgModule({
	declarations: [
		InventarioComponent,
		InventarioListaComponent,
		InventarioDetalleComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		HttpModule,
		InventarioRoutingModule
	],
	exports: [
		InventarioComponent,
		InventarioListaComponent,
		InventarioDetalleComponent
	],
	providers: [InventarioService]
})
export class InventarioModule { }
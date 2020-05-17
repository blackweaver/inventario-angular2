//Define el conjunto de objetos inyectables que están disponibles en el inyector de este módulo.
import { NgModule } from '@angular/core';
//Módulos para la creación y redireccionamiento de las URL
import { RouterModule, Routes } from '@angular/router';
//Componente de la sección principal "Home" del sitio
import { HomeComponent } from './home/home.component';
//Componente de la sección "Clientes" del sitio
import { ClientesComponent } from './clientes/clientes.component';
//Componente de la sección "Contactos" del sitio
import { ContactosComponent } from './contactos/contactos.component';
//Componente de la sección "Login" del sitio
import{ LoginComponent } from './login/login.component';

//La subsección "inventario" se importa automáticamente tras el login, por lo tanto está comentada y no es necesario importarla
//import { InventarioModule } from './inventario/inventario.module';

//Especificación de rutas para cada sección, implementa el módulo "Routes"
const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'clientes', component: ClientesComponent },
	{ path: 'contactos', component: ContactosComponent },
	{ path: 'login', component: LoginComponent }
	//Esto es en caso de que la sección fuera pública y no requiriera login
	/*{ path: 'inventario', loadChildren: () => InventarioModule }*/
];

@NgModule({
	imports: [
		//Asigno las el objeto con las rutas al módulo "RouterModule"
		RouterModule.forRoot(appRoutes),
		//Esto es en caso de que la sección fuera pública y no requiriera login
		//InventarioModule
	],
	exports: [
		//Exporto el módulo con las rutas para que esté disponisble
		RouterModule
	]
})
//Exporto la clase general para las rutas de la APP
export class AppRoutingModule {}

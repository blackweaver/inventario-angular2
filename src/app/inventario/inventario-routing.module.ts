import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink, RouterLinkActive } from '@angular/router';

import { InventarioComponent } from './inventario.component';
import { InventarioListaComponent } from './inventario-lista.component';
import { InventarioDetalleComponent } from './inventario-detalle.component';

import { ProviderAst } from '@angular/compiler';
import { AuthGuard } from '../login/auth.guard';

const inventarioRoutes: Routes = [
	{ 
		path: 'inventario', 
		component: InventarioComponent, 
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: InventarioListaComponent },
			{ path: 'lista', component: InventarioListaComponent },
			{ path: 'detalle', component: InventarioDetalleComponent },
			{ path: 'detalle/:id', component: InventarioDetalleComponent }
		]
	 }
];

@NgModule({
	imports: [
		RouterModule.forChild(inventarioRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [AuthGuard]
})
export class InventarioRoutingModule {}

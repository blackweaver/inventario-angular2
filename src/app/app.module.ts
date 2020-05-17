//Configura una aplicación basada en navegador para realizar la transición desde una aplicación procesada por el servidor, si hay una presente en la página.
import { BrowserModule } from '@angular/platform-browser';
//Define el conjunto de objetos inyectables que están disponibles en el inyector de este módulo.
import { NgModule } from '@angular/core';
//Módulo para formularios y formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//El módulo que incluye los proveedores de http
import { HttpModule } from '@angular/http';

//Módulo del componente principal de la aplicación
import { AppComponent } from './app.component';
//Módulo para las rutas principales de la aplicación
import { AppRoutingModule } from './app-routing.module';
//Componente de la sección principal "Home" del sitio
import { HomeComponent } from './home/home.component';
//Componente de la sección "Clientes" del sitio
import { ClientesComponent } from './clientes/clientes.component';
//Componente de la sección "Contactos" del sitio
import { ContactosComponent } from './contactos/contactos.component';
//Componente de la sección "Login" del sitio
import { LoginComponent } from './login/login.component';
//Importa el servicio de autenticación
import { AuthService } from './login/auth.service';
//Módulo de la sección "Inventario" del sitio
import { InventarioModule } from './inventario/inventario.module';


//Establezco las declaraciones de componentes, importación de módulos, proveedores de servicios y zona de influencia de la librería bootstrap
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientesComponent,
    ContactosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InventarioModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
//Exporto el módulo como clase principal de la aplicación
export class AppModule { }

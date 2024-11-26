import { Routes } from '@angular/router';
import { MostrarActivityComponent } from './Components/Articule/mostrar-Activity/mostrar-Activity.component';
import { CrearArticuleComponent } from './Components/Articule/crear-cliente/crear-cliente.component';
import { EliminarClienteComponent } from './Components/Articule/eliminar-cliente/eliminar-cliente.component';


export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/Articules', 
        pathMatch: 'full' 
    },
    {
        path: "Articules",
        component: MostrarActivityComponent
    },
    {
        path: "Articles/new",
        component: CrearArticuleComponent
    },

];

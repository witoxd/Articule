import { Component, OnInit } from '@angular/core';
import { Articuleservice } from '../../../Services/Articule.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { ArticleI } from '../../../Models/Articule';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { PrimeIcons, MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-mostrar-Activity',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './mostrar-Activity.component.html',
  styleUrl: './mostrar-Activity.component.css',
  styles: [`
    .outofstock {
        font-weight: 700;
        color: #FF5252;
        text-decoration: line-through;
    }

    .lowstock {
        font-weight: 700;
        color: #FFA726;
    }

    .instock {
        font-weight: 700;
        color: #66BB6A;
    }

    :host ::ng-deep .row-accessories {
        background-color: rgba(0,0,0,.15) !important;
    }
`
]

})
export class MostrarActivityComponent implements OnInit {
  public Articles:ArticleI[] = []
  constructor(
    private messageService: MessageService,
    private Articuleservice: Articuleservice,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarArticules()
  }

  

  mostrarArticules() {
    this.Articuleservice.getAllActivity()
      .subscribe({
        next: (data) => {
          this.Articles = data.Articles
          console.log(this.Articles)
        }
      })
  }

  eliminar(id: number): void{
    this.router.navigateByUrl('/Articules');
    this.Articuleservice.deleteActivity(id).subscribe(
      () => {
        this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Activity Eliminado', life:5000});
        this.mostrarArticules();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/Articules');

      }
    );
  }

  actualizarArticules(Articles: ArticleI): void {
    if (Articles.UserId && Articles.name && Articles.quality && Articles.stock_max && Articles.stock_min) {
      console.log('Actualizando Activity:', Articles);
      this.Articuleservice.updateActivity(Articles.id, Articles).subscribe(
        () => {
          console.log('Activity actualizado correctamente');
        },
        err => {
          console.error('Error al actualizar Activity:', err);
        }
      );
    } else {
      console.error('Datos incompletos, no se puede actualizar:', Articles);
      this.mostrarArticules()
    }
  }
  
}

// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Articuleservice } from '../../../Services/Articule.service';
// import { Router } from '@angular/router';
// import { ArticleI } from '../../../Models/Articule';
// import { CardModule } from 'primeng/card';
// import { ButtonModule } from 'primeng/button';
// import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';

// @Component({
//   selector: 'app-crear-Articule',
//   standalone: true,
//   imports: [CommonModule,
//     ReactiveFormsModule, 
//     ToastModule, 
//     CardModule, 
//     ButtonModule],
//   providers: [MessageService],
//   templateUrl: './crear-cliente.component.html',
//   styleUrls: ['./crear-cliente.component.css'] 
// })
// export class CrearArticuleComponent implements OnInit {
//   public form: FormGroup;

//   Articuleservice = inject(Articuleservice);
 

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private MessageService: MessageService
//   ) {
//     // Inicializa el formulario aquí
//     this.form = this.formBuilder.group({
//       name: ['', [Validators.required]],
//       date_act: ['', [Validators.required]],
//       description: ['', [Validators.required]],
//       UserId: ['', [Validators.required]]
//     });
//   }

//   ngOnInit(): void {}

//   onSubmit(): void {
//     const formValue: ArticleI = this.form.value;
//     if (  formValue.UserId && formValue.name && formValue.quality && formValue.stock_max && formValue.stock_min) {
//       this.Articuleservice.createActivity(formValue).subscribe(
//         () => {
//           this.MessageService.add({severity:'success', summary: 'Notificación', detail: 'Activity Creado', life:5000});
//           console.log('Articule creado correctamente');
//           this.router.navigateByUrl('/Articules');
//         },
//         err => {
//           console.log(err);
//           console.log('No se ha creado correctamente');
//         }
//       );
//     } else {
//       console.log("Tener en cuenta que todos los campos son obligatorios");
//     }
//   }

//   cancel() {
//     this.router.navigateByUrl('/Articules');
//   }

//   get name() { return this.form.get('name'); }
//   get date_act() { return this.form.get('date_act'); }
//   get description() { return this.form.get('description'); }
//   get UserId() { return this.form.get('UserId'); }

// }

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Articuleservice } from '../../../Services/Articule.service';
import { Router } from '@angular/router';
import { ArticleI } from '../../../Models/Articule';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-articule',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearArticuleComponent implements OnInit {
  public form: FormGroup;

  Articuleservice = inject(Articuleservice);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private MessageService: MessageService
  ) {
    // Inicializa el formulario con los campos requeridos
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      UserId: ['', [Validators.required]],
      stock_min: [null, [Validators.required]],
      stock_max: [null, [Validators.required]],
      quality: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: ArticleI = this.form.value;
    if (this.form.valid) {
      this.Articuleservice.createActivity(formValue).subscribe(
        () => {
          this.MessageService.add({
            severity: 'success',
            summary: 'Notificación',
            detail: 'Artículo creado correctamente',
            life: 5000
          });
          console.log('Artículo creado correctamente');
          this.router.navigateByUrl('/Articules');
        },
        err => {
          console.error(err);
          this.MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el artículo',
            life: 5000
          });
        }
      );
    } else {
      console.error('Todos los campos son obligatorios');
      this.MessageService.add({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Complete todos los campos obligatorios',
        life: 5000
      });
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/Articules');
  }

  // Getters para los campos del formulario
  get name() { return this.form.get('name'); }
  get UserId() { return this.form.get('UserId'); }
  get stock_min() { return this.form.get('stock_min'); }
  get stock_max() { return this.form.get('stock_max'); }
  get quality() { return this.form.get('quality'); }
}

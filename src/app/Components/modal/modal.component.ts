import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Categoria, Gasto } from 'src/app/interfaces/activities.interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { BudgetService } from 'src/app/budget.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public categoria!: Categoria | undefined;
  public dangerBudget:boolean=false

  constructor(public dialog: MatDialog, private BudgetService: BudgetService, private MatDialogRef:MatDialogRef<ModalComponent>) {

  }

  public categories: Categoria[] = [
    { id: 0, name: '', selected: false, icon: '' },
    { id: 1, name: 'Ahorro', selected: false, icon: 'ahorro' },
    { id: 2, name: 'Comida', selected: false, icon: 'comida' },
    { id: 3, name: 'Casa', selected: false, icon: 'casa' },
    { id: 4, name: 'Gastos Varios', selected: false, icon: 'gastos' },
    { id: 5, name: 'Ocio', selected: false, icon: 'ocio' },
    { id: 6, name: 'Salud', selected: false, icon: 'salud' },
    { id: 7, name: 'Suscripciones', selected: false, icon: 'suscripciones' },


  ]



  public gastoForm = new FormGroup({

    nombreGasto: new FormControl(''),
    cantidad: new FormControl<string>(''),
    categoria: new FormControl<Categoria>(this.categories[0]), // solicita la inicializacion para saber de que tipo es y en este caso <> este campo es de tipo objeto
    fechaDelGasto: new FormControl(new Date()),

  })



  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


  onCustomerChanged(event: any) {
    this.categoria = this.categories.find(n => n.id == event.target.value);
  }



  onsubmit(): void {


    let gasto: Gasto = {
      id:0,
      nombreGasto: this.gastoForm.get('nombreGasto')!.value,
      cantidad: parseInt(this.gastoForm.get('cantidad')!.value ?? '0'),  // para que no se muestre por default el 0 en el formulario lo pasamos a entero con parseINT pero tenemos que hacer la condicion que si viene nulo lo convertimos a numero y lo convertomos a cero
      categoria: this.categoria,
      fechaDelGasto: this.gastoForm.get('fechaDelGasto')!.value,
    }


    if(this.BudgetService.calculateBudget(gasto.cantidad)>=0
    ){
      this.dangerBudget=false
      this.BudgetService.addBudget(gasto)
      this.MatDialogRef.close()

    }else{
      this.dangerBudget=true


    }


  }




}

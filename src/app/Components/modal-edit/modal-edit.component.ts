import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BudgetService } from 'src/app/budget.service';
import { Categoria, Gasto } from 'src/app/interfaces/activities.interfaces';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {

  public categoria!: Categoria | undefined;
  public dangerBudget: boolean = false
  private id!: number
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

  constructor(public dialog: MatDialog, private BudgetService: BudgetService, private MatDialogRef: MatDialogRef<ModalEditComponent>, @Inject(MAT_DIALOG_DATA) data: number) {
    this.id = data
  }




  public gastoForm = new FormGroup({

    nombreGasto: new FormControl(''),
    cantidad: new FormControl<string>(''),
    categoria: new FormControl<number>(0), // solicita la inicializacion para saber de que tipo es y en este caso <> este campo es de tipo objeto
    fechaDelGasto: new FormControl(new Date()),

  })



  ngOnInit(): void {
    let datos = this.BudgetService.getSpend(this.id)

    this.gastoForm.get('nombreGasto')!.setValue(datos?.nombreGasto ?? '')
    this.gastoForm.get('cantidad')!.setValue(datos?.cantidad.toString() ?? '')
    this.gastoForm.get('fechaDelGasto')!.setValue(datos?.fechaDelGasto ?? new Date())
    this.gastoForm.get('categoria')!.setValue(datos?.categoria?.id ?? 0)

  }


  onCustomerChanged(event: any) {
    this.categoria = this.categories.find(n => n.id == event.target.value);
  }



  onsubmit(): void {

    let categoria= this.gastoForm.get('categoria')!.value

    let gasto: Gasto = {
      id: this.id,
      nombreGasto: this.gastoForm.get('nombreGasto')!.value,
      cantidad: parseInt(this.gastoForm.get('cantidad')!.value ?? '0'),  // para que no se muestre por default el 0 en el formulario lo pasamos a entero con parseINT pero tenemos que hacer la condicion que si viene nulo lo convertimos a numero y lo convertomos a cero
      categoria: this.categories.find(n => n.id == categoria),
      fechaDelGasto: this.gastoForm.get('fechaDelGasto')!.value,
    }


    if (this.BudgetService.calculateBudget(gasto.cantidad) >= 0
    ) {
      this.dangerBudget = false
      this.BudgetService.editBudget(gasto)
      this.MatDialogRef.close()

    } else {
      this.dangerBudget = true


    }


  }




}

import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Calculo, Categoria, Gasto } from 'src/app/interfaces/activities.interfaces';
import { BudgetService } from 'src/app/budget.service';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';


  public budget: number = 0
  public detalleBudger: Gasto[] = [];
  public spendCalculos: Calculo = {
    budget: 0,
    available: 0,
    calculateSpend: 0,
    budgetPorcent: 0,
  };


  public categories: Categoria[] = [
    { id: 1, name: 'Ahorro', selected: false, icon: 'ahorro' },
    { id: 2, name: 'Comida', selected: false, icon: 'comida' },
    { id: 3, name: 'Casa', selected: false, icon: 'casa' },
    { id: 4, name: 'Gastos Varios', selected: false, icon: 'gastos' },
    { id: 5, name: 'Ocio', selected: false, icon: 'ocio' },
    { id: 6, name: 'Salud', selected: false, icon: 'salud' },
    { id: 7, name: 'Suscripciones', selected: false, icon: 'suscripciones' },


  ]

  constructor(public dialog: MatDialog, private BudgetService: BudgetService,  private router:Router) { }

  ngOnInit(): void {

    this.BudgetService.subscribeBudget().subscribe(
      resp => {
        this.detalleBudger = resp

      }
    )

    this.BudgetService.getObservableSpendCalculo().subscribe(
      resultado => {
        this.spendCalculos = resultado

      }
    )

    this.BudgetService.getSpendANDBudget()

  }

  public openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }


  public openDialogEdit(id:number) {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      data:id

    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }



  deleteActivity(id:number){
    this.BudgetService.deleteSpend(id)
  }



  onCustomerChanged(event: any) {
    //this.categories= this.categories.find(n => n.id == event.target.value);

   if(event.target.value==20){
    this.detalleBudger=this.BudgetService.getdetalleBudger()
   }else{
     this.detalleBudger= this.BudgetService.filterSpend(event.target.value)

   }
  }


  reseteBudger(){
    this.BudgetService.reseteBudger()
    this.router.navigateByUrl('/home');
  }


}

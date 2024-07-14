import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetService } from 'src/app/budget.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {



  public myForm: FormGroup = this.fb.group({   // datos que se reciben del formulario y validaciones


    budget: ['', [Validators.required],],

  })


  builderAvailable():boolean{

   if(parseInt(this.myForm.get('budget')!.value) >0){
   return false
   }
   return true
  }


  constructor(
    private budgetService: BudgetService, private fb: FormBuilder,  private router:Router
  ) { }


  public onSubmit() {

    this.budgetService.setBudget(parseInt(this.myForm.get('budget')!.value))                                           // funcion que recibe los datos del formulario
   // this.myForm.reset();
    this.router.navigateByUrl('/bills');
  }


}

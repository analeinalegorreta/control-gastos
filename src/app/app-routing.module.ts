import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BillsComponent } from './Components/bills/bills.component';
import { FormComponent } from './Components/form/form.component';

const routes: Routes = [
  {
    path:'home',
    component: FormComponent
  },
  {
    path:'bills',
    component: BillsComponent
  },
  {
    path:'**',
    redirectTo:'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

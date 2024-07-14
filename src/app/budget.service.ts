import { Injectable } from '@angular/core';
import { Calculo, Gasto } from './interfaces/activities.interfaces';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budget: number = 0
  private detalleBudger: Gasto[] = [];
  private dataSubject = new Subject<Gasto[]>();
  private dataSubjectCalculo = new Subject<Calculo>();
  private idGasto: number = 0

  constructor() { }

  addBudget(gasto: Gasto) {
    this.idGasto++
    gasto.id = this.idGasto
    this.detalleBudger.push(gasto);
    this.dataSubject.next(this.detalleBudger)
    this.getSpendANDBudget()
  }


  subscribeBudget(): Observable<Gasto[]> {   // Se crea esta funcion para poder enviar datos a otro componente
    return this.dataSubject.asObservable()
  }

  getObservableSpendCalculo(): Observable<Calculo> {   // Se crea esta funcion para poder enviar datos a otro componente
    return this.dataSubjectCalculo.asObservable()
  }

  setBudget(budget: number) {
    this.budget = budget
  }

  calculateBudget(spend: number) {
    let calculateSpend: number = this.budget
    for (let a = 0; a < this.detalleBudger.length; a++) {
      calculateSpend -= this.detalleBudger[a].cantidad
    }
    return calculateSpend - spend

  }

  getSpendANDBudget() {

    let calculateSpend: number = this.budget


    for (let a = 0; a < this.detalleBudger.length; a++) {
      calculateSpend -= this.detalleBudger[a].cantidad
    }

    let spendCalculos: Calculo = {
      budget: this.budget,
      available: this.budget - calculateSpend,
      calculateSpend: calculateSpend,
      budgetPorcent: (calculateSpend * 100) / this.budget
    }

    this.dataSubjectCalculo.next(spendCalculos)

  }


  getBudget() {
    return this.budget
  }


  getdetalleBudger() {
    return this.detalleBudger
  }



  deleteSpend(id: number): void {
    let indice = 0

    for (let a = 0; a < this.detalleBudger.length; a++) {
      if (this.detalleBudger[a].id == id) {
        indice = a
        break;

      }
    }

    this.detalleBudger.splice(indice, 1)
    this.dataSubject.next(this.detalleBudger)

    this.getSpendANDBudget()
  }



  getSpend(id: number): Gasto | null {
    for (let a = 0; a < this.detalleBudger.length; a++) {
      if (this.detalleBudger[a].id == id) {
        return this.detalleBudger[a]


      }
    }
    return null
  }


  editBudget(gasto: Gasto): void {
    let indice = 0

    for (let a = 0; a < this.detalleBudger.length; a++) {
      if (this.detalleBudger[a].id == gasto.id) {
        this.detalleBudger[a].nombreGasto = gasto.nombreGasto
        this.detalleBudger[a].cantidad = gasto.cantidad
        this.detalleBudger[a].categoria = gasto.categoria
        this.detalleBudger[a].fechaDelGasto = gasto.fechaDelGasto

        this.dataSubject.next(this.detalleBudger)
        this.getSpendANDBudget()


        break;

      }
    }

  }

  filterSpend(idCategory: number): Gasto[] {
    return this.detalleBudger.filter(n => n.categoria?.id == idCategory);
  }



  reseteBudger() {

    this.detalleBudger = [];
    this.getSpendANDBudget()
    this.budget = 0
    this.dataSubject.next(this.detalleBudger)


  }






}

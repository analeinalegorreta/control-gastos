

export interface Gasto{
  id:number;
  nombreGasto:string  | null;
  cantidad:number ;
  categoria:Categoria | null | undefined;
  fechaDelGasto: Date | null;
}




export interface Categoria{
  id:number;
  name:string;
  selected:boolean;
  icon:string;
}


export interface Calculo{

  budget :number;
  available :number;
  calculateSpend :number;
  budgetPorcent:number;
}

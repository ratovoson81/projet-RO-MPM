export class Graphe {
    constructor(
      public key: number,
      public text: string,
      public length: number,
      public earlyStart: number,
      public lateFinish: number,
      public critical: boolean,
      public margeRetard: number,
      public ant: string[],
      public suc: string[]
    ) {}
}

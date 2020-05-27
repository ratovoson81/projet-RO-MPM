export class Tache {
    constructor(
      public name: string,
      public duree: number,
      public ant?: string[],
      public suc?: string[]
    ) {}
  }
import { Subject } from 'rxjs/internal/Subject';

export class addTacheService {

  tacheSubject = new Subject<any[]>();
  
    private tache = [
        {
          id: 1,
          name: 'a',
          duree: 5,
          ant: 'd',
        },
        {
          id: 2,
          name: 'b',
          duree: 5,
          ant: 'e'
        },
        {
          id: 3,
          name: 'c',
          duree: 6,
          ant: 'b'
        }
      ];

      emitTacheSubject() {
        this.tacheSubject.next(this.tache.slice());
      }
    

      /*switchOnAll() {
        for(let appareil of this.tache) {
          //appareil.status = 'allumé';
        }
        this.emitAppareilSubject();
    }*/
    
    /*switchOffAll() {
        for(let appareil of this.appareils) {
          appareil.status = 'éteint';
          this.emitAppareilSubject();
        }
    }*/
  /*  switchOnOne(i: number) {
      this.appareils[i].status = 'allumé';
      this.emitAppareilSubject();
  }*/
  
 /* switchOffOne(i: number) {
      this.appareils[i].status = 'éteint';
      this.emitAppareilSubject();
  }*/
  getTacheById(id: number) {
    const tache = this.tache.find(
      (s) => {
        return s.id === id;
      }
    );
    return tache;
  }

addTache(name: string, duree: number, ant:string ) {
  const tacheObject = {
    id: 0,
    name: '',
    duree: 0,
    ant: ''
  };
  tacheObject.name = name;
  tacheObject.duree = duree;
  tacheObject.ant = ant;
  tacheObject.id = this.tache[(this.tache.length - 1)].id + 1;
  this.tache.push(tacheObject);
  this.emitTacheSubject();
}
    
}
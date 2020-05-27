import { Subject } from 'rxjs/Subject';
import { Graphe } from './graphe.model';

export class GrapheService {

  private graphes: Graphe[] = [];

  grapheSubject = new Subject<Graphe[]>();

  emitGraphe() {
    this.grapheSubject.next(this.graphes.slice());
  }

  addGraphe(graphe: Graphe) {
    this.graphes.push(graphe);
    this.emitGraphe();
  }
  graphe(){
    console.log('click on graphe final');
  }
}
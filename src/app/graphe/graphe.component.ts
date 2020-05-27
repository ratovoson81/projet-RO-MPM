import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Graphe } from '../models/graphe.model';
import { TacheService } from '../models/TacheService';
import { Link } from '../models/link.model';

@Component({
  selector: 'app-graphe',
  templateUrl: './graphe.component.html',
  styleUrls: ['./graphe.component.scss']
})

export class GrapheComponent implements OnInit, OnDestroy{

  graphes: Graphe[];
  grapheSubscription: Subscription;
  links: Link[];
  linkSubscription: Subscription;

  constructor(private userService: TacheService) { }

  ngOnInit() {
    this.grapheSubscription = this.userService.grapheSubject.subscribe(
      (graphes: Graphe[]) => {
        this.graphes = graphes;
      }
    );
    this.userService.emitGraphe();

    this.linkSubscription = this.userService.linkSubject.subscribe(
      (links: Link[]) => {
        this.links = links;
      }
    );
    this.userService.emitLink();
  }

  ngOnDestroy() {
  this.grapheSubscription.unsubscribe();
  this.linkSubscription.unsubscribe();
  }
}

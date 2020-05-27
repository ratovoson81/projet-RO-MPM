import { Tache } from './Tache.model';
import { Subject } from 'rxjs/Subject';
import { Graphe } from './graphe.model';
import * as go from 'gojs';
import { Link } from './link.model';

export class TacheService {

  private taches: Tache[] = [
    new Tache('A', 35, ['-'],[]),
    new Tache('B', 25, ['G','J'],[]),
    new Tache('C', 40, ['H'],[]),
    new Tache('D', 15, ['F'],[]),
    new Tache('E', 20, ['F'],[]),
    new Tache('F', 10, ['K'],[]),
    new Tache('G', 15, ['K','O'],[]),
    new Tache('H', 15, ['A'],[]),
    new Tache('I', 50, ['M'],[]),
    new Tache('J', 20, ['H','L'],[]),
    new Tache('K', 20, ['H','I'],[]),
    new Tache('L', 10, ['A'],[]),
    new Tache('M', 30, ['-'],[]),
    new Tache('N', 15, ['M','I'],[]),
    new Tache('O', 10, ['A'],[]),
    new Tache('P', 30, ['Q'],[]),
    new Tache('Q', 10, ['N'],[])

    /*   new Tache('a', 7, ['-'],[]),
    new Tache('b', 7, ['a'],[]),
    new Tache('c', 15, ['b'],[]),
    new Tache('d', 30, ['c'],[]),
    new Tache('e', 45, ['d'],[]),
    new Tache('f', 15, ['e'],[]),
    new Tache('g', 45, ['d'],[]),
    new Tache('h', 60, ['d'],[]),
    new Tache('i', 20, ['h'],[]),
    new Tache('j', 30, ['i'],[]),
    new Tache('k', 30, ['f'],[]),
    new Tache('l', 15, ['k'],[]),
    new Tache('m', 30, ['g','j','l'],[]),
    new Tache('n', 15, ['m'],[]),
    new Tache('o', 30, ['n'],[]),
    new Tache('p', 15, ['m'],[]),
    new Tache('q', 15, ['o'],[]),
    new Tache('r', 15, ['q'],[]),
    new Tache('s', 30, ['q'],[]),
    new Tache('t', 7, ['p'],[]),
    new Tache('u', 4, ['r','t'],[]),
    new Tache('v', 2, ['s','t'],[]),
    new Tache('w', 7, ['r','s'],[])*/
];

private graphes: Graphe[] = [
    //new Graphe('deb',null,null,null,null)
];
private links: Link[] = [
  //new Graphe('deb',null,null,null,null)
];
private myDiagram;

  grapheSubject = new Subject<Graphe[]>();
  tacheSubject = new Subject<Tache[]>();
  linkSubject = new Subject<Link[]>();

  emitTache() {
    this.tacheSubject.next(this.taches.slice());
  }

  emitGraphe() {
    this.grapheSubject.next(this.graphes.slice());
  }
  emitLink() {
    this.linkSubject.next(this.links.slice());
  }

  addTache(tache: Tache) {
    this.taches.push(tache);
    this.emitTache();
  }
  deleteTache(i: number) {
    this.taches.splice(i,1);
    this.emitTache();
    //console.log(this.taches);
  }
  deleteTS(){
    for(let a:number=0;a<this.taches.length;a++){
      this.taches[a].suc.splice(0,this.taches[a].suc.length);
    }
    //console.log(this.taches);
  }
  updateTache(upTache: Tache,i: number) {
    //this.taches.push(tache);
    this.taches[i].name = upTache.name;
    this.taches[i].duree = upTache.duree;
    this.taches[i].ant = upTache.ant ? upTache.ant : [];
    this.taches[i].suc = [];
    this.emitTache();
  }
  desGraphe(){
    if(this.myDiagram)
    {this.myDiagram.div = null}
  }
  reiniAll(){
    this.taches = [];
    this.emitTache();
    this.desGraphe();
  }
  graphe(){
    this.links = [];
    this.graphes = [];
    let key:number = 1;
    const sucDeb = [];
    for(let b:number=0;b<this.taches.length;b++)
    {
      if(this.taches[b].ant.includes('-'))
      {sucDeb.push(this.taches[b].name)}
    } 
    const init = new Graphe(    
      key,
      'debut',
      0,
      0,
      0,
      true,
      0,
      [],
      sucDeb,
    );
    this.graphes.push(init);
    key++;

   for(let j:number=0;j<this.taches.length;j++)
    {
        const debG = new Graphe(
          key,
          this.taches[j].name,
          this.taches[j].duree,
          0,
          500000,
          false,
          0,
          this.taches[j].ant ? this.taches[j].ant : [],
          this.taches[j].suc ? this.taches[j].suc : [],
        );
        this.graphes.push(debG);
        key++;
    }
    const antFin = [];
    for(let f:number=0;f<this.taches.length;f++)
    {
      if(this.taches[f].suc.includes('fin'))
      {antFin.push(this.taches[f].name)}
    } 
      const fin = new Graphe(    
        key,
        'fin',
        0,
        0,
        0,
        true,
        0,
        antFin,
        null,
      );
      this.graphes.push(fin);

     for(let i:number=0;i<this.graphes.length;i++)
      {
        if(this.graphes[i].suc != null){
        for(let k:number=0;k<this.graphes[i].suc.length;k++)
            { 
                  
            for(let x:number=0;x<this.graphes.length;x++)
              {
                if(this.graphes[i].suc[k] == this.graphes[x].text){
                let to:number = this.graphes[x].key;   
                const newLink = new Link(
                  this.graphes[i].length,
                  this.graphes[i].key,
                  to,
 
                );
                this.links.push(newLink);         
              }
          
              }
            }
          }
      }

      // add earlyStart fonction trop long a revoir boucle en exes
    /*for(let i:number=0;i<this.graphes.length;i++)
      {
        if(this.graphes[i].ant.includes('-'))
        {this.graphes[i].earlyStart = 0}
      }*/
      let dateTot:number = 0;
      for(let ii:number=0;ii<this.links.length;ii++)
      {
        for(let i:number=0;i<this.links.length;i++)
        {
          dateTot = this.graphes[this.links[i].from -1].earlyStart + this.graphes[this.links[i].from -1].length;
          if(this.graphes[this.links[i].to - 1].earlyStart < dateTot){
            this.graphes[this.links[i].to - 1].earlyStart = dateTot;
          }
        }
      }  
      this.links.reverse(); 
      // late Finish
      //////////////////////// debut
      let dateTard:number = 0;
      let der:number = Math.max.apply(Math, this.links.map(function(o) { return o.to; }))
      this.graphes[der - 1].lateFinish = this.graphes[der - 1].earlyStart;
      for(let is:number=0;is<this.links.length;is++){
        der = Math.max.apply(Math, this.links.map(function(o) { return o.to; }))
        do
        {
          for(let iq:number=0;iq<this.links.length;iq++)
          {
              for(let i:number=0;i<this.links.length;i++)
              {
                if(der == this.links[i].to){
                  dateTard = this.graphes[this.links[i].to - 1].lateFinish - this.graphes[this.links[i].from - 1].length;
                  if(this.graphes[this.links[i].from - 1].lateFinish > dateTard){
                    this.graphes[this.links[i].from - 1].lateFinish = dateTard;
                  }
                }  
              }
              
            }der--; 
            
          }while(der != 0)
      }  
      ////////////// fin

      // chemin critique
      let max:number = Math.max.apply(Math, this.links.map(function(o) { return o.to; }))
      let a = [];
      let ant = [];

      do{
        for(let w:number=0;w<this.links.length;w++){
         
          if(this.links[w].to == max){
            a.push(this.graphes[this.links[w].from - 1].earlyStart);
            ant.push(this.links[w].from);
          }
        }

        for(let j:number=0;j<ant.length;j++)
        {
          if(this.graphes[ant[j] - 1].earlyStart + this.graphes[ant[j] - 1].length == this.graphes[max - 1].earlyStart){
            this.graphes[ant[j] - 1].critical = true;
            max = this.graphes[ant[j] - 1].key;
            a = [];
            ant = [];
          }
        }
      }while(max != 1 )

      console.log(this.graphes);
      console.log(this.links);
     
      this.links.reverse(); 
      // Marge de Retard
      for(let i:number=0;i<this.graphes.length;i++)
      {
        this.graphes[i].margeRetard = this.graphes[i].lateFinish - this.graphes[i].earlyStart;
      }

    this.emitGraphe();
    this.emitLink();

      //if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
      var $ = go.GraphObject.make;  // for more concise visual tree definitions

      // colors used, named for easier identification
      var blue = "#0288D1";
      var pink = "#B71C1C";
      var pinkfill = "#F8BBD0";
      var bluefill = "#B3E5FC";

     // var myDiagram.clear();
      this.myDiagram =
        $(go.Diagram, "myDiagramDiv",
          {
            initialAutoScale: go.Diagram.Uniform,
            layout: $(go.LayeredDigraphLayout)
          });

      // The node template shows the activity name in the middle as well as
      // various statistics about the activity, all surrounded by a border.
      // The border's color is determined by the node data's ".critical" property.
      // Some information is not available as properties on the node data,
      // but must be computed -- we use converter functions for thathis.t.
      this.myDiagram.nodeTemplate =
        $(go.Node, "Auto",
          $(go.Shape, "Circle",  // the border
            { fill: "white", strokeWidth: 1 },
            new go.Binding("fill", "critical", function(b) { return (b ? pinkfill : bluefill); }),
            new go.Binding("stroke", "critical", function(b) { return (b ? pink : blue); })),
          $(go.Panel, "Table",
            { padding: 0.5 },
            $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { row: 0, separatorStroke: "green", background: "green", coversSeparators: true  }),
            $(go.RowColumnDefinition, { row: 1, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { row: 2, separatorStroke: "black", background: "white", coversSeparators: true  }),
            $(go.TextBlock, // earlyStart
              new go.Binding("text", "earlyStart"),
              { row: 1, column: 0, margin: 5, textAlign: "center" , font:" 15px sans-serif"}),
            $(go.TextBlock,
              new go.Binding("text", "margeRetard"),
              { 
                row: 0, column: 0, columnSpan: 3, margin: 5, 
                textAlign: "center", font:" 15px sans-serif"}),
            $(go.TextBlock,
              new go.Binding("text", "text"),
              {
                row: 2, column: 0, columnSpan: 3, margin: 5,
                textAlign: "center", font: "bold 15px sans-serif"
              }),
            $(go.TextBlock, // lateFinish
              new go.Binding("text", "lateFinish"),
              { row: 1, column: 1, margin: 5, textAlign: "center", font:" 15px sans-serif"})
          )  // end Table Panel
        );  // end Node
      // The link data object does not have direct access to both nodes
      // (although it does have references to their keys: .from and .to).
      // This conversion function gets the GraphObject that was data-bound as the second argument.
      // From that we can get the containing Link, and then the Link.fromNode or .toNode,
      // and then its node data, which has the ".critical" property we need.
      //
      // But note that if we were to dynamically change the ".critical" property on a node data,
      // calling myDiagram.model.updateTargetBindings(nodedata) would only update the color
      // of the nodes.  It would be insufficient to change the appearance of any Links.
      function linkColorConverter(linkdata, elt) {
        var link = elt.part;
        if (!link) return blue;
        var f = link.fromNode;
        if (!f || !f.data || !f.data.critical) return blue;
        var t = link.toNode;
        if (!t || !t.data || !t.data.critical) return blue;
        return pink;  // when both Link.fromNode.data.critical and Link.toNode.data.critical
      }

      // The color of a link (including its arrowhead) is red only when both
      // connected nodes have data that is ".critical"; otherwise it is blue.
      // This is computed by the binding converter function.
      this.myDiagram.linkTemplate =
        $(go.Link,
          { toShortLength: 6, toEndSegmentLength: 20 ,curve: go.Link.Bezier, reshapable: true },
          new go.Binding("curviness", "curviness").makeTwoWay(), 
          $(go.Shape,
            { strokeWidth: 2 },
            new go.Binding("stroke", "", linkColorConverter)),
          $(go.Shape,  // arrowhead
            { toArrow: "standard", stroke: null, scale: 1.5 },
            new go.Binding("fill", "", linkColorConverter)),
            $(go.Panel, "Auto",
            $(go.Shape,  // the label background, which becomes transparent around the edges
              {
                fill: $(go.Brush, "Radial",
                  { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
                stroke: null
              }),
            $(go.TextBlock, 
              new go.Binding("text", "length"),
            {
              textAlign: "center",
              font: "14pt helvetica, arial, sans-serif",
              margin: 4,
            },     
            ))
          );

      // here's the data defining the graph
      /*var nodeDataArray = [
        { key: 1, text: "Start", length: 0, earlyStart: 0, lateFinish: 0, critical: true,earlyStartd: 0, },
        { key: 2, text: "a", length: 4, earlyStart: 0, lateFinish: 4, critical: true,earlyStartd: 0, },
        { key: 3, text: "b", length: 5.33, earlyStart: 0, lateFinish: 9.17, critical: false,earlyStartd: 0, },
        { key: 4, text: "c", length: 5.17, earlyStart: 4, lateFinish: 9.17, critical: true,earlyStartd: 0, },
        { key: 5, text: "d", length: 6.33, earlyStart: 4, lateFinish: 15.01, critical: false ,earlyStartd: 0,},
        { key: 6, text: "e", length: 5.17, earlyStart: 9.17, lateFinish: 14.34, critical: true ,earlyStartd: 0,},
        { key: 7, text: "f", length: 4.5, earlyStart: 10.33, lateFinish: 19.51, critical: false ,earlyStartd: 0,},
        { key: 8, text: "g", length: 5.17, earlyStart: 14.34, lateFinish: 19.51, critical: true ,earlyStartd: 0,},
        { key: 9, text: "Finish", length: 0, earlyStart: 19.51, lateFinish: 19.51, critical: true ,earlyStartd: 0,}
      ];
      var linkDataArray = [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 6 },
        { from: 4, to: 6 },
        { from: 5, to: 7 },
        { from: 6, to: 8 },
        { from: 7, to: 9 },
        { from: 8, to: 9 }
      ];*/
      this.myDiagram.model = new go.GraphLinksModel(this.graphes, this.links);

      // create an unbound Part that acts as a "legend" for the diagram
      this.myDiagram.add(
        $(go.Node, "Auto",
          $(go.Shape, "Rectangle",  // the border
            { fill: bluefill }),
          $(go.Panel, "Table",
            $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { row: 0, separatorStroke: "black", background: "green", coversSeparators: true  }),
            $(go.RowColumnDefinition, { row: 1, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { row: 2, separatorStroke: "black", background: bluefill, coversSeparators: true  }),
            $(go.TextBlock, "Marge de retard",
              {                 
                row: 0, column: 0, columnSpan: 3, margin: 5,
                textAlign: "center", font:" 15px sans-serif"}),
            $(go.TextBlock, "Tâche",
              {
                row: 2, column: 0, columnSpan: 3, margin: 5,
                textAlign: "center", font: "bold 15px sans-serif"
              }),

            $(go.TextBlock, "Date au plus tôt",
              { row: 1, column: 0, margin: 5, textAlign: "center", font:" 15px sans-serif" }),
            $(go.TextBlock, "Date au plus tard",
              { row: 1, column: 1, margin: 5, textAlign: "center", font:" 15px sans-serif" }),
          )  // end Table Panel
        ));
        //console.log(this.graphes);
        //console.log(this.links);
  }
}
          /*for(let m:number=0;m<this.users[m].suc.length;m++)
          {
            if(this.users[i].suc.includes(this.users[k].name)){
            const medG = new Graphe(
              'deb',
              this.users[k].duree,
              this.users[k].duree,
              this.users[k].suc[m],
              'suit',
              this.users[k].ant ? this.users[k].ant : []
            );
            this.graphes.push(medG);
            }
          }*/

          /*      myDiagram.add(
        $(go.Node, "Auto",
          $(go.Shape, "Rectangle",  // the border
            { fill: bluefill }),
          $(go.Panel, "Table",
            $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", background: bluefill, coversSeparators: true }),
            $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
            $(go.TextBlock, "Early Start",
              { row: 0, column: 0, margin: 5, textAlign: "center" }),
            $(go.TextBlock, "Length",
              { row: 0, column: 1, margin: 5, textAlign: "center" }),
            $(go.TextBlock, "Early Finish",
              { row: 0, column: 2, margin: 5, textAlign: "center" }),

            $(go.TextBlock, "Activity Name",
              {
                row: 1, column: 0, columnSpan: 3, margin: 5,
                textAlign: "center", font: "bold 14px sans-serif"
              }),

            $(go.TextBlock, "Late Start",
              { row: 2, column: 0, margin: 5, textAlign: "center" }),
            $(go.TextBlock, "Slack",
              { row: 2, column: 1, margin: 5, textAlign: "center" }),
            $(go.TextBlock, "Late Finish",
              { row: 2, column: 2, margin: 5, textAlign: "center" })
          )  // end Table Panel
        ));*/
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Tache } from '../models/Tache.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TacheService } from '../models/TacheService';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-tache-list',
  templateUrl: './tache-list.component.html',
  styleUrls: ['./tache-list.component.scss']
})
export class TacheListComponent implements OnInit, OnDestroy {

  tacheForm: FormGroup;
  tacheModif: FormGroup;
  taches: Tache[];
  tacheSubscription: Subscription;
  existTs: boolean = false;

  constructor(private formBuilder: FormBuilder,private formBuilderM: FormBuilder,private tacheService: TacheService,private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.initFormModif();
    this.tacheSubscription = this.tacheService.tacheSubject.subscribe(
      (taches: Tache[]) => {
        this.taches = taches;
      }
    );
    this.tacheService.emitTache();
  }

  ngOnDestroy() {
    this.tacheSubscription.unsubscribe();
  }
  
  getTacheSuc(){
    //this.users[3].suc.push('j');
    for(let v:number=0;v<this.taches.length;v++){
      this.taches[v].suc = []
    }
    /*this.users.forEach(function(element) {
      console.log(element);
    });*/
    
    for(let i:number=0;i<this.taches.length;i++)
    {
      for(let j:number=0;j<this.taches.length;j++)
      {
        if(this.taches[j].ant.includes(this.taches[i].name))
          {
        this.taches[i].suc.push(this.taches[j].name);
          } 
      }
        if(this.taches[i].suc.length == 0 )
        this.taches[i].suc.push('fin');
    }
    this.grapheEnable();
    console.log(this.taches);
  }
  buildGraphe(){
    this.tacheService.graphe();
  }
  
  initForm() {
    this.tacheForm = this.formBuilder.group({
      name: ['', Validators.required],
      duree: ['', Validators.required],
      ant: this.formBuilder.array([]),
      suc: this.formBuilder.array([])
    });
  }
  initFormModif() {
    this.tacheModif = this.formBuilderM.group({
      name: ['', Validators.required],
      duree: ['', Validators.required],
      ant: this.formBuilderM.array([]),
      suc: this.formBuilderM.array([])
    });
    this.tacheService.emitTache();
  }

  onSubmitForm() {
    const formValue = this.tacheForm.value;
    const newTache = new Tache(
      formValue['name'],
      formValue['duree'],
      formValue['ant'] ? formValue['ant'] : [],
      formValue['suc'] ? formValue['suc'] : []
    );
    this.tacheService.addTache(newTache);
    this.initForm();
    this.grapheEnable();
    this.tacheService.desGraphe();
  }
  onSubmitModif(i:number) {
    const formValue = this.tacheModif.value;
    const upTache = new Tache(
      formValue['name'],
      formValue['duree'],
      formValue['ant'] ? formValue['ant'] : [],
      formValue['suc'] ? formValue['suc'] : []
    );
    //console.log(upTache, i)
    this.tacheService.updateTache(upTache,i);
    //console.log(this.taches);
    this.grapheEnable();
    this.tacheService.desGraphe();
    //this.tacheService.emitTache();
  }
 // debut inutile **
  getHobbies(): FormArray {
    return this.tacheForm.get('suc') as FormArray;
  }
  onAddHobby() {
    const newHobbyControl = this.formBuilder.control(null, Validators.required);
    this.getHobbies().push(newHobbyControl);
  }
// fin inutile **
  getAnt(): FormArray {
    return this.tacheForm.get('ant') as FormArray;
  }
  onAddTa() {
  const newHobbyAnt = this.formBuilder.control(null, Validators.required);
  this.getAnt().push(newHobbyAnt);
  }
  getAntM(): FormArray {
    return this.tacheModif.get('ant') as FormArray;
  }
  resetTa(){
    this.tacheModif = this.formBuilderM.group({
      name: ['', Validators.required],
      duree: ['', Validators.required],
      ant: this.formBuilderM.array([]),
      //suc: this.formBuilderM.array([])
    });
    this.tacheService.emitTache();
  }
  onAddTaM() {
  const newHobbyAnt = this.formBuilderM.control(null, Validators.required);
  this.getAntM().push(newHobbyAnt);
  }
  deleteT(i:number){
    this.tacheService.deleteTache(i);
    this.tacheService.deleteTS();
    this.grapheEnable();
    this.tacheService.desGraphe();
  }
  reinitialiserAll(){
    this.tacheService.reiniAll();
    this.grapheEnable();
    //console.log(this.taches);
  }
  grapheEnable(){
    if(this.taches.length == 0)
    {this.existTs = false;}
    else{
      for(let v:number=0;v<this.taches.length;v++){
        if(this.taches[v].suc.length == 0){
          this.existTs = false;
          break;
          //console.log("false");
        }else{
          this.existTs = true;
          //console.log("oke2");
        }
      }
    }
  }

}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Tache } from '../models/Tache.model';
import { TacheService } from '../models/TacheService';

@Component({
  selector: 'app-new-tache',
  templateUrl: './new-tache.component.html',
  styleUrls: ['./new-tache.component.scss']
})
export class NewTacheComponent implements OnInit {

  tacheForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private tacheService: TacheService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.tacheForm = this.formBuilder.group({
      name: ['', Validators.required],
      duree: ['', Validators.required],
      ant: this.formBuilder.array([]),
      suc: this.formBuilder.array([])
    });
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
    this.router.navigate(['/taches']);
  }

  getHobbies(): FormArray {
    return this.tacheForm.get('suc') as FormArray;
}
onAddHobby() {
  const newHobbyControl = this.formBuilder.control(null, Validators.required);
  this.getHobbies().push(newHobbyControl);
}
getAnt(): FormArray {
  return this.tacheForm.get('ant') as FormArray;
}
onAddTa() {
const newHobbyAnt = this.formBuilder.control(null, Validators.required);
this.getAnt().push(newHobbyAnt);
}

}
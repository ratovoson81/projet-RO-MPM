import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { addTacheService } from "./services/addTache.service";
import { Routes, RouterModule } from "@angular/router";
import { FourOhFourComponent } from "./four-oh-four/four-oh-four.component";
import { TacheService } from "./models/TacheService";
import { TacheListComponent } from "./tache-list/tache-list.component";
import { GrapheComponent } from "./graphe/graphe.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";

const appRoutes: Routes = [
  { path: "", component: TacheListComponent },
  { path: "taches", component: TacheListComponent },
  { path: "not-found", component: FourOhFourComponent },
  { path: "**", redirectTo: "not-found" },
];

@NgModule({
  declarations: [
    AppComponent,
    FourOhFourComponent,
    GrapheComponent,
    TacheListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [addTacheService, TacheService],

  bootstrap: [AppComponent],
})
export class AppModule {}

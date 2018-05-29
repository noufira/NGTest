import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test/test.component';
import { DashComponent } from './dash/dash.component';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
    {
        path: "",
        component: DashComponent
    },
    {
        path: "test",
        component: TestComponent
    },
    {
        path: "data-table",
        component: DataTableComponent
    },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

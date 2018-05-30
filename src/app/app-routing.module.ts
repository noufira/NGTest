import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test/test.component';
import { DashComponent } from './dash/dash.component';
import { DataTableComponent } from './data-table/data-table.component';
import { Test2Component } from './test2/test2.component';

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
    {
        path: "test2",
        component: Test2Component
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

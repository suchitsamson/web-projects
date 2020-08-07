import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyRangeChartComponent } from './my-range-chart/my-range-chart.component';
import { MyCardChartComponent } from './my-card-chart/my-card-chart.component';


const routes: Routes = [
  { path: 'bar-chart', component: MyBarChartComponent },
  { path: 'range-chart', component: MyRangeChartComponent },
  { path: 'card-chart', component: MyCardChartComponent },
  {path: '**', component: MyCardChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

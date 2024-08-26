import { StatementVisitor } from '@angular/compiler';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistique.service';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit , OnInit {
  subtitle: string;
  statistics: any;

  constructor(private statisticsService :StatisticsService) {
    this.subtitle = 'This is some text within a card block.';
  }
   ngOnInit(): void {
    this.statisticsService.getAllStatistics().subscribe(data => {
      this.statistics = data;
    }) 
  }

  ngAfterViewInit() { }
}

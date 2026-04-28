import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HabitsService, Habit } from '../services/habits.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class Tab3Page implements OnInit, OnDestroy {
  habitsService = inject(HabitsService);
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekData = [65, 80, 100, 55, 90, 70, 40];
  today = new Date();

  sStreak = 12;
  sBest = 21;

  get habits(): Habit[] {
    return this.habitsService.habits();
  }

  get sTotal(): number {
    return this.habits.length;
  }

  get sWeek(): string {
    const done = this.habits.filter(h => h.completed).length;
    return this.habits.length ? Math.round((done / this.habits.length) * 100) + '%' : '0%';
  }

  perHabitBars: { name: string; pct: number }[] = [];

  weeklyChart: Chart | null = null;

  ngOnInit() {
    this.renderStats();
  }

  ngOnDestroy() {
    if (this.weeklyChart) {
      this.weeklyChart.destroy();
    }
  }

  ionViewWillEnter() {
    this.renderStats();
  }

  renderStats() {
    this.perHabitBars = this.habits.map(h => ({
      name: h.name,
      pct: Math.round(50 + Math.random() * 50)
    }));

    setTimeout(() => {
      if (this.weeklyChart) {
        this.weeklyChart.destroy();
        this.weeklyChart = null;
      }

      const canvas = document.getElementById('weekly-chart') as HTMLCanvasElement;
      if (!canvas) return;

      const lastDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(this.today);
        d.setDate(d.getDate() - 6 + i);
        return this.days[d.getDay()];
      });

      this.weeklyChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: lastDays,
          datasets: [{
            data: this.weekData,
            backgroundColor: this.weekData.map((_, i) => i === 6 ? '#1D9E75' : '#9FE1CB'),
            borderRadius: 4,
            barPercentage: 0.6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              ticks: { color: '#5f5e5a', font: { size: 11 } },
              grid: { display: false },
              border: { display: false }
            },
            y: {
              min: 0,
              max: 100,
              ticks: { color: '#5f5e5a', font: { size: 11 }, callback: (v: any) => v + '%', stepSize: 50 },
              grid: { color: 'rgba(255,255,255,0.06)' },
              border: { display: false }
            }
          }
        }
      });
    }, 0);
  }
}

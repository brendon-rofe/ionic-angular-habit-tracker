import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitsService, Habit } from '../services/habits.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, CommonModule, FormsModule],
})
export class Tab1Page {
  todayDate = '';

  constructor(public habitsService: HabitsService) {
    this.todayDate = this.fmt(new Date());
  }

  fmt(d: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
  }

  get habits(): Habit[] {
    return this.habitsService.habits();
  }

  get progressLabel(): string {
    const done = this.habits.filter(h => h.completed).length;
    return `${done} of ${this.habits.length} completed`;
  }

  get progressPct(): number {
    const done = this.habits.filter(h => h.completed).length;
    return this.habits.length ? Math.round((done / this.habits.length) * 100) : 0;
  }

  toggleHabit(id: number) {
    this.habitsService.toggleHabit(id);
  }

  isModalOpen = false;
  newHabitName = '';
  newHabitFreq = 'Daily';

  openModal() {
    this.newHabitName = '';
    this.newHabitFreq = 'Daily';
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveFromToday() {
    const name = this.newHabitName.trim();
    if (name.length < 2) return;
    this.habitsService.addHabit(name, this.newHabitFreq);
    this.closeModal();
  }
}

import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, FormsModule, CommonModule],
})
export class Tab1Page {
  habits = [
    { id: 1, name: 'Morning walk', freq: 'Daily', completed: false },
    { id: 2, name: 'Read for 20 mins', freq: 'Daily', completed: false },
    { id: 3, name: 'Drink 2L of water', freq: 'Daily', completed: false },
    { id: 4, name: 'Meditate', freq: 'Weekdays', completed: false },
    { id: 5, name: 'Evening stretch', freq: 'Weekends', completed: false },
  ];
  nextId = 6;

  today = new Date();
  todayDate = '';

  isModalOpen = false;
  newHabitName = '';
  newHabitFreq = 'Daily';

  constructor() {
    this.todayDate = this.fmt(this.today);
  }

  fmt(d: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
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
    const h = this.habits.find(h => h.id === id);
    if (h) h.completed = !h.completed;
  }

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

    this.habits.push({ id: this.nextId++, name, freq: this.newHabitFreq, completed: false });
    this.closeModal();
  }
}

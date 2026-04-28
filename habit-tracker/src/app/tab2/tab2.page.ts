import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonButtons } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitsService, Habit } from '../services/habits.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, CommonModule, FormsModule],
})
export class Tab2Page {
  editMode = false;
  editingId: number | null = null;

  newHabitName = '';
  newHabitFreq = 'Daily';
  isModalOpen = false;

  constructor(public habitsService: HabitsService) {}

  get habits(): Habit[] {
    return this.habitsService.habits();
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  deleteHabit(id: number) {
    this.habitsService.deleteHabit(id);
  }

  openModal(id?: number) {
    if (id !== undefined) {
      this.editingId = id;
      const h = this.habits.find(h => h.id === id);
      if (h) {
        this.newHabitName = h.name;
        this.newHabitFreq = h.freq;
      }
    } else {
      this.editingId = null;
      this.newHabitName = '';
      this.newHabitFreq = 'Daily';
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingId = null;
  }

  saveHabit() {
    const name = this.newHabitName.trim();
    if (name.length < 2) return;

    if (this.editingId !== null) {
      this.habitsService.updateHabit(this.editingId, name, this.newHabitFreq);
    } else {
      this.habitsService.addHabit(name, this.newHabitFreq);
    }
    this.closeModal();
  }
}

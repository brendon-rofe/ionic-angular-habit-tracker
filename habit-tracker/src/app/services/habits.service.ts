import { Injectable, signal } from '@angular/core';

export interface Habit {
  id: number;
  name: string;
  freq: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  habits = signal<Habit[]>([
    { id: 1, name: 'Morning walk', freq: 'Daily', completed: false },
    { id: 2, name: 'Read for 20 mins', freq: 'Daily', completed: false },
    { id: 3, name: 'Drink 2L of water', freq: 'Daily', completed: false },
    { id: 4, name: 'Meditate', freq: 'Weekdays', completed: false },
    { id: 5, name: 'Evening stretch', freq: 'Weekends', completed: false },
  ]);

  nextId = 6;

  toggleHabit(id: number) {
    this.habits.update(habits => 
      habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h)
    );
  }

  addHabit(name: string, freq: string) {
    this.habits.update(habits => [...habits, { id: this.nextId++, name, freq, completed: false }]);
  }

  updateHabit(id: number, name: string, freq: string) {
    this.habits.update(habits =>
      habits.map(h => h.id === id ? { ...h, name, freq } : h)
    );
  }

  deleteHabit(id: number) {
    this.habits.update(habits => habits.filter(h => h.id !== id));
  }
}

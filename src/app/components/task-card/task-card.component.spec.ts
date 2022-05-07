import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../interfaces/task';

import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCardComponent ],
      imports: [MatCardModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    const task: Task = {
      nr: 0,
      progress: 0,
      createdBy: 'testuser@test.com',
      takenBy: null,
      createdAt: new Date(),
      takenAt: null,
      completedAt: null,
      title: 'Test Task',
      description: 'Test Description',
    };
    component.task = task;
    component.stateName = 'test statek';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

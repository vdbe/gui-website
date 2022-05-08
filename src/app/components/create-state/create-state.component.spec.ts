import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateStateComponent } from './create-state.component';
import { CommonModule } from '@angular/common';

describe('CreateStateComponent', () => {
    let component: CreateStateComponent;
    let fixture: ComponentFixture<CreateStateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
            declarations: [CreateStateComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateStateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

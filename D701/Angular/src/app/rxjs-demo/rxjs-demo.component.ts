import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataService, User } from '../services/data.service';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { takeUntil, startWith, map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-rxjs-demo',
    templateUrl: './rxjs-demo.component.html',
    styleUrls: ['./rxjs-demo.component.scss'],
    imports: [ReactiveFormsModule, CommonModule]
})
export class RxjsDemoComponent implements OnInit, OnDestroy {
    // Form Controls
    searchControl = new FormControl('');
    nameControl = new FormControl('');
    ageControl = new FormControl('');

    // Observables
    users$: Observable<User[]>;
    filteredUsers$: Observable<User[]>;
    streamData$: Observable<number>;
    updates$: Observable<any>;
    combinedData$: Observable<any>;
    cachedUsers$: Observable<User[]>;

    // Loading and Error states
    loading = false;
    error: string | null = null;

    // Cleanup
    private destroy$ = new Subject<void>();

    constructor(private dataService: DataService) {
        // Initialize observables
        this.users$ = this.dataService.users$;
        this.streamData$ = this.dataService.getStreamData();
        this.updates$ = this.dataService.getUpdates();
        this.combinedData$ = this.dataService.getCombinedData();
        this.cachedUsers$ = this.dataService.getUsersWithCache();
        this.dataService.testMethods()
        // Setup search with automatic updates
        this.filteredUsers$ = this.searchControl.valueChanges.pipe(
            startWith(''),
            switchMap(term => this.dataService.searchUsers(term || ''))
        );
    }

    ngOnInit() {
        // Load initial data
        this.loadUsers();

        // Subscribe to search results
        this.dataService.searchResults$
            .pipe(takeUntil(this.destroy$))
            .subscribe(results => {
                console.log('Search Results:', results);
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // User Actions
    loadUsers() {
        this.loading = true;
        this.error = null;

        this.dataService.loadUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => this.loading = false,
                error: err => {
                    this.error = err.message;
                    this.loading = false;
                }
            });
    }

    loadUsersWithDelay() {
        this.loading = true;
        this.error = null;

        this.dataService.loadUsersWithDelay()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => this.loading = false,
                error: err => {
                    this.error = err.message;
                    this.loading = false;
                }
            });
    }

    testError() {
        this.dataService.loadWithError()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                error: err => this.error = err.message
            });
    }

    addUser() {
        const newUser = {
            name: this.nameControl.value || '',
            age: parseInt(this.ageControl.value || '0', 10)
        };

        this.dataService.addUser(newUser)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.nameControl.reset();
                    this.ageControl.reset();
                },
                error: err => this.error = err.message
            });
    }
}

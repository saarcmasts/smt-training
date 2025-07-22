import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, ReplaySubject, throwError, of, interval } from 'rxjs';
import {
    map, catchError, retry, debounceTime, distinctUntilChanged, switchMap,
    shareReplay, take, filter, mergeMap, tap, delay
} from 'rxjs/operators';

export interface User {
    id: number;
    name: string;
    age: number;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private apiUrl = 'http://localhost:3000/api';

    // BehaviorSubject for maintaining state
    private usersSubject = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject.asObservable();

    // ReplaySubject for caching last N values
    private searchResultsSubject = new ReplaySubject<User[]>(3);
    searchResults$ = this.searchResultsSubject.asObservable();

    // Simple Subject for updates
    private updateSubject = new Subject<void>();
    updates$ = this.updateSubject.asObservable();

    constructor(private http: HttpClient) {
        // Initialize the data
        this.loadUsers();
    }
    // 1. Basic HTTP Observable
    loadUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
            tap(users => this.usersSubject.next(users)),
            catchError(this.handleError)
        );
    }

    // 2. Delayed Response with Retry
    loadUsersWithDelay(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/users/delayed`).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // 3. Error Handling Example
    loadWithError(): Observable<never> {
        return this.http.get<never>(`${this.apiUrl}/error`).pipe(
            catchError(error => throwError(() => new Error('Custom error message')))
        );
    }

    // 4. Search with Debounce
    searchUsers(term: string): Observable<User[]> {
        return of(term).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term =>
                this.http.get<User[]>(`${this.apiUrl}/users/search?q=${term}`)
            ),
            tap(results => this.searchResultsSubject.next(results)),
            catchError(this.handleError)
        );
    }

    // 5. Streaming Data Example
    getStreamData(): Observable<number> {
        return this.http.get(`${this.apiUrl}/stream`, { responseType: 'text' }).pipe(
            map(response => response.split('\n').filter(line => line.length > 0)),
            mergeMap(lines => lines),
            map(line => JSON.parse(line).data)
        );
    }

    // 6. Real-time Updates Example
    getUpdates(): Observable<any> {
        return new Observable(observer => {
            const eventSource = new EventSource(`${this.apiUrl}/updates`);

            eventSource.onmessage = event => {
                observer.next(JSON.parse(event.data));
            };

            eventSource.onerror = error => {
                observer.error(error);
            };

            return () => {
                eventSource.close();
            };
        }).pipe(
            shareReplay(1)
        );
    }

    // 7. Combination Example
    getCombinedData(): Observable<any> {
        const users$ = this.loadUsers();
        const updates$ = this.getUpdates().pipe(take(1));

        return users$.pipe(
            mergeMap(users => updates$.pipe(
                map(update => ({ users, lastUpdate: update.timestamp }))
            ))
        );
    }

    // 8. Cache Example with ShareReplay
    private cachedUsers$!: Observable<User[]>;

    getUsersWithCache(): Observable<User[]> {
        if (!this.cachedUsers$) {
            const request$ = this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
                shareReplay(1)
            );

            this.cachedUsers$ = request$;
        }

        return this.cachedUsers$.pipe(
            catchError(this.handleError)
        );
    }


    // 9. Add User Example
    addUser(user: Omit<User, 'id'>): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
            tap(newUser => {
                const currentUsers = this.usersSubject.value;
                this.usersSubject.next([...currentUsers, newUser]);
                this.updateSubject.next();
            }),
            catchError(this.handleError)
        );
    }

    testMethods(): void {

        //observables
        // const myObservable = new Observable(observer => {
        //     observer.next('👋 Hello');
        //     observer.next('🌍 World');
        //     observer.next('🌍 World');
        //     observer.next('🌍 World');
        //     observer.next('🌍 World');
        //     observer.next('🌍 World');
        //     observer.next('🌍 World');
        //     observer.complete();
        // });

        // myObservable.subscribe(value => {
        //     console.log(value);
        // });

        // const subject = new Subject<string>();
        // subject.subscribe(val => console.log(`A: ${val}`));
        // subject.next('Hello');

        // subject.subscribe(val => console.log(`B: ${val}`));
        // subject.next('World');

        // const behavior = new BehaviorSubject<number>(0);
        // behavior.next(5);
        // behavior.next(10);
        // behavior.next(12);
        // behavior.subscribe(val => console.log(val));

        // const replay = new ReplaySubject<number>(2);
        // replay.next(1);
        // replay.next(2);
        // replay.next(3);
        // replay.subscribe(val => console.log(val));

        // //mapping, filtering, and other RxJS operators
        // of(1, 2, 3).pipe(map(x => x * 2)).subscribe(console.log); // Output: 2, 4, 6
        // of(1, 2, 3).pipe(filter(x => x > 1)).subscribe(console.log);

        // of(1, 2, 3).subscribe(val => console.log(val));

        // of(1, 1, 2, 2, 3).pipe(distinctUntilChanged()).subscribe(console.log);

        // of(1, 2, 3).pipe(
        //     tap(val => console.log('Before map:', val)),
        //     map(val => val * 10)
        // ).subscribe(val => console.log(val));

        // interval(1000).pipe(take(7)).subscribe(console.log);

        // of('Delayed message').pipe(delay(2000)).subscribe(console.log);

    }

    // Helper method for error handling
    private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        return throwError(() => error);
    }
}

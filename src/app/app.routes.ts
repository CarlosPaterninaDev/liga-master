import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./modules/login/login.component')
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component'),
        children: [
            {
                path: 'match',
                loadComponent: () => import('./modules/matches/matches.component')
            },
            {
                path: 'team',
                loadComponent: () => import('./modules/teams/teams.component')
            },
            {
                path: '**',
                redirectTo: 'team',
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

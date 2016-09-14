import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { LoginComponent } from './login.component';

const appRoutes : Routes = [
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
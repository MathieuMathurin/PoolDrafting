import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterComponent } from './search/filter.component';
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './team/team.component';
import { RulesComponent } from './rules/rules.component';

const appRoutes : Routes = [
    {
        path: 'search',
        component: FilterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'team',
        component: TeamComponent
    },
    {
        path: 'rules',
        component: RulesComponent
    }
];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
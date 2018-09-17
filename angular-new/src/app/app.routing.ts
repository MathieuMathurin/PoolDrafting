import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { FilterComponent } from './search/filter.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { SearchComponent } from "./search/search.component";
// import { TeamComponent } from './team/team.component';
// import { RulesComponent } from './rules/rules.component';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: "full",
        redirectTo: "signup"
    },
    {
        path: "signup",
        pathMatch: "full",
        component: LandingPageComponent,
        canActivate: [LoginGuardService]
    },
    {
        path: '',
        canActivate: [AuthGuardService],
        children: [
            // {
            //     path: 'search',
            //     component: FilterComponent
            // },
            {
                path: 'search',
                component: SearchComponent
            },
            // {
            //     path: 'team',
            //     component: TeamComponent
            // },
            // {
            //     path: 'rules',
            //     component: RulesComponent
            // }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

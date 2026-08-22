import { Routes } from '@angular/router';
import { LandingPage } from './dashboard/landing-page/landing-page';
import { FitnessWizard } from './dashboard/fitness-wizard/fitness-wizard';
import { Dashboard } from './dashboard/dashboard/dashboard';
import { WorkoutCreation } from './workout/workout-creation/workout-creation';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage,
    },
    {
        path: 'fitness-wizard',
        component: FitnessWizard,
    },
    {
        path: 'dashboard',
        component: Dashboard,
    },
    {
        path:'workout-creation',
        component: WorkoutCreation
    },
];

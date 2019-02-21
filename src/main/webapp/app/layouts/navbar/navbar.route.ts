import { Route } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { OrganizationResolve } from 'app/shared/common.resolver';

export const navbarRoute: Route = {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar',
    resolve: {
        organization: OrganizationResolve
    }
};

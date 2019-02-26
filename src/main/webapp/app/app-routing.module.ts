import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { OrganizationResolve } from 'app/shared/common.resolver';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#TeamdojoAdminModule'
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED, onSameUrlNavigation: 'reload' }
        )
    ],
    providers: [OrganizationResolve],
    exports: [RouterModule]
})
export class TeamdojoAppRoutingModule {}

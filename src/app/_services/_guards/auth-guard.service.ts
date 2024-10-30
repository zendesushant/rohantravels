import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../_auth/auth.service";
import { inject } from "@angular/core";
import { AppRedirectionService } from "../_app/app-redirection.service";

  export const canActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
      const authService = inject(AuthService);
      const router = inject(Router);
      if (authService.isAuthenticated()) {
        return true;
      }
      router.navigate(['/login']);
      return false;
}

export const loggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const appRedirection = inject(AppRedirectionService);
    if (authService.isAuthenticated()) {
      appRedirection.redirectToHome();
      return false;
    }
    return true;
}



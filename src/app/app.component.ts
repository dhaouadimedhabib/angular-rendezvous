import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeader = true;

  constructor(private router: Router) {
    // Écouter les événements de navigation pour afficher/cacher le header
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        // Ajouter une logique pour vérifier les URL dynamiques
        const hideHeaderRoutes = [
          '/login',
          '/register',
          '/admin',
          '/listerdv',
          '/plan',
          '/client',
          '/service',
          '/update',
          '/paiement',
          '/signin',
          '/reclamation',
          '/post',
          '/news',
          '/news1',
          '/news2',
          '/article',
          
          

        ];

        const isReservationRoute = /\/reservation\/\d+/.test(event.url);
        const isDetailleRoute = /\/detaille\/\d+/.test(event.url);
        const isResetPasswordRoute = event.url.includes('/reset-password');
        const isChangePasswordRoute = event.url.includes('/change-password');
        const isPaiementRoute = event.url.includes('/paiement');

        this.showHeader = !hideHeaderRoutes.includes(event.url) && 
                          !isReservationRoute && 
                          !isDetailleRoute && 
                          !isResetPasswordRoute && 
                          !isChangePasswordRoute &&
                          !isPaiementRoute;
      }
    });
  }
}

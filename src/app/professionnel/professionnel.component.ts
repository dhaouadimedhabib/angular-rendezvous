import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { User } from '../modele/user';

@Component({
  selector: 'app-professionnel',
  templateUrl: './professionnel.component.html',
  styleUrls: ['./professionnel.component.css']
})
export class ProfessionnelComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  selectedService: string = ''; // Stocke le service sélectionné
  services: string[] = []; // Liste des services récupérés de l'API

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfessionnels().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data; // Initialiser filteredUsers avec la liste complète
    });

    // Charger la liste des services depuis l'API
    this.loadServices();
  }

  // Charger la liste des services depuis l'API
  loadServices(): void {
    this.userService.getServices().subscribe((data: string[]) => {
      this.services = data; // Mettre à jour la liste des services
    });
  }

  // Filtrer les professionnels par service
  filterUsersByService(): void {
    if (this.selectedService) {
      this.userService.filterUsersByService(this.selectedService).subscribe((data) => {
        this.filteredUsers = data; // Mettre à jour la liste filtrée par service
      });
    } else {
      this.filteredUsers = this.users; // Rétablir la liste complète si aucun service n'est sélectionné
    }
  }

  // Filtrer les professionnels par nom
  filterUsers(): void {
    const searchLower = this.searchText.toLowerCase(); // Convertir la chaîne de recherche en minuscules
    this.filteredUsers = this.filteredUsers.filter(user => 
      (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchLower)
    );
  }
}

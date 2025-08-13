import { Component } from '@angular/core';
import { Reclamation } from '../modele/reclamation';
import { ReclamationService } from '../Service/reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {
  reclamations: Reclamation[] = [];
  isAdmin: boolean = false; 
  searchTerm: string = ''; 

  sortColumn: string = ''; // Colonne à trier
  sortDirection: boolean = true; // true pour ascendant, false pour descendant

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(): void {
    const roles = localStorage.getItem('roles'); 
    this.isAdmin = roles ? JSON.parse(roles).includes('ADMIN') : false; 
    if (this.isAdmin) {
      this.loadReclamations();
    } else {
      console.log('User is not an admin, reclamations will not be loaded.');
    }
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (data: Reclamation[]) => {
        this.reclamations = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des réclamations', error);
      }
    );
  }

  filteredReclamations(): Reclamation[] {
    let filtered = this.reclamations;

    if (this.searchTerm) {
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      filtered = filtered.filter(reclamation =>
        reclamation.email.toLowerCase().includes(lowerSearchTerm) ||
        reclamation.phone.includes(this.searchTerm) ||
        reclamation.name.toLowerCase().includes(lowerSearchTerm) ||
        reclamation.message.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (this.sortColumn) {
      filtered = filtered.sort((a, b) => {
        const valA = (a as any)[this.sortColumn];
        const valB = (b as any)[this.sortColumn];
        if (valA < valB) {
          return this.sortDirection ? -1 : 1;
        } else if (valA > valB) {
          return this.sortDirection ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    return filtered;
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection; // Inverser la direction
    } else {
      this.sortColumn = column;
      this.sortDirection = true; // Par défaut, tri ascendant
    }
  }
}

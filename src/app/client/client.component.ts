import { Component, OnInit, ViewChild } from '@angular/core';
import { RendezVous } from '../modele/rendezvous';
import { RendezVousService } from '../Service/rendez-vous.service';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @ViewChild('profileMenuTrigger')
  rendezVous: RendezVous[] = [];
  filteredAppointments: RendezVous[] = [];
  nomClient: string = 'rabie'; // Changez cela selon vos besoins
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  selectedAppointment: RendezVous | null = null;
  totalPages: number = 1;
  loading: boolean = true; // Par défaut, le chargement est activé

  constructor(private rendezVousService: RendezVousService, private userService: UserService,  private router : Router) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // Rediriger vers la page de connexion
      alert('Session expired or invalid. Please log in again.');
      this.router.navigate(['/login']);
    } else {
      this.fetchRendezVous(); // Charger les rendez-vous
    }
  }
  

  fetchRendezVous(): void {
    this.loading = true; // Activer le spinner avant la récupération
    this.rendezVousService.getRendezVousByClient(this.nomClient).subscribe(
      (data: RendezVous[]) => {
        this.rendezVous = data;
        this.filteredAppointments = data; // Initialiser la liste filtrée avec tous les rendez-vous
        this.updateTotalPages(); // Mettre à jour le nombre de pages
        this.loading = false; // Désactiver le spinner une fois terminé
      },
      (error) => {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
        this.loading = false; // Désactiver le spinner même en cas d'erreur
      }
    );
  }

  // Filtrage des rendez-vous selon le terme de recherche
  filterAppointments(): void {
    this.filteredAppointments = this.rendezVous.filter(rdv => {
      const dateStr = rdv.date instanceof Date ? rdv.date.toLocaleDateString() : rdv.date;
      return (
        dateStr.includes(this.searchTerm) ||
        rdv.statuts.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.currentPage = 1; // Réinitialiser à la première page après filtrage
    this.updateTotalPages(); // Mettre à jour le nombre total de pages après filtrage
  }

  // Pagination : obtenir les rendez-vous de la page courante
  get paginatedAppointments(): RendezVous[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredAppointments.slice(start, end);
  }

  updateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Ouvrir la modale de détails pour un rendez-vous spécifique
  openDetailsModal(rdv: RendezVous): void {
    this.selectedAppointment = rdv;
    const modalElement = document.getElementById('detailsModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }

  // Fermer la modale de détails
  closeDetailsModal(): void {
    this.selectedAppointment = null;
    const modalElement = document.getElementById('detailsModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.userService.logout();

  }
}

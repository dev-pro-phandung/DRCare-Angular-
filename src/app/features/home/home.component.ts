import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Specialty } from '../../core/models/specialty.model';
import { Doctor } from '../../core/models/doctor.model';
import { VndCurrencyPipe } from '../../shared/pipes/vnd-currency.pipe';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, VndCurrencyPipe, LoadingSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  specialties: Specialty[] = [];
  featuredDoctors: Doctor[] = [];
  loading = true;

  ngOnInit(): void {
    this.api.getSpecialties().subscribe(specs => {
      this.specialties = specs;
      this.api.getDoctors().subscribe(docs => {
        this.featuredDoctors = docs.slice(0, 3);
        this.loading = false;
      });
    });
  }

  selectSpecialty(specialtyId: string): void {
    this.router.navigate(['/booking'], { queryParams: { specialty: specialtyId } });
  }

  selectDoctor(doctorId: string): void {
    this.router.navigate(['/booking'], { queryParams: { doctor: doctorId } });
  }
}

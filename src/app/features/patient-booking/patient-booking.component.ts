import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StepperBarComponent } from './components/stepper-bar/stepper-bar.component';
import { Step1DoctorSelectComponent } from './components/step1-doctor-select/step1-doctor-select.component';
import { Step2SlotPickerComponent } from './components/step2-slot-picker/step2-slot-picker.component';
import { Step3PatientFormComponent } from './components/step3-patient-form/step3-patient-form.component';
import { BookingStateService } from './services/booking-state.service';

@Component({
  selector: 'app-patient-booking',
  standalone: true,
  imports: [
    StepperBarComponent,
    Step1DoctorSelectComponent,
    Step2SlotPickerComponent,
    Step3PatientFormComponent
  ],
  templateUrl: './patient-booking.component.html',
  styleUrl: './patient-booking.component.scss'
})
export class PatientBookingComponent {
  readonly state = inject(BookingStateService);
  private router = inject(Router);

  activeSubTab = 'CSYT';

  switchSubTab(tab: string): void {
    this.activeSubTab = tab;
    if (tab === 'APPOINTMENTS') {
      this.router.navigate(['/my-appointments']);
    }
  }
}

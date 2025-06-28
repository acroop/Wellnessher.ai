// Common types used across the application

export type User = {
  id: string;
  name: string;
  email: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  profilePicture?: string;
};

export type Period = {
  id: string;
  date: string;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  notes?: string;
};

export type PeriodCycle = {
  averageCycleLength: number;
  lastPeriodDate: string;
  periodHistory: Period[];
};

export type PCOSSymptom = {
  id: string;
  date: string;
  symptoms: string[];
  intensityLevel: number; // 1-10
  notes?: string;
};

export type PCOSData = {
  diagnosed: boolean;
  diagnosisDate?: string;
  medicationList?: string[];
  symptoms: PCOSSymptom[];
};

export type PregnancyData = {
  isPregnant: boolean;
  dueDate?: string;
  weeksPregnant?: number;
  babySize?: string;
  appointments?: PregnancyAppointment[];
  symptoms?: PregnancySymptom[];
};

export type PregnancyAppointment = {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  purpose: string;
  notes?: string;
};

export type PregnancySymptom = {
  id: string;
  date: string;
  symptoms: string[];
  intensityLevel: number; // 1-10
  notes?: string;
};

export type BreastCheckReminder = {
  id: string;
  frequency: 'weekly' | 'monthly';
  nextDate: string;
  completed: boolean[];
};

export type MedicalRecord = {
  id: string;
  type: 'medication' | 'allergy' | 'condition' | 'procedure' | 'vaccination';
  name: string;
  date?: string;
  details?: string;
  doctor?: string;
  hospital?: string;
  attachments?: MedicalDocument[];
};

export type MedicalDocument = {
  id: string;
  name: string;
  date: string;
  type: 'prescription' | 'labReport' | 'imaging' | 'discharge' | 'other';
  file: string; // URI to the file
  notes?: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  hospital?: string;
  rating: number;
  reviewCount: number;
  availableDates?: string[];
};

export type Appointment = {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  virtual: boolean;
  meetingLink?: string;
};

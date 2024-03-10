interface Client {
  user: string;
  fullName: string;
  mobileNumber: string;
}

interface Annex {
  upper: boolean;
  land: boolean;
}

interface HoursExpectedPerDepartment {
  [key: string]: number;
}

interface Project {
  _id: string;
  name?: string;
  number?: number;
  location?: string;
  client?: Client;
  owner?: string;
  sender?: string;
  dateOfSubmission?: Date;
  type?: string;
  participatingDepartments?: string[];
  numberOfFloors?: number;
  landArea?: number;
  buildingArea?: number;
  totalBuildingArea?: number;
  annex?: Annex;
  hoursExpectedToComplete?: number;
  expectedCompletionDate?: Date;
  actualCompletionDate: Date | null;
  workingDepartments?: string[];
  hoursExpectedPerDepartment?: HoursExpectedPerDepartment;
  downloadLink?: string;
  projectPictures?: string[];
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Project;

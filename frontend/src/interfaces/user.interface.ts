interface User {
  _id: string;
  username: string;
  password: string;
  role: 'client' | 'junior' | 'senior' | 'branchManager' | 'companyOwner';
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  address?: string;
  jobLevel?: string;
  mobileNumber: string;
  email?: string;
  contract?: {
    number?: string;
    startDate?: string;
    endDate?: string;
    salary?: number;
  };
}

export default User;

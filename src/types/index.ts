export interface User {
  id: string;
  email: string;
  name: string;
  role?: 'applicant' | 'admin';
  avatar?: string;
  createdAt: Date;
  emailConfirmed?: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: string;
  description: string;
  requirements: string[];
  postedAt: Date;
  deadline: Date;
}

export interface Application {
  id: string;
  jobId: string;
  applicantId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: Date;
  resume?: string;
  coverLetter?: string;
}
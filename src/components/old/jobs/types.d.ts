export interface Job {
  id: string;
  applied?: string;
  company: string;
  created: string;
  link?: string;
  role: string;
  status?: string;
}

interface JobList {
  records: Job[];
}

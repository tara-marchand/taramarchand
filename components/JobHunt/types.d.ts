export interface Job {
  company: string;
  dateApplied?: string;
  title?: string[];
  url?: string;
}

interface JobList {
  entities: Job[];
}

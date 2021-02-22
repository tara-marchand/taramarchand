interface ResumeData {
  basics?: {
    name: string;
    label: string;
    picture: string;
    email: string;
    phone: string;
    website: string;
    summary: string;
    location?: ResumeLocation[];
    profiles: ResumeProfile[];
    [key: string]: string | ResumeLocation[] | ResumeProfile[] | undefined;
  };
  work?: ResumeWork[];
  volunteer?: ResumeVolunteer[];
  education?: ResumeEducation[];
  awards?: ResumeAward[];
  publications?: ResumePublication[];
  skills?: ResumeSkill[];
  languages?: ResumeLanguage[];
  interests?: ResumeInterest[];
  references?: ResumeReference[];
}

interface ResumeLocation {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
  [key: string]: string;
}

interface ResumeProfile {
  network: string;
  username: string;
  url: string;
}

interface ResumeWork {
  company: string;
  position: string;
  website: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

interface ResumeVolunteer {
  organization: string;
  position: string;
  website: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

interface ResumeEducation {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  gpa: string;
  courses?: string[];
}

interface ResumeAward {
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

interface ResumePublication {
  name: string;
  publisher: string;
  releaseDate: string;
  website: string;
  summary: string;
}

interface ResumeSkill {
  name: string;
  keywords: string[];
  level?: string;
}

interface ResumeLanguage {
  name: string;
  level: string;
}

interface ResumeInterest {
  name: string;
  keywords: string[];
}

interface ResumeReference {
  name: string;
  reference: string;
}
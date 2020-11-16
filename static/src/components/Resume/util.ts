export namespace Resume {
  export interface Data {
    basics?: {
      name: string;
      label: string;
      picture: string;
      email: string;
      phone: string;
      website: string;
      summary: string;
      location: Location[];
      profiles: Profile[];
      [key: string]: string | Location[] | Profile[];
    };
    work?: Work[];
    volunteer?: Volunteer[];
    education?: Education[];
    awards?: Award[];
    publications?: Publication[];
    skills?: Skill[];
    languages?: Language[];
    interests?: Interest[];
    references?: Reference[];
  }

  export interface Location {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
    [key: string]: string;
  }

  export interface Profile {
    network: string;
    username: string;
    url: string;
  }

  export interface Work {
    company: string;
    position: string;
    website: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
  }

  export interface Volunteer {
    organization: string;
    position: string;
    website: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
  }

  export interface Education {
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    gpa: string;
    courses: string[];
  }

  export interface Award {
    title: string;
    date: string;
    awarder: string;
    summary: string;
  }

  export interface Publication {
    name: string;
    publisher: string;
    releaseDate: string;
    website: string;
    summary: string;
  }

  export interface Skill {
    name: string;
    keywords: string[];
    level: string;
  }

  export interface Language {
    name: string;
    level: string;
  }

  export interface Interest {
    name: string;
    keywords: string[];
  }

  export interface Reference {
    name: string;
    reference: string;
  }
}

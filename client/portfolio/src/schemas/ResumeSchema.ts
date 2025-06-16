interface Contact {
  email: string;
  phone: string;
}

interface Hobby {
  hobby: string;
  description: string;
}

interface Tech {
  name: string;
  description: string;
  extra: Omit<Tech, 'extra'>;
}

interface Degree {
  college: string;
  course: string;
  date: string;
}

type Course = Omit<Degree, 'college'>;

interface Education {
  degrees: Degree[];
  courses: Course[];
}

export interface ResumeObject {
  name: string;
  age: number;
  contacts: Contact;
  job: string;
  sex: string;
  bio: string;
  hobbies: Hobby[];
  stack: Tech[];
  education: Education;
}

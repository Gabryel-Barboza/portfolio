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
}

interface Degree {
  college: string;
  course: string;
  date: string;
}

interface Course {
  name: string;
  date: string;
  certificate: string;
}

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
  extra: Tech[];
  education: Education;
}

export interface Student {
  id: number;
  name: string;
  major: string;
  year: number;
  gpa: number;
  avatar: string;
  email: string;
  matricNumber: string;
}

const uiCourses = [
  // Faculty of Arts
  'Arabic Language and Literature',
  'Archaeology',
  'Classics',
  'Communication and Language Arts',
  'English',
  'European Studies',
  'History',
  'Islamic Studies',
  'Linguistics',
  'Music',
  'Philosophy',
  'Religious Studies',
  'Theatre Arts',
  'Yoruba',
  
  // Faculty of Science
  'Biochemistry',
  'Botany',
  'Chemistry',
  'Computer Science',
  'Geography',
  'Geology',
  'Mathematics',
  'Microbiology',
  'Physics',
  'Statistics',
  'Zoology',
  
  // Faculty of Basic Medical Sciences
  'Biochemistry',
  'Human Nutrition',
  'Medical Laboratory Science',
  'Nursing',
  'Physiology',
  
  // Faculty of Clinical Sciences
  'Medicine and Surgery',
  'Dentistry',
  
  // Faculty of Agriculture
  'Agricultural Economics',
  'Agricultural Extension',
  'Agronomy',
  'Animal Science',
  'Crop Protection',
  
  // Faculty of Education
  'Adult Education',
  'Educational Management',
  'Guidance and Counselling',
  'Library Studies',
  'Special Education',
  'Teacher Education',
  
  // Faculty of Technology
  'Agricultural and Environmental Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Food Technology',
  'Industrial and Production Engineering',
  'Mechanical Engineering',
  'Petroleum Engineering',
  'Wood Products Engineering',
  
  // Faculty of Social Sciences
  'Economics',
  'Geography',
  'Political Science',
  'Psychology',
  'Sociology',
  
  // Faculty of Law
  'Law',
  
  // Faculty of Pharmacy
  'Pharmacy',
  
  // Faculty of Veterinary Medicine
  'Veterinary Medicine'
];

export const generateMockStudents = (count: number): Student[] => {
  const years = [1, 2, 3, 4, 5, 6]; // Some programs like Medicine have up to 6 years
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    major: uiCourses[Math.floor(Math.random() * uiCourses.length)],
    year: years[Math.floor(Math.random() * years.length)],
    gpa: Number((Math.random() * (4.0 - 2.5) + 2.5).toFixed(2)),
    avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${i}`,
    email: `student${i + 1}@university.edu`,
    matricNumber: `UI/${String(new Date().getFullYear()).slice(-2)}/${String(i + 1).padStart(5, '0')}`
  }));
};
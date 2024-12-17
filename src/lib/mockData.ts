export interface Student {
  id: number;
  name: string;
  major: string;
  year: number;
  gpa: number;
  avatar: string;
  email: string;
}

export const generateMockStudents = (count: number): Student[] => {
  const majors = ['Computer Science', 'Engineering', 'Biology', 'Mathematics', 'Physics', 'Chemistry', 'Psychology'];
  const years = [1, 2, 3, 4];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    major: majors[Math.floor(Math.random() * majors.length)],
    year: years[Math.floor(Math.random() * years.length)],
    gpa: Number((Math.random() * (4.0 - 2.5) + 2.5).toFixed(2)),
    avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${i}`,
    email: `student${i + 1}@university.edu`
  }));
};
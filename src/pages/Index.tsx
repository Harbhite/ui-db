import { useState, useEffect } from "react";
import { Student, generateMockStudents } from "@/lib/mockData";
import { StudentCard } from "@/components/StudentCard";
import { StudentModal } from "@/components/StudentModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, SlidersHorizontal, Palette } from "lucide-react";

const Index = () => {
  const [students, setStudents] = useState<Student[]>(() => generateMockStudents(1000));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [sortByCGPA, setSortByCGPA] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isGrayscale) {
      document.documentElement.classList.add('grayscale');
    } else {
      document.documentElement.classList.remove('grayscale');
    }
  }, [isGrayscale]);

  const uniqueMajors = Array.from(new Set(students.map(s => s.major)));
  const uniqueYears = Array.from(new Set(students.map(s => s.year))).sort();

  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.major.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((student) => !selectedYear || student.year === selectedYear)
    .filter((student) => !selectedMajor || student.major === selectedMajor);

  const sortedStudents = [...filteredStudents].sort((a, b) => 
    sortByCGPA ? b.gpa - a.gpa : 0
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 dark:bg-[#1A1F2C]">
      <div className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 dark:bg-[#1A1F2C]/80 border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="neo-brutalist"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsGrayscale(!isGrayscale)}
              className="neo-brutalist"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="neo-brutalist">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedYear(null)}>
                  All Years
                </DropdownMenuItem>
                {uniqueYears.map((year) => (
                  <DropdownMenuItem key={year} onClick={() => setSelectedYear(year)}>
                    Year {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="neo-brutalist">
                  {selectedMajor || 'Select Major'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedMajor(null)}>
                  All Majors
                </DropdownMenuItem>
                {uniqueMajors.map((major) => (
                  <DropdownMenuItem key={major} onClick={() => setSelectedMajor(major)}>
                    {major}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="neo-brutalist"
              onClick={() => setSortByCGPA(!sortByCGPA)}
            >
              {sortByCGPA ? 'Clear Sort' : 'Sort by GPA'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
          UI mist Student Directory
        </h1>
        
        <div className="mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search by name or major..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-brutalist w-full p-4 text-lg bg-background focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
          {sortedStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onClick={setSelectedStudent}
            />
          ))}
        </div>

        <StudentModal
          student={selectedStudent}
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      </div>
    </div>
  );
};

export default Index;
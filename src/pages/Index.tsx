import { useState } from "react";
import { Student, generateMockStudents } from "@/lib/mockData";
import { StudentCard } from "@/components/StudentCard";
import { StudentModal } from "@/components/StudentModal";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [students] = useState<Student[]>(() => generateMockStudents(50));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          Student Directory
        </h1>
        
        <div className="mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search by name or major..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-brutalist w-full p-4 text-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
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
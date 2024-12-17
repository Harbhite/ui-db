import { Student } from "@/lib/mockData";

interface StudentCardProps {
  student: Student;
  onClick: (student: Student) => void;
}

export function StudentCard({ student, onClick }: StudentCardProps) {
  return (
    <div
      onClick={() => onClick(student)}
      className="student-card neo-brutalist neo-brutalist-hover bg-white p-4 cursor-pointer"
    >
      <img
        src={student.avatar}
        alt={student.name}
        className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-black"
      />
      <h3 className="font-bold text-lg mb-1">{student.name}</h3>
      <p className="text-sm text-gray-600">{student.major}</p>
      <p className="text-sm">Year {student.year}</p>
    </div>
  );
}
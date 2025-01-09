import React from 'react';
import { Student } from "@/lib/mockData";

interface StudentCardProps {
  student: Student;
  onClick: (student: Student) => void;
}

export function StudentCard({ student, onClick }: StudentCardProps) {
  return (
    <div
      onClick={() => onClick(student)}
      className="student-card neo-brutalist neo-brutalist-hover bg-white p-6 cursor-pointer"
    >
      <div className="space-y-4">
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-full h-full object-cover rounded-full border-4 border-[#403E43]"
          />
          <div className="absolute inset-0 rounded-full shadow-inner"></div>
        </div>
        <div className="space-y-2 text-center">
          <h3 className="font-bold text-xl text-[#403E43]">{student.name}</h3>
          <p className="text-[#8A898C] font-medium">{student.major}</p>
          <p className="text-[#403E43]">Year {student.year}</p>
        </div>
      </div>
    </div>
  );
}
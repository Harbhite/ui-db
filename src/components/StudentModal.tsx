import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Student } from "@/lib/mockData";

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentModal({ student, isOpen, onClose }: StudentModalProps) {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="neo-brutalist bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{student.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-32 h-32 mx-auto rounded-full border-2 border-black"
          />
          <div className="grid grid-cols-2 gap-2 text-lg">
            <span className="font-bold">Major:</span>
            <span>{student.major}</span>
            <span className="font-bold">Year:</span>
            <span>{student.year}</span>
            <span className="font-bold">GPA:</span>
            <span>{student.gpa}</span>
            <span className="font-bold">Email:</span>
            <span className="break-all">{student.email}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
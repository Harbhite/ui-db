import { Student } from "@/lib/mockData";
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph } from 'docx';
import jsPDF from 'jspdf';
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface StudentCardProps {
  student: Student;
  onClick: (student: Student) => void;
}

export function StudentCard({ student, onClick }: StudentCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const downloadAsPNG = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current);
      const link = document.createElement('a');
      link.download = `${student.name}-profile.png`;
      link.href = canvas.toDataURL();
      link.click();
      toast.success("Profile downloaded as PNG!");
    } catch (error) {
      toast.error("Failed to download PNG");
    }
  };

  const downloadAsPDF = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 190);
      pdf.save(`${student.name}-profile.pdf`);
      toast.success("Profile downloaded as PDF!");
    } catch (error) {
      toast.error("Failed to download PDF");
    }
  };

  const downloadAsWord = async () => {
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: `Student Profile`,
            }),
            new Paragraph({
              text: `Name: ${student.name}`,
            }),
            new Paragraph({
              text: `Major: ${student.major}`,
            }),
            new Paragraph({
              text: `Year: ${student.year}`,
            }),
            new Paragraph({
              text: `GPA: ${student.gpa}`,
            }),
            new Paragraph({
              text: `Email: ${student.email}`,
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${student.name}-profile.docx`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success("Profile downloaded as Word document!");
    } catch (error) {
      toast.error("Failed to download Word document");
    }
  };

  return (
    <div
      ref={cardRef}
      className="student-card neo-brutalist neo-brutalist-hover bg-white p-4 cursor-pointer relative group"
    >
      <div onClick={() => onClick(student)}>
        <img
          src={student.avatar}
          alt={student.name}
          className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-black"
        />
        <h3 className="font-bold text-lg mb-1">{student.name}</h3>
        <p className="text-sm text-gray-600">{student.major}</p>
        <p className="text-sm">Year {student.year}</p>
      </div>
      
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            downloadAsPNG();
          }}
          className="neo-brutalist p-2"
        >
          <Download className="h-4 w-4" />
          PNG
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            downloadAsPDF();
          }}
          className="neo-brutalist p-2"
        >
          <Download className="h-4 w-4" />
          PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            downloadAsWord();
          }}
          className="neo-brutalist p-2"
        >
          <Download className="h-4 w-4" />
          DOCX
        </Button>
      </div>
    </div>
  );
}
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Student } from "@/lib/mockData";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph } from 'docx';
import jsPDF from 'jspdf';
import { toast } from "sonner";
import { useRef } from "react";

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentModal({ student, isOpen, onClose }: StudentModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  if (!student) return null;

  const downloadAsPNG = async () => {
    if (!contentRef.current) return;
    try {
      const canvas = await html2canvas(contentRef.current);
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
    if (!contentRef.current) return;
    try {
      const canvas = await html2canvas(contentRef.current);
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
            new Paragraph({ text: `Student Profile` }),
            new Paragraph({ text: `Name: ${student.name}` }),
            new Paragraph({ text: `Matric Number: ${student.matricNumber}` }),
            new Paragraph({ text: `Major: ${student.major}` }),
            new Paragraph({ text: `Year: ${student.year}` }),
            new Paragraph({ text: `GPA: ${student.gpa}` }),
            new Paragraph({ text: `Email: ${student.email}` }),
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="neo-brutalist bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{student.name}</DialogTitle>
        </DialogHeader>
        <div ref={contentRef} className="grid gap-4 py-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-32 h-32 mx-auto rounded-full border-2 border-black"
          />
          <div className="grid grid-cols-2 gap-2 text-lg">
            <span className="font-bold">Matric Number:</span>
            <span>{student.matricNumber}</span>
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
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadAsPNG}
            className="neo-brutalist p-2 bg-[#E5DEFF] hover:bg-[#D3CBFF]"
          >
            <Download className="h-4 w-4 mr-2" />
            PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadAsPDF}
            className="neo-brutalist p-2 bg-[#FFDEE2] hover:bg-[#FFD1D6]"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadAsWord}
            className="neo-brutalist p-2 bg-[#D3E4FD] hover:bg-[#C4DBFF]"
          >
            <Download className="h-4 w-4 mr-2" />
            DOCX
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
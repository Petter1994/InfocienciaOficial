import { Metadata } from "next";
import CourseContent from '@/components/Course/CourseContent';


export const metadata: Metadata = {
  title: "Cursos",
  description: "Infociencia Cursos"
};

const CoursePage = async () => {

  return (
    <>
      <CourseContent />
    </>
  );
};

export default CoursePage;

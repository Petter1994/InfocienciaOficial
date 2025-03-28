import { Metadata } from "next";
import CenterContent from '@/components/Center/CenterContent';


export const metadata: Metadata = {
  title: "Centros",
  description: "Infociencia Centros"
};

const CenterPage = async () => {

  return (
    <>
      <CenterContent />
    </>
  );
};

export default CenterPage;

import { Metadata } from "next";
import EventContent from '@/components/Event/EventContent';


export const metadata: Metadata = {
  title: "Eventos",
  description: "Infociencia Eventos"
};

const CenterPage = async () => {

  return (
    <>
      <EventContent />
    </>
  );
};

export default CenterPage;

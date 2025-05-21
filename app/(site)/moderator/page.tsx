import { Metadata } from "next";
import ModeratorContent from '@/components/Moderator/ModeratorContent';


export const metadata: Metadata = {
  title: "Moderar Comentarios",
  description: "Infociencia Moderar Comentarios"
};

const ModeratorPage = async () => {

  return (
    <>
      <ModeratorContent />
    </>
  );
};

export default ModeratorPage;

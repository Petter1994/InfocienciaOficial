import { Metadata } from "next";
import UserProfile from '@/components/User/UserProfile';


export const metadata: Metadata = {
  title: "Perfil",
  description: "Infociencia Perfil de Usuario"
};

const CenterPage = async () => {

  return (
    <>
      <UserProfile />
    </>
  );
};

export default CenterPage;

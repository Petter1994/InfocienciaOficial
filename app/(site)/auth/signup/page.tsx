import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse Infociencia",

  // other metadata
  description: "Registrarse Infociencia"
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}

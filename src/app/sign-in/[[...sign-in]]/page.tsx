import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import heroAuth from '../../assets/hero-auth.jpg';

export default function Page() {
  return (
   
<div className="pb-24 flex items-center justify-center min-h-screen ">
  <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
</div>
  );
}

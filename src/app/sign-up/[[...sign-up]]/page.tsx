import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return(
  <div className="pb-24 flex items-center justify-center min-h-screen">
    <SignUp />
  </div>);
}

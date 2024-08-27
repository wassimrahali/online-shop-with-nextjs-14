import Image from "next/image";
import Loader from "../../app/assets/loader.svg";

const LoaderComponent = () => (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
      <Image
        priority={true}
        src={Loader}
        className="rounded-full h-28 w-28"
        alt="Loading"
        width={112}
        height={112}
      />
    </div>
  );
  export default LoaderComponent ;
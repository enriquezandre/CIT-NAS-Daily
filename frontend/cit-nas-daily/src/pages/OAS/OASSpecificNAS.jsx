// import { Button } from "flowbite-react";
// import { HiOutlineArrowLeft } from "react-icons/hi";
import { Header } from "../../components/Header";
import { SpecificNASTabs } from "../../components/OAS/SpecificNASTabs";

export const OASSpecificNAS = () => {
  return (
    <div>
      <div className="flex items-center">
        {/* <div>
          <Button className="text-black">
            <HiOutlineArrowLeft className="h-6 w-6" />
          </Button>
        </div> */}
        <div className="flex-grow">
          <Header />
        </div>
      </div>
      <SpecificNASTabs />
    </div>
  );
};

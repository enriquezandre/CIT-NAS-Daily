import { NASHeader } from "../../components/NAS/NASHeader";
import { NASTabs } from "../../components/NAS/NASTabs";

export const NASPage = () => {
  return (
    <div>
      NASPage
      <NASHeader />
      <hr className="my-5 border-t-2 border-gray-300 ml-7 mr-7" />
      <NASTabs />
    </div>
  );
};

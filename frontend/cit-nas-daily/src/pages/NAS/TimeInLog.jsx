import { NASHeader } from "../../components/NAS/NASHeader";
import { TimeLogCard } from "../../components/NAS/TimeLogCard";

export const TimeInLog = () => {
  return (
    <div>
      TimeInLog
      <NASHeader />
      <hr className="my-5 border-t-2 border-gray-300 ml-7 mr-7" />
      <TimeLogCard />
    </div>
  );
};

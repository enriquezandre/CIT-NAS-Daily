import { Header } from "../../components/Header";
import { NASTabs } from "../../components/NAS/NASTabs";

export const NASPage = () => {
  return (
    <div>
      NASPage
      <Header role={"BELDEROL, KAYE CASSANDRA"}/>
      <hr className="my-5 border-t-2 border-gray-300 ml-7 mr-7" />
      <NASTabs />
    </div>
  );
};

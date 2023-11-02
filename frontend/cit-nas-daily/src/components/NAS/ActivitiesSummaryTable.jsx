import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

export const ActivitiesSummaryTable = () => {
  // const { nasId } = useParams();
  const nasId = 1;
  const [activitySummaries, setActivitySummaries] = useState([]);

  useEffect(() => {
    const fetchNas = async () => {
      try {
        // Create an Axios instance with the Authorization header
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get(`/ActivitiesSummary/1`);
        console.log(response);
        setActivitySummaries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNas();
  }, [nasId]); // PLACEHOLDER SINCE WALA PAY ENDPOINT MAKA GET SA NAS ID

  return (
    <Table hoverable className="border">
      <Table.Head className="border">
        <Table.HeadCell className="text-center border">DATE</Table.HeadCell>
        <Table.HeadCell className="text-center border">
          Activities of the Day
        </Table.HeadCell>
        <Table.HeadCell className="text-center border">
          Skills Learned
        </Table.HeadCell>
        <Table.HeadCell className="text-center border">
          Values Learned
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {activitySummaries.map((summary) => (
          <Table.Row key={summary.id}>
            <Table.Cell className="text-center border">
              {new Date(summary.dateOfEntry).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell className="text-center border">
              {summary.activitiesOfTheDay}
            </Table.Cell>
            <Table.Cell className="text-center border">
              {summary.skillsLearned}
            </Table.Cell>
            <Table.Cell className="text-center border">
              {summary.valuesLearned}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

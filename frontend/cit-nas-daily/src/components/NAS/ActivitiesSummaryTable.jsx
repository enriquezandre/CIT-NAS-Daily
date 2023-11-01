import { Table } from "flowbite-react";

export const ActivitiesSummaryTable = () => {
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
        <Table.Row>
          <Table.Cell className="text-center border">03/06/2022</Table.Cell>
          <Table.Cell className="text-center border">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            varius sit amet mattis vulputate enim nulla aliquet.
          </Table.Cell>
          <Table.Cell className="text-center border">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            varius sit amet mattis vulputate enim nulla aliquet.
          </Table.Cell>
          <Table.Cell className="text-center border">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            varius sit amet mattis vulputate enim nulla aliquet.
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className="text-center border">03/05/2022</Table.Cell>
          <Table.Cell className="text-center border">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            varius sit amet mattis vulputate enim nulla aliquet.
          </Table.Cell>
          <Table.Cell className="text-center border">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            varius sit amet mattis vulputate enim nulla aliquet.
          </Table.Cell>
          <Table.Cell className="text-center border">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            varius sit amet mattis vulputate enim nulla aliquet.
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className="text-center border">03/04/2022</Table.Cell>
          <Table.Cell className="text-center border">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            varius sit amet mattis vulputate enim nulla aliquet.
          </Table.Cell>
          <Table.Cell className="text-center border">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            varius sit amet mattis vulputate enim nulla aliquet.
          </Table.Cell>
          <Table.Cell className="text-center border">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            varius sit amet mattis vulputate enim nulla aliquet.
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

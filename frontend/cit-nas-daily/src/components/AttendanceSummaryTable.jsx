"use client";

import { Table } from "flowbite-react";

export const AttendanceSummaryTable = () => {
  return (
    //will change to mappings if okay na ang backend
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>DATE</Table.HeadCell>
        <Table.HeadCell>TIME-IN</Table.HeadCell>
        <Table.HeadCell>TIME-OUT</Table.HeadCell>
        <Table.HeadCell>OVERTIME-IN</Table.HeadCell>
        <Table.HeadCell>OVERTIME-OUT</Table.HeadCell>
        <Table.HeadCell>APPEAL</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <Table.Row>
          <Table.Cell>03/06/2022</Table.Cell>
          <Table.Cell>9:36 AM</Table.Cell>
          <Table.Cell>12:38 PM</Table.Cell>
          <Table.Cell>NONE</Table.Cell>
          <Table.Cell>NONE</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>03/05/2022</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>ABSENT</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>
            <a
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Appeal</p>
            </a>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>03/04/2022</Table.Cell>
          <Table.Cell>9:28 AM</Table.Cell>
          <Table.Cell>12:26 PM</Table.Cell>
          <Table.Cell>NONE</Table.Cell>
          <Table.Cell>NONE</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

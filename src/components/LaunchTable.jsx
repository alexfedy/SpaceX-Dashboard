import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { columns } from "./data";

export default function LaunchTable(props) {
  const launchItems = props.launches;
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: user.links.patch.small
                ? user.links.patch.small
                : "/spacecraft.png",
            }}
            description={user.name}
            name={cellValue}
          >
            {user.name}
          </User>
        );
      case "date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {new Date(user.date_utc).toDateString()}
            </p>
          </div>
        );
      case "rocket":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {user.rocket_name}
            </p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={launchItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

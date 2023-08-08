import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { semanticColors } from "@nextui-org/theme";
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

const launchPadUrl = "https://api.spacexdata.com/v4/launchpads/";

export default function LaunchTable(props) {
  const launchItems = props.launches;

  let themeBackColor = "light";

  async function displayModal(key) {
    let theme = localStorage.getItem("theme");
    themeBackColor =
      theme == "light"
        ? semanticColors.light.background.DEFAULT
        : semanticColors.dark.background.DEFAULT;
    let launch_item = launchItems.find((l) => l.id == key);
    let launch_pad = {};
    let launchpad_res = await fetch(launchPadUrl + launch_item.launchpad);
    if (!launchpad_res.ok) {
      launch_pad = null;
    } else {
      let data = await launchpad_res.json();
      launch_pad = data;
    }
    notify(launch_pad);
  }

  const notify = (item) =>
    toast(
      (t) => (
        <div className="p-2 bg-background text-foreground">
          {!item && (
            <div>
              <p>Launch Pad could not be found.</p>
              <button
                className="bg-primary text-white rounded p-2 m-4"
                onClick={() => toast.dismiss(t.id)}
              >
                Dismiss
              </button>
            </div>
          )}
          {item && (
            <div className="space-y-1">
              <div>
                <button
                  className="bg-primary text-white rounded p-2 mt-4"
                  onClick={() => toast.dismiss(t.id)}
                >
                  Dismiss
                </button>
              </div>
              <h1 className="text-lg md:text-2xl">Launch Pad details</h1>
              <hr />
              <br />
              {item.status == "active" ? (
                <span className="bg-success text-background rounded-xl px-2">
                  Active
                </span>
              ) : (
                <span className="bg-danger text-background rounded-lg p-1">
                  Inactive
                </span>
              )}
              <span className="ml-2 text-default-400">{item.name}</span>
              <h2 className="md:text-xl text-primary">{item.full_name}</h2>
              <div className="space-y-2">
                <p>
                  <span className="text-default-400">Location: </span>
                  {item.locality}, {item.region}
                </p>
                <p>
                  <span className="text-default-400">Launch Attempts: </span>
                  <span>{item.launch_attempts}</span>
                </p>
                <p>
                  <span className="text-default-400">Launch Successes: </span>
                  <span className="text-success">{item.launch_successes}</span>
                </p>
              </div>

              {/* <p>{item.details}</p> */}
              <img
                src={item.images.large}
                className="object-cover bg-no-repeat"
              />
            </div>
          )}
        </div>
      ),
      {
        style: {
          padding: "5px",
          backgroundColor: themeBackColor,
        },
        duration: 30000,
      }
    );

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col justify-center items-center text-center gap-1 md:flex md:flex-row md:justify-start">
            {" "}
            <User
              avatarProps={{
                radius: "xl",
                src: user.links.patch.small
                  ? user.links.patch.small
                  : "/spacexLogo.png",
              }}
            ></User>
            {user.name ? user.name : "Not found"}
          </div>
        );
      case "date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.date_utc
                ? new Date(user.date_utc).toDateString()
                : "Undetermined"}
            </p>
          </div>
        );
      case "rocket":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {user.rocket_name ? user.rocket_name : "Unknown"}
            </p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Table
        aria-label="Example table with custom cells"
        selectionMode="single"
        onRowAction={(key) => displayModal(key)}
      >
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

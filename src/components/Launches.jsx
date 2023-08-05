import React from "react";
import { Spinner } from "@nextui-org/react";
import LaunchTable from "./LaunchTable";

const Launches = (props) => {
  let launchData = props.launches;
  const header = props.header;
  const rocketData = props.rockets;

  if (
    launchData &&
    launchData.length > 0 &&
    rocketData &&
    rocketData.length > 0
  ) {
    launchData = launchData.map((launch) => {
      let temp_name = props.rockets.find((r) => r.id == launch.rocket);
      temp_name = temp_name ? temp_name.name : "Loading...";
      return {
        ...launch,
        rocket_name: temp_name,
      };
    });
  } else {
    return (
      <div className="mt-2 w-full">
        <Spinner />
        <h1>Loading data...</h1>
      </div>
    );
  }

  return (
    <div className="mt-2 w-full">
      <>
        <div className="p-4 my-2 bg-primary text-white rounded-lg">
          {header}
        </div>
      </>
      {launchData.length == 0 && <p>Could not load launch data.</p>}
      {rocketData.length == 0 && <p>Could not load rocket data.</p>}
      {launchData.length > 0 && rocketData.length > 0 && (
        <LaunchTable launches={launchData} rockets={rocketData} />
      )}
    </div>
  );
};

export default Launches;

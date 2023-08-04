import React, { useState, useEffect } from "react";
import LaunchTable from "./LaunchTable";

const Launches = (props) => {
  let launchData = props.launches;
  const header = props.header;
  const rocketData = props.rockets;

  launchData = launchData.map((launch) => {
    let temp_name = props.rockets.find((r) => r.id == launch.rocket);
    temp_name = temp_name ? temp_name.name : "Loading...";
    return {
      ...launch,
      rocket_name: temp_name,
    };
  });

  return (
    <div className="mt-2 w-full">
      <>
        <div className="p-4 my-2 bg-primary text-white rounded-lg">
          {header}
        </div>
      </>
      {launchData && rocketData && (
        <LaunchTable launches={launchData} rockets={rocketData} />
      )}
    </div>
  );
};

export default Launches;

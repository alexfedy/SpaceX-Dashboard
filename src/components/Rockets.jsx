// import Card from "./Card";
import React from "react";
import RocketCard from "./RocketCard";

const Rockets = (props) => {
  const rocketData = props.rockets;
  return (
    <>
      <h2 className="text-xl text-primary">
        Click each card for more information
      </h2>
      <div className="mt-2 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {rocketData.length > 0 && (
          <>
            {rocketData.map((rocket) => (
              <RocketCard key={rocket.id} rocket={rocket} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Rockets;

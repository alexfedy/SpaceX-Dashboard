import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Skeleton,
} from "@nextui-org/react";
import Launches from "./Launches";
import Rockets from "./Rockets";
import { ArrowComponent } from "./ArrowComponent";

const nextLaunchUrl = "https://api.spacexdata.com/v5/launches/next";
const latestLaunchUrl = "https://api.spacexdata.com/v5/launches/latest";
const upcomingLaunchesUrl = "https://api.spacexdata.com/v5/launches/upcoming";
const rocketUrl = "https://api.spacexdata.com/v4/rockets";

const Dashboard = () => {
  const [launchType, setLaunchType] = useState("Upcoming Launches");
  const [launchUrl, setLaunchUrl] = useState(upcomingLaunchesUrl);
  const [launchData, setlaunchData] = useState([]);
  const [rocketData, setRocketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLaunchData() {
      let launch_res = await fetch(launchUrl);
      if (!launch_res.ok) {
        setlaunchData(null);
      } else {
        let data = await launch_res.json();
        if (!Array.isArray(data)) {
          data = [data];
        }
        setlaunchData(data);
      }
    }
    fetchLaunchData();

    // fetch(launchUrl)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     if (!Array.isArray(data)) {
    //       data = [data];
    //     }
    //     setlaunchData(data);
    //   });

    async function fetchRocketData() {
      let rocket_res = await fetch(rocketUrl);
      if (!rocket_res.ok) {
        setRocketData(null);
      } else {
        let data = await rocket_res.json();
        if (!Array.isArray(data)) {
          data = [data];
        }
        setRocketData(
          data.map((rocket) => {
            return {
              id: rocket.id,
              images: rocket.flickr_images,
              name: rocket.name,
              active: rocket.active,
              cost: rocket.cost_per_launch,
              success: rocket.success_rate_pct,
              first_flight: rocket.first_flight,
              country: rocket.country,
              description: rocket.description,
              height_m: rocket.height.meters,
              height_f: rocket.height.feet,
              diameter_m: rocket.diameter.meters,
              diameter_f: rocket.diameter.feet,
              mass_kg: rocket.mass.kg,
              mass_lb: rocket.mass.lb,
              stages: rocket.stages,
              boosters: rocket.boosters,
              wiki: rocket.wikipedia,
            };
          })
        );
      }
    }

    fetchRocketData();

    // fetch(rocketUrl)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setRocketData(
    //       data.map((rocket) => {
    //         return {
    //           id: rocket.id,
    //           images: rocket.flickr_images,
    //           name: rocket.name,
    //           active: rocket.active,
    //           cost: rocket.cost_per_launch,
    //           success: rocket.success_rate_pct,
    //           first_flight: rocket.first_flight,
    //           country: rocket.country,
    //           description: rocket.description,
    //           height_m: rocket.height.meters,
    //           height_f: rocket.height.feet,
    //           diameter_m: rocket.diameter.meters,
    //           diameter_f: rocket.diameter.feet,
    //           mass_kg: rocket.mass.kg,
    //           mass_lb: rocket.mass.lb,
    //           stages: rocket.stages,
    //           boosters: rocket.boosters,
    //           wiki: rocket.wikipedia,
    //         };
    //       })
    //     );
    //   });
    setIsLoading(false);
  }, [launchUrl]);
  return (
    <>
      {isLoading && (
        <>
          <Skeleton className="rounded-lg w-48 h-6 mb-4" />
          <Skeleton className="rounded-lg w-28 h-6 mb-4" />
          <Skeleton className="rounded-lg w-full h-6 mb-4" />
          {Array.from({ length: 6 }, (_, i) => i + 1).map((id) => (
            <div key={id} className="my-2 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          ))}
        </>
      )}
      {!isLoading && (
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" size="lg">
            <Tab key="launches" title="Launches">
              <>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      color="primary"
                      endContent={<ArrowComponent />}
                    >
                      Launch Type
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      key="upcoming"
                      onClick={() => {
                        setLaunchUrl(upcomingLaunchesUrl);
                        setLaunchType("Upcoming Launches");
                      }}
                    >
                      Upcoming Launches
                    </DropdownItem>
                    <DropdownItem
                      key="next"
                      onClick={() => {
                        setLaunchUrl(nextLaunchUrl);
                        setLaunchType("Next Launch");
                      }}
                    >
                      Next Launch
                    </DropdownItem>
                    <DropdownItem
                      key="latest"
                      onClick={() => {
                        setLaunchUrl(latestLaunchUrl);
                        setLaunchType("Latest Launch");
                      }}
                    >
                      Latest Launch
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                {launchData && rocketData ? (
                  launchData.length > 0 &&
                  rocketData.length > 0 && (
                    <Launches
                      launches={launchData}
                      header={launchType}
                      rockets={rocketData}
                    />
                  )
                ) : (
                  <p>Error fetching launch data.</p>
                )}
              </>
            </Tab>
            <Tab key="rockets" title="Rockets">
              {rocketData ? (
                rocketData.length > 0 && <Rockets rockets={rocketData} />
              ) : (
                <p>Error fetching rocket data.</p>
              )}
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Dashboard;

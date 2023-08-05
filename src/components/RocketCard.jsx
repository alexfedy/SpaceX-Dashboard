// import Card from "./Card";
import React from "react";
import { Card, Image, CardHeader, CardBody } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";

const RocketCard = (props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const rocketData = props.rocket;
  return (
    <>
      <Card
        className="border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
        isPressable
        isHoverable
        onPress={onOpen}
      >
        <CardHeader>
          <h1 className="text-xl font-medium">
            {rocketData.name ? rocketData.name : "No name"}
          </h1>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-6">
              <Image
                alt="Rocket image"
                className="object-cover"
                height={200}
                shadow="md"
                src={
                  rocketData.images[0]
                    ? rocketData.images[0]
                    : "/spacexLogo.png"
                }
                width="100%"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col col-span-6">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90 mb-3">
                    {rocketData.active ? (
                      <Chip color="success" variant="bordered">
                        Active
                      </Chip>
                    ) : (
                      <Chip color="danger" variant="bordered">
                        Inactive
                      </Chip>
                    )}
                  </h3>
                  <p className="text-small text-foreground/80">
                    Cost per launch:{" "}
                    <span className="text-success">
                      ${rocketData.cost ? rocketData.cost : "Unknown cost"}
                    </span>
                  </p>
                  <p className="text-small text-foreground/80">
                    Success Rate:{" "}
                    <span className="text-primary">
                      {rocketData.success
                        ? rocketData.success
                        : "Unknown success rate"}
                      %
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-3 gap-1">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-small">First Flight</p>
                    <p className="text-small text-foreground/50">
                      {rocketData.first_flight
                        ? rocketData.first_flight
                        : "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className="text-small">Country</p>
                    <p className="text-small text-foreground/50">
                      {rocketData.country ? rocketData.country : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-center"></div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="transparent">
        <ModalContent>
          {(onClose) => (
            <>
              {rocketData.name ? (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {rocketData.name}
                  </ModalHeader>
                  <ModalBody>
                    <p>{rocketData.description}</p>
                    <p>Stats:</p>
                    <p>
                      <span className="mr-2 text-primary">Height:</span>
                      {rocketData.height_m}m/{rocketData.height_f}ft
                    </p>
                    <p>
                      <span className="mr-2 text-primary">Diameter:</span>
                      {rocketData.diameter_m}m/{rocketData.diameter_f}ft
                    </p>
                    <p>
                      <span className="mr-2 text-primary">Mass:</span>
                      {rocketData.mass_kg}kg/{rocketData.mass_lb}lb
                    </p>
                    <p>
                      <span className="mr-2 text-primary">Stages:</span>
                      {rocketData.stages}
                    </p>
                    <p>
                      <span className="mr-2 text-primary">Boosters:</span>
                      {rocketData.boosters}
                    </p>
                    <p>
                      <a
                        className="mr-2 text-primary underline"
                        href={rocketData.wiki}
                        target="_blank"
                      >
                        Wikipedia Link
                      </a>
                    </p>
                  </ModalBody>
                </>
              ) : (
                <p className="p-4">Could not load rocket description.</p>
              )}
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RocketCard;

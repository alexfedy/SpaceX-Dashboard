// import Card from "./Card";
import React, { useState } from "react";
import { Card, Image, CardHeader, CardBody, Skeleton } from "@nextui-org/react";
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

const Rockets = (props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rocketModal, setRocketModal] = useState({});
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
              <div key={rocket.id}>
                <Card
                  className="border-none bg-background/60 dark:bg-default-100/50"
                  shadow="sm"
                  isPressable
                  isHoverable
                  onPress={onOpen}
                  onClick={() => setRocketModal(rocket)}
                >
                  <CardHeader>
                    <h1 className="text-xl font-medium">{rocket.name}</h1>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                      <div className="relative col-span-6 md:col-span-6">
                        <Image
                          alt="Rocket image"
                          className="object-cover"
                          height={200}
                          shadow="md"
                          src={rocket.images[0]}
                          width="100%"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex flex-col col-span-6">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-0">
                            <h3 className="font-semibold text-foreground/90 mb-3">
                              {rocket.active ? (
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
                                ${rocket.cost}
                              </span>
                            </p>
                            <p className="text-small text-foreground/80">
                              Success Rate:{" "}
                              <span className="text-primary">
                                {rocket.success}%
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col mt-3 gap-1">
                          <div className="flex flex-col gap-4">
                            <div>
                              <p className="text-small">First Flight</p>
                              <p className="text-small text-foreground/50">
                                {rocket.first_flight}
                              </p>
                            </div>
                            <div>
                              <p className="text-small">Country</p>
                              <p className="text-small text-foreground/50">
                                {rocket.country}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-center"></div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              backdrop="transparent"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      {rocketModal.name}
                    </ModalHeader>
                    <ModalBody>
                      <p>{rocketModal.description}</p>
                      <p>Stats:</p>
                      <p>
                        <span className="mr-2 text-primary">Height:</span>
                        {rocketModal.height_m}m/{rocketModal.height_f}ft
                      </p>
                      <p>
                        <span className="mr-2 text-primary">Diameter:</span>
                        {rocketModal.diameter_m}m/{rocketModal.diameter_f}ft
                      </p>
                      <p>
                        <span className="mr-2 text-primary">Mass:</span>
                        {rocketModal.mass_kg}kg/{rocketModal.mass_lb}lb
                      </p>
                      <p>
                        <span className="mr-2 text-primary">Stages:</span>
                        {rocketModal.stages}
                      </p>
                      <p>
                        <span className="mr-2 text-primary">Boosters:</span>
                        {rocketModal.boosters}
                      </p>
                      <p>
                        <a
                          className="mr-2 text-primary underline"
                          href={rocketModal.wiki}
                          target="_blank"
                        >
                          Wikipedia Link
                        </a>
                      </p>
                    </ModalBody>
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
        )}
      </div>
    </>
  );
};

export default Rockets;

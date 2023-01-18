import express from "express";
import path from "path";
import cors from "cors";
import { getDrones } from "./functions/getDrones.js";
import { checkViolation } from "./functions/checkViolation.js";
import { getDistance } from "./functions/getDistance.js";
import { checkViolatorExists } from "./functions/checkViolatorExists.js";
import { getPilot } from "./functions/getPilot.js";
import { getDroneBySerial } from "./functions/getDroneBySerial.js";
import { config } from "./config.js";

const __dirname = path.resolve();
const PORT = process.env.PORT || 3001;
const app = express();
let drones = []; // Master list of drones

app.use(cors());
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "ui/build")));

app.get("/api", (req, res) => {
  res.json(drones);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "ui/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/**
 * Get new drones every 2 secondes
 */
setInterval(
  () =>
    getDrones(config.dronesURL)
      .then((data) => {
        // Get drones in a json format
        let violators = data.filter((violator) =>
          checkViolation(
            violator.positionX,
            violator.positionY,
            config.circleX,
            config.circleY,
            config.circleRadius
          )
        ); // To verify is existing violators(drones in the no-fly zone)
        let violatorDist = violators.map((newViolator) => {
          return {
            // Add distance from the nest to every drone
            ...newViolator,
            distance: getDistance(
              newViolator.positionX,
              newViolator.positionY,
              config.circleX,
              config.circleY
            ),
          };
        });

        return violatorDist;
      })
      .then((violators) => {
        // get an array of violators, wich doesn't exist in the drons list
        let newViolators = violators.filter(
          (newViolator) =>
            !checkViolatorExists(drones, newViolator.serialNumber)
        );

        // get an array of existing drones
        let oldViolators = violators.filter((oldViolator) =>
          checkViolatorExists(drones, oldViolator.serialNumber)
        );

        // Form an array of pilot's requests for new violating drones
        const pilotReqs = newViolators.map((violator) => {
          return getPilot(config.pilotsURL, violator.serialNumber) // Request pilot data by drone's serial number
            .then((pilot) => {
              return { ...violator, pilot }; // Add pilot data to drone info
            });
        });

        // Get pilots for violating drones
        Promise.all(pilotReqs).then((pilots) => {
          // Filter out drones older than 10 minutes.
          let dronesTenMin = drones.filter(
            (drone) => drone.time.getTime() > Date.now() - 60 * 10 * 1000
          );

          /**
           * Update distance and time for existing drones
           * if the distance shortened
           */
          oldViolators.forEach((violator) => {
            let drone = getDroneBySerial(dronesTenMin, violator.serialNumber);
            if (drone.distance > violator.distance) {
              drone.distance = violator.distance;
              drone.time = violator.time;
            }
          });

          // Update Master list of drones with newly collected ones
          drones = dronesTenMin.concat(pilots);
          console.log("drones", drones.length);
        });
      }),
  config.serveriInterval
);

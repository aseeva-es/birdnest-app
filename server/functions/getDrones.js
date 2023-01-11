import fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";

/**
 * Get drones 
 * returns an array of violating drones with needed information.
 * @returns {JSON} array of drones
 */
export function getDrones(url) {
  const options = {
    ignoreAttributes: false,
  };
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("HTTP Request failed!");
      return response.text();
    })
    .then((data) => {
      let xml = new XMLParser(options).parse(data); // Convert xml format data to json object
      let capture = xml.report.capture;
      let drones = capture.drone;
      // Add "last seen" time to every drone in the array.
      let dronesInfo = drones.map((drone) => {
        let dronInfo = {
          ...drone,
          time: new Date(capture["@_snapshotTimestamp"]),
        };
        return dronInfo;
      });
      return dronesInfo;
    })
    .catch((err) => {
      console.error(err.message);
      return [];
    });
}

/** 
 * Check if the drone violates the no-fly zone.
 * 
 * @param {Number} droneX - drone's coordinate X
 * @param {Number} droneY - drone's coordinate Y
 * @param {Number} circleX - drone's coordinate X
 * @param {Number} circleY - drone's coordinate Y
 * @param {Number} radius - NFZ radius
 * @returns {Boolean} - true, if the drone violates the NFZ
 */

import {getDistance} from "./getDistance.js";

export function checkViolation(droneX, droneY, circleX, circleY, radius) {
    if (getDistance(droneX, droneY, circleX, circleY) < radius) {
        return true;
    }
    return false;
}
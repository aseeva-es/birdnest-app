/**
 * Verify if the drone with the given serial
 * is already on the list.
 * 
 * @param {Array} drones - the existing violators
 * @param {String} serial - drone's serial number
 * @returns {Boolean} - true, if the drone is in the list
 */

export function checkViolatorExists(drones, serial) {
   let exist = drones.filter(drone => drone.serialNumber === serial);
   if (exist.length > 0) return true;
   else return false;
}
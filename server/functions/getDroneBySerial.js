/**
 * Get the drone by serial number
 * @param {Array} drones array of existing drones
 * @param {String} serial the drone's serial number
 * @returns the drone info object if found, or null
 */

export function getDroneBySerial(drones,serial){
    let found = drones.filter(drone => drone.serialNumber === serial);
    return found.length > 0 ? found[0] : null;
}
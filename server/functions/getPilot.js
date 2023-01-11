/**
 * Get pilot using the drone's serial number. 
 * A json object is being returned by the fetch request.
 */
import fetch from 'node-fetch';

export function getPilot(url, serialNumber) {
    return fetch(url + serialNumber)
    .then((response) => {
        if (!response.ok) throw new Error("HTTP Request failed!");
      return response.json();
        
    })
    .catch((err) => {
        console.error(err.message);
        return {};
      });
    
    
}
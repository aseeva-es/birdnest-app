/**
 * Get list of drones from an API endpoint
 * @returns {JSON} array of drone objects from the server
 */

export default function getData(url) {
    return fetch(url)
    .then((response) => {
        if (!response.ok) throw new Error("HTTP Request failed!");
      return response.json();
        
    })
    .catch((err) => {
        console.error(err.message);
        return [];
      });
    
}
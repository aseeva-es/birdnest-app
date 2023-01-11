/**
 * Gets distance between two coordinates in 2D space
 *  
 * @param {Number} a - first coordinate X
 * @param {Number} b - first coordinate Y
 * @param {Number} x - second coordinate X
 * @param {Number} y - second coordinate Y
 * @returns {Number} distance between coordinates
 */
export function getDistance (a, b, x, y) {
    a = Number(a);
    b = Number(b);
    if (!a || !b) return NaN;
    const dist = Math.sqrt(Math.abs((a - x) * (a - x) + (b - y) * (b - y)));
    
    return dist;
}
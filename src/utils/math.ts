/**
 * Returns a random integer between the provided range where
 * the max is non-inclusive.
 */
const random = (
  min: number, max: number
) => Math.floor(Math.random() * (max - min) + min);

export { random };

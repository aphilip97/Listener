import { parseTimestamp } from '../utils/parseTimestamp';
import { random } from '../utils/math';

describe('parseTimestamp function', () => {

  test('Can parse correctly formatted input', () => {

    const hours = random(0, 100);
    const minutes = random(0, 60);
    const seconds = random(0, 60);

    const target = (hours * 60 * 60) + (minutes * 60) + seconds;

    const timestamp = `${hours}:${minutes}:${seconds}`;
    const result = parseTimestamp(timestamp);

    expect(result).toBe(target);

  });

  test('Throws error for bad input', () => {

    const testWith = (badInput: string) => {
      try {
        parseTimestamp(badInput);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(
          err.message
        ).toBe(
          `Failed to parse timestamp - ${badInput}.`
        );
      }
    };

    // TODO: Update to test all bad inputs ... within reason
    testWith('0:60:00');
    testWith('0:00:60');
    testWith('0:04,12');
    testWith('0,04:12');

  });

});

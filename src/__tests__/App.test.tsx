import { fireEvent, render } from '@testing-library/react';
import "@testing-library/jest-dom";

import App from '../App';
import TestingData from './setup';
import { parseTimestamp } from '../utils/parseTimestamp';

describe('<App />', () => {

  test('matches snapshot', () => {

    const component = render(
      <App listen={TestingData} />,
    );

    expect(component.container).toMatchSnapshot();

  });

  test('skips to correct time when a track is clicked', () => {

    const { queryByTestId, queryAllByRole } = render(
      <App listen={TestingData} />,
    );

    const audioPlayer = queryByTestId(
      'elem_audio',
    ) as HTMLAudioElement;

    audioPlayer.play = jest.fn();

    const tracks = queryAllByRole(
      'button',
    ) as HTMLButtonElement[];

    if (TestingData.tracklist[1]) {

      const timeToSkipTo = parseTimestamp(
        TestingData.tracklist[1].timestamp ?? '05:45',
      );

      if (tracks[1]) {
        fireEvent.click(tracks[1]);
        expect(audioPlayer.currentTime).toEqual(timeToSkipTo);
      }

    }

  });

  test('shows error message on track for bad timestamp', () => {

    const _testingData = {
      ...TestingData,
      tracklist: [
        { name: 'Test song 1', timestamp: '0:60:00' },
        { name: 'Test song 2', timestamp: '0:00:60' },
        { name: 'Test song 3', timestamp: '0:04,12' },
        { name: 'Test song 4', timestamp: '0,04:12' },
        ...TestingData.tracklist,
      ],
    };

    const { queryAllByRole } = render(
      <App listen={_testingData} />,
    );

    const tracks = queryAllByRole(
      'button',
    ) as HTMLButtonElement[];

    expect(
      tracks.length,
    ).toEqual(
      _testingData.tracklist.length,
    );

    expect(
      tracks[0],
    ).toHaveTextContent(
      'Failed to parse timestamp.',
    );

  });

  test('ignores click on track with bad timestamp', () => {

    const _testingData = {
      ...TestingData,
      tracklist: [
        // Add an invalid timestamp to the tracklist
        { name: 'Test song 1', timestamp: '0:60:00' },
        ...TestingData.tracklist,
      ],
    };

    const { queryByTestId, queryAllByRole } = render(
      <App listen={_testingData} />,
    );

    const audioPlayer = queryByTestId(
      'elem_audio',
    ) as HTMLAudioElement;

    // Mock play function as the audio element is in a test
    // environment
    audioPlayer.play = jest.fn();

    const tracks = queryAllByRole(
      'button',
    ) as HTMLButtonElement[];

    // Get the time (in seconds) for the 2nd valid song.
    const secondTrackTime = parseTimestamp(
      TestingData.tracklist[1]?.timestamp ?? '05:45',
    );

    /*
      Click on a track with a valid timestamp.
      In this case the second one so that the current time is
      not 0 as the first song with a valid timestamp would start
      at 00:00.
    */
    if (tracks[2]) fireEvent.click(tracks[2]);

    expect(audioPlayer.currentTime).toBe(secondTrackTime);

    // Click on the invalid track.
    // Audio player's current time should not change.
    if (tracks[0]) fireEvent.click(tracks[0]);

    expect(audioPlayer.currentTime).toBe(secondTrackTime);

  });

});

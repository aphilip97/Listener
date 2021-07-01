import { useRef } from 'react';
import styled, { css } from 'styled-components';
import { Listen, ExtensionsToMimeTypesMap } from '../types';
import { parseTimestamp } from './utils/parseTimestamp';

const SplitView = styled.main`
  height: 100%;
  display: flex;
  place-content: center;
  align-items: center;
  color: white;
`;

const TrackList = styled.section`
  height: 100vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  place-content: center flex-start;
  align-items: center;
  overflow-y: auto;
  background-color: #222222;
`;

const Player = styled.section`
  height: 100vh;
  width: 50vw;
  display: flex;
  place-content: center;
  align-items: center;
  background-color: #111111;
`;

const Heading = styled.h1`
  width: calc(100% - 2rem);
  margin: 0;
  padding: 1rem 1rem 1rem 1rem;
  background-color: #333333;
`;

const Track = styled.button`
  background: none #444444;
  border: none;
  width: 100%;
  margin: 0px;
  padding: 1rem 1rem 1rem 1rem;
  transition: background-color 0.1s ease-in-out;
  cursor: pointer;

  :hover {
    background-color: #777777;
  }
`;

const TrackText = styled.span<{ error?: true | false }>`
  font: 400 1.2rem Nunito;
  color: #ffffff;
  display: block;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  ${(props) => {
    return props.error && css`
      color: #ff3939;
    `
  }}
`;

const map: ExtensionsToMimeTypesMap = {
  webm: 'audio/webm',
  m4a: 'audio/x-m4a',
  mp3: 'audio/mp3',
};

interface AppProps {
  listen: Listen;
}

const App: React.FC<AppProps> = ({ listen }) => {

  document.body.style.fontFamily = 'Nunito';
  document.body.style.margin = '0px';
  document.body.style.boxSizing = 'border-box';
  document.body.style.height = '100vh';

  const audioPlayer = useRef<HTMLAudioElement | null>(null);

  const tracks = listen.tracklist.map((track, index) => {

    try {

      const timeToSkipTo = parseTimestamp(track.timestamp);

      const handleClick = async () => {
        if (audioPlayer.current !== null) {
          audioPlayer.current.currentTime = timeToSkipTo;
          await audioPlayer.current.play();
        }
      };

      return (
        <Track
          key={index}
          onClick={handleClick}
          role="button"
        >
          <TrackText>{track.name}</TrackText>
        </Track>
      );

    } catch (err) {

      return (
        <Track
          key={index}
          onClick={() => { }}
          role="button"
        >
          <TrackText error>Failed to parse timestamp.</TrackText>
        </Track>
      );

    }

  });

  return (
    <SplitView>
      <TrackList>
        <Heading
          data-testid="playlist_title"
        >{listen.title}</Heading>
        {...tracks}
      </TrackList>
      <Player>
        <audio
          data-testid="elem_audio"
          controls
          autoPlay
          ref={audioPlayer}
        >
          <source src={listen.src} type={map[listen.ext]} />
        </audio>
      </Player>
    </SplitView>
  );

};

export default App;

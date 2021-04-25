import styled from 'styled-components';
import { Listen, ExtensionsToMimeTypesMap } from '../types';

const Greeting = styled.h1`
  color: hsl(0, 0%, 100%);
`;

const Data = styled.pre`
  color: hsl(0, 0%, 100%);
`;

const map: ExtensionsToMimeTypesMap = {
  webm: 'audio/webm',
  m4a: 'audio/x-m4a',
};

interface AppProps {
  listen: Listen;
}

const App: React.FC<AppProps> = ({ listen }) => {
  return (
    <>
      <Greeting>Listener</Greeting>
      <audio controls autoPlay>
        <source src={listen.src} type={map[listen.ext]} />
      </audio>
      <Data>{JSON.stringify(listen, null, 2)}</Data>
    </>
  );
};

export default App;

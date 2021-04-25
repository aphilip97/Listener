import { render } from '@testing-library/react';
import "@testing-library/jest-dom";

import App from '../App';

test('<App /> matches snapshot', () => {

  const component = render(
    <App
      listen={{
        title: '',
        src: '',
        ext: 'webm',
        tracklist: [],
      }}
    />
  );

  expect(component.container).toMatchSnapshot();

});

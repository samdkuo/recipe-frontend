
'use strict';
import renderer from 'react-test-renderer';
import { Button } from '../Button/index';

it('renders correctly', () => {
  const tree = renderer
    .create(<Button> Shopping Lists  </Button>)
});
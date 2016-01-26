import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Submission from '../../components/Submission';

function setup() {
  let props = {
    item: expect.createSpy()
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Submission {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('Submission', () => {
    it('should render', () => {
      const { output } = setup();
      expect(output.type).toBe('div');
    });
  });
});

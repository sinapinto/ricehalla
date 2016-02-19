import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Button from '../../src/components/Button';

function setup() {
  const props = { item: expect.createSpy() };
  const renderer = TestUtils.createRenderer();
  renderer.render(<Button {...props} />);
  const output = renderer.getRenderOutput();
  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('Button', () => {
    it('should render correctly', () => {
      const { output } = setup();
      expect(output.type).toBe('button');
      expect(output.props.type).toBe('submit');
    });
  });
});

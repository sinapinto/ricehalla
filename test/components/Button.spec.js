import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Button from '../../src/components/Button';

function setup() {
  const renderer = TestUtils.createRenderer();
  const props = {
    item: expect.createSpy(),
  };
  renderer.render(
    <Button {...props}>
      woo
    </Button>
  );
  const output = renderer.getRenderOutput();
  return {
    props,
    output,
    renderer
  };
}

describe('Button', () => {
  it('should render', () => {
    const { output } = setup();
    expect(output.type).toBe('button');
    expect(output.props.type).toBe('submit');
    expect(output.props.children).toBe('woo');
  });
});

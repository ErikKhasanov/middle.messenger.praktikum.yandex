import Block from 'core/Block';

const MOCK_PROPS = {
  first: ['first'],
  second: true,
};

describe('test Block class', () => {
  let testComponent: Block;
  beforeEach(() => {
    class TestComponent extends Block<{}> {
      static componentName = 'TestComponent';

      render() {
        return '<div>Test</div>';
      }
    }
    testComponent = new TestComponent(MOCK_PROPS);
  });

  it('Should render HTML equal', () => {
    expect(testComponent.getContent().outerHTML).toBe('<div>Test</div>');
  });

  it('Should check initial props are correct', () => {
    expect(testComponent.props).toEqual(MOCK_PROPS);
  });

  it('Should update props', () => {
    const newProps = {
      test: 'test',
    };
    testComponent.setProps(newProps);
    expect(testComponent.props).toEqual(Object.assign(MOCK_PROPS, newProps));
  });
});

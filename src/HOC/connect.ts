import { Store, BlockClass } from 'core';

type Iconnect = {
  store: AppState;
};

function connect<P extends Iconnect>(Component: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends Component<P> {
    constructor(props: P) {
      super(props);
      Store.on('changed', () => {
        this.setProps({ ...Store.getState() });
      });
    }
  };
}

export default connect;

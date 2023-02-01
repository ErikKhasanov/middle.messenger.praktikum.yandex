import { BlockClass } from 'core';
import { CoreRouter } from 'router/Router.interface';
import { PathRouter } from 'router/pathRouter';

type WithRouterProps = { router: CoreRouter };

export default function withRouter<P extends WithRouterProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    constructor(props: P) {
      super({ ...props, router: PathRouter.getInstance() });
    }
  };
}

import { BlockConstructable } from 'core/Block';
import { AppStore } from 'core/Store';
import isEqual from 'utils/isEqual';

// eslint-disable-next-line no-unused-vars
type TExtractStateFuns = (state: AppState) => { [key: string]: unknown };

function connectStore(mapStateToProps: TExtractStateFuns) {
  return <P>(Component: BlockConstructable<P>) =>
    class extends Component {
      constructor(props: P) {
        const currentStore = AppStore.getState();
        const state = mapStateToProps(currentStore);
        super({ ...props, ...state });
        AppStore.on('changed', (prevState, nextState) => {
          const prevStateObj = mapStateToProps(prevState);
          const nextStateObj = mapStateToProps(nextState);
          if (!isEqual(prevStateObj, nextStateObj)) {
            this.setProps({ ...nextStateObj });
          }
        });
      }
    };
}

export default connectStore;

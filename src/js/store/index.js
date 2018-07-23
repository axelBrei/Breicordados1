import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

let composeEnhancers = composeWithDevTools({
    realtime: true,
    name: 'Your Instance Name',
    hostname: '192.168.2.1',
    port: 8081,
});
const store = createStore(
    rootReducer,
        applyMiddleware(thunkMiddleware),
);
export default store;
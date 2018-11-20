
import createHistory from 'history/createBrowserHistory';
import { routerReducer } from 'react-router-redux';
import categorys from '../reducers/Categorys';
import recipes from '../reducers/Recipes';
import articles from '../reducers/Articles';
import { routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';


export const history = createHistory();

export const middleware = routerMiddleware(history);

const store = createStore(combineReducers({
    categorys,
    recipes,
    articles,
    router: routerReducer
}), composeWithDevTools( applyMiddleware(middleware, ReduxThunk)));

export default store;

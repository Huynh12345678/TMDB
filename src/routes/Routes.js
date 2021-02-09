import { Suspense } from 'react';
import {
    Switch,
    Route, Redirect
} from "react-router-dom";
import * as Page from '../constants/AllRoutes';
import Dots from './../components/Loading/Dots';

const Routes = () => {
    return (
        <Suspense fallback={<Dots />}>
            <Switch>
                <Route exact path="/" component={Page.Home}></Route>
                <Route path="/:mediaType/:id-:title/videos/:type" component={Page.Videos}></Route>
                <Route path="/:mediaType/:id-:title/images/:type" component={Page.Images}></Route>
                <Route path="/company/:id" component={Page.Company}></Route>
                <Route path="/collection/:id" component={Page.Collection}></Route>
                <Route path="/tv/:id-:title/cast" component={Page.PeopleTv}></Route>
                <Route path="/tv/:id-:title" component={Page.Tv}></Route>
                <Route path="/person/:id-:name" component={Page.Person}></Route>
                <Route path="/movie/:id-:title/cast" component={Page.People}></Route>
                <Route path="/movie/:id-:title" component={Page.Movie}></Route>
                <Route path="/keyword/:id-:name" component={Page.Keyword}></Route>
                <Route path="/search/:type/:query/:page" component={Page.Search}></Route>
                <Route path="/:type/:page" component={Page.Popular}></Route>
                <Route path="/login" component={Page.Login}></Route>
                <Route path="/signup" component={Page.Signup}></Route>
                <Route path="*" component={Page.Error}></Route>
            </Switch>
        </Suspense >
    );
};

export default Routes;
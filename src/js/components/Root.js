import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './categoryes/sideBar/Header';
import NewCategory from './categoryes/NewCategory';
import Index from './Index';
import UpdateRecipe from './recipes/formLogic/UpdateRecipe';
import NewRecipe from './recipes/formLogic/NewRecipe';
import NewArticle from './articles/formsLogic/NewArticle';
import UpdateArticle from './articles/formsLogic/UpdateArticle';
import RecipesContent from './recipes/RecipesContent';
import ArticlesContent from './articles/ArticlesContent';

const Root = () => (
    <div className='allContent'>
        <Header/>
        <Switch>
            <Route exact path='/Category/:id/Content' component={Index}/>
            <Route exact path='/UpdateRecipe/:id/OfCategory/:categoryId' component={UpdateRecipe}/>
            <Route exact path='/UpdateArticle/:id/OfCategory/:categoryId' component={UpdateArticle}/>
            <Route exact path='/NewCategory/:id' component={NewCategory}/>
            <Route exact path='/NewArticle/:id' component={NewArticle}/>
            <Route exact path='/NewRecipe/:id' component={NewRecipe}/>
            <Route exact path='/ContentInfo/:id/Articles' component={ArticlesContent}/>
            <Route exact path='/ContentInfo/:id/Recipe' component={RecipesContent}/>
        </Switch>
    </div>
);

export default Root;

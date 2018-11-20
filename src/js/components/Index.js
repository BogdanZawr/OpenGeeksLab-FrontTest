import React from 'react';
import { connect } from 'react-redux';
import { asyncDeleteRecipe, asyncGetCategoryRecept } from '../actions/recipes';
import { asyncNestedCategoriesList } from '../actions/categoryes';
import { asyncDeleteArticle, asyncGetCategoryArticle } from '../actions/articles';
import Breadcrumbs from './categoryes/Breadcrumbs';
import ArticleCard from './articles/Articles';
import Recipes from './recipes/Recipes';

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => {
    return {
        asyncDeleteRecipe: (id) => {
            dispatch(asyncDeleteRecipe(id));
        },
        asyncDeleteArticle: (id) => {
            dispatch(asyncDeleteArticle(id));
        },
        asyncGetCategoryRecept: (idCategory) => {
            dispatch(asyncGetCategoryRecept(idCategory));
        },
        asyncGetCategoryArticle: (idCategory) => {
            dispatch(asyncGetCategoryArticle(idCategory));
        },
        asyncNestedCategoriesList: (id) => {
            dispatch(asyncNestedCategoriesList(id));
        }
    };
};

class Index extends React.Component {
    state = {
        badResponseGetArticlesByCategory: [],
        badResponseGetRecipeByCategory: []
    }

    deleteRecipeToDispatch = (e) => {
        this.props.asyncDeleteRecipe(e.target.value);
    }

    deleteArticleToDispatch = (e) => {
        this.props.asyncDeleteArticle(e.target.value);
    }

    componentDidMount = () => {
        let id = this.props.match.params.id;
        this.transitionBetweenCategories(id);
    }

    transitionBetweenCategories = (id) => {
        this.props.asyncGetCategoryArticle(id);         
        this.props.asyncGetCategoryRecept(id);
        this.props.asyncNestedCategoriesList(id);
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.state.articles.badResponseGetArrByCategory.length > 0) {
            this.setState ({ badResponseGetArticlesByCategory: nextProps.state.articles.badResponseGetArrByCategory });
        }
        if (nextProps.state.recipes.badResponseGetByCategory.length > 0) {
            this.setState ({ badResponseGetRecipeByCategory: nextProps.state.recipes.badResponseGetByCategory });
        }
    }

    render() {
        const { categoryRecipe } = this.props.state.recipes;
        const { categoryArticles } = this.props.state.articles;
        return (
            <div className='content'>
                <Breadcrumbs
                    transitionBetweenCategories={this.transitionBetweenCategories}
                    nestedList={this.props.state.categorys}
                />
                {
                    this.state.badResponseGetArticlesByCategory.map((response) => {
                        return <div key={response.message}>Article error {response.message}</div>;
                    })
                }
                {
                    this.state.badResponseGetRecipeByCategory.map((response) => {
                        return <div key={response.message}>Recipe error {response.message}</div>;
                    })
                }
                {   
                    categoryArticles.map((article) => {
                        return <ArticleCard
                            article={article}
                            key={article._id}
                            id={this.props.match.params.id}
                            deleteArticleToDispatch={this.deleteArticleToDispatch}
                        />;
                    })
                }
                { 
                    categoryRecipe.map((recipe) => {
                        return <Recipes
                            recipe={recipe}
                            id={this.props.match.params.id}
                            key={recipe._id}
                            deleteRecipeToDispatch={this.deleteRecipeToDispatch}
                        />;
                    })
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

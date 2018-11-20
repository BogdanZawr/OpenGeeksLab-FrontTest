import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncNestedCategoriesListByRecipe } from '../../actions/categoryes';
import { clearStoreAlerts } from '../../actions/categoryes';
import { asyncGetRecipeById } from '../../actions/recipes';
import Breadcrumbs from '../categoryes/Breadcrumbs';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => {
    return {
        getRecipeById: (id) => {
            dispatch(asyncGetRecipeById(id));
        },
        asyncNestedCategoriesListByRecipe: (id) => {
            dispatch(asyncNestedCategoriesListByRecipe(id));
        },
        clearStoreAlerts: () => {
            dispatch(clearStoreAlerts());
        }
    };
};

class Content extends Component {
    state = {
        badResponseGetById: [],
    }

    componentDidMount = () => {
        let { id } = this.props.match.params;
        this.props.getRecipeById(id);
        this.props.asyncNestedCategoriesListByRecipe(id);
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.state.recipes.badResponseGetById.length > 0) {
            this.setState ({ badResponseGetById: nextProps.state.recipes.badResponseGetById });
        }
    }

    componentWillUnmount = () => {
        this.props.clearStoreAlerts();
    }

    render() {
        const CurrentRecipe = this.props.state.recipes.recipeById;
        return (
            <div className='content'>
                <Breadcrumbs
                    transitionBetweenCategories={this.transitionBetweenCategories}
                    nestedList={this.props.state.categorys}
                />
                <div className='textContainer'>
                    <Card>
                        {
                            this.state.badResponseGetById.map((response) => {
                                return <div key={response.message}>{response.message}</div>;
                            })
                        }
                        <CardBody>
                            <CardTitle>
                                {CurrentRecipe.title}
                            </CardTitle>
                            <CardText>
                                {CurrentRecipe.description}
                            </CardText>
                            <CardText>
                                <small className='text-muted'>{CurrentRecipe.text}</small>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);

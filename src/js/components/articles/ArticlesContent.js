import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncNestedCategoriesListByArticle, clearStoreAlerts } from '../../actions/categoryes';
import { asyncGetArticleById } from '../../actions/articles';
import Breadcrumbs from '../categoryes/Breadcrumbs';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => {
    return {
        asyncGetArticleById: (id) => {
            dispatch(asyncGetArticleById(id));
        },
        asyncNestedCategoriesListByArticle: (id) => {
            dispatch(asyncNestedCategoriesListByArticle(id));
        },
        clearStoreAlerts: () => {
            dispatch(clearStoreAlerts());
        }
    };
};

class ArticlesContent extends Component {
    state = {
        badResponseGetArticleById: [],
    }
    
    componentDidMount = () => {
        let { id } = this.props.match.params;
        this.props.asyncGetArticleById(id);
        this.props.asyncNestedCategoriesListByArticle(id);
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.state.articles.badResponseGetById.length > 0) {
            this.setState ({ badResponseGetArticleById: nextProps.state.articles.badResponseGetById });
        }
    }

    componentWillUnmount = () => {
        this.props.clearStoreAlerts();
    }

    render() {
        const CurrentArticle = this.props.state.articles.articleToUpdate;
        return (
            <div className='content'>
                <Breadcrumbs
                    transitionBetweenCategories={this.transitionBetweenCategories}
                    nestedList={this.props.state.categorys}
                />
                <div className='textContainer'>
                    <Card>
                        {
                            this.state.badResponseGetArticleById.map((response) => {
                                return <div key={response.message}>{response.message}</div>;
                            })
                        }
                        <CardBody>
                            <CardTitle>
                                {CurrentArticle.title}
                            </CardTitle>
                            <CardText>
                                {CurrentArticle.description}
                            </CardText>
                            <CardText>
                                <small className='text-muted'>{CurrentArticle.text}</small>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContent);

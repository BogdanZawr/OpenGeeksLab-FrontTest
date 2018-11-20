import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncGetArticleById, asyncUpdateArticle } from '../../../actions/articles';
import CUArticlesForm from './forms/CUArticlesForm';

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => {
    return {
        asyncGetArticleById: (id) => {
            dispatch(asyncGetArticleById(id));
        },
        asyncUpdateArticle: (par, pageId) => {
            dispatch(asyncUpdateArticle(par, pageId));
        },
    };
};

class UpdateArticle extends Component {
    state = {
        titleError: '',
        textError: '',
        descriptionError: '',
    }

    addArticleToDispatch = (e) => {
        e.preventDefault();
        const _id = this.props.match.params.id;
        const title = e.target.title.value;
        const text = e.target.text.value;
        const description = e.target.description.value;
        const categorId = this.props.match.params.categoryId;
        let par = {
            _id,
            title,
            text,
            description,
            'categoryId':e.target.parentId.value,
        };
        switch ('') {
        case title:
            this.setState ({ titleError: 'Title can not be empty' });
            break;
        case text:
            this.setState ({ textError: 'Text can not be empty' });
            break;
        case description:
            this.setState ({ descriptionError: 'Description can not be empty' });
            break;
        default:
            this.props.asyncUpdateArticle(par, categorId);
            break;
        }
    }
    
    componentDidMount = () => {
        let id = this.props.match.params.id;
        this.props.asyncGetArticleById(id);
    }


    render() {
        return (
            <div className='formContainer'>
                <CUArticlesForm
                    Dispatch={this.addArticleToDispatch}
                    renderSelect={true}
                    updateArticle={true}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateArticle);

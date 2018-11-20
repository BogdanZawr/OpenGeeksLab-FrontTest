import React from 'react';
import { connect } from 'react-redux';
import { addArticleToDispatch } from '../../../actions/articles';
import CUArticlesForm from './forms/CUArticlesForm';

const mapDispatchToProps = dispatch => {
    return {
        addArticleToDispatch: (article) => {
            dispatch(addArticleToDispatch(article));
        }
    };
};

class NewArticle extends React.Component {
    state = {
        title: '',
        description: '',
        text: '',
        textAlert: '',
        titleAlert: '',
        descriptionAlert: '',
    }

    addArticleToDispatch = (e) => {
        e.preventDefault();

        let article = {
            'title':e.target.title.value,
            'text':e.target.text.value,
            'description':e.target.description.value,
            'categoryId':this.props.match.params.id,
        };

        switch ('') {
        case e.target.title.value:
            this.setState ({ titleAlert: 'Title can not be empty' });
            break;
        case e.target.description.value:
            this.setState ({ descriptionAlert: 'Description can not be empty'});
            break;
        case e.target.text.value:
            this.setState ({ textAlert: 'Text can not be empty' });
            break;
        default:
            this.props.addArticleToDispatch(article);
            break;
        }
    }

    render() {
        return (
            <div className='formContainer'>
                <CUArticlesForm
                    state={this.state}
                    Dispatch={this.addArticleToDispatch}
                    titleAlert={this.state.titleAlert}
                    descriptionAlert={this.state.descriptionAlert}
                    textAlert={this.state.textAlert}

                />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(NewArticle);

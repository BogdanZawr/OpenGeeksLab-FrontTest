import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncGetRecipeById, asyncUpdateRecipe } from '../../../actions/recipes';
import CURecipesForm from './form/CURecipesForm';

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => {
    return {
        getRecipeById: (id) => {
            dispatch(asyncGetRecipeById(id));
        },
        asyncUpdateRecipe: (par, pageId) => {
            dispatch(asyncUpdateRecipe(par, pageId));
        },

    };
};

class UpdateRecipe extends Component {
    state = {
        text: 'Loading',
        title: 'Loading',
        categoryId: 'Loading',
        titleAlert: '',
        textAlert: '',
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState ({ 
            text: nextProps.state.recipes.recipeById.text,
            title: nextProps.state.recipes.recipeById.title,
            description: nextProps.state.recipes.recipeById.categoryId,
        });
    }

    addRecipeToDispatch = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const title = e.target.title.value;
        const text = e.target.text.value;
        const categorId = this.props.match.params.categoryId;
        let par = {
            '_id':id,
            'title':title,
            'text':text,
            'categoryId':e.target.parentId.value,
        };
        switch ('') {
        case title:
            this.setState ({ titleAlert: 'Title can not be empty' });
            break;
        case text:
            this.setState ({ textAlert: 'Text can not be empty' });
            break;
        default:
            this.props.asyncUpdateRecipe(par, categorId);
            break;
        }
    }
    
    componentDidMount = () => {
        let recipeId = this.props.match.params.id;
        this.props.getRecipeById(recipeId);
    }
    
    onChangeTitle = (e) => {
        this.setState ({ title: e.target.value });
    }

    onChangeText = (e) => {
        this.setState ({ text: e.target.value });
    }

    render() { 
        return (
            <div className='formContainer'>
                <CURecipesForm
                    state={this.state}
                    Dispatch={this.addRecipeToDispatch}
                    id={this.props.match.params.id}
                    isFormHaveDescription={false}
                    onChangeTitle={this.onChangeTitle}
                    onChangeText={this.onChangeText}
                    renderSelect={true}
                    updateRecipe={true}
                    titleAlert={this.state.titleAlert}
                    textAlert={this.state.textAlert}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipe);

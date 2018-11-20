import React from 'react';
import { connect } from 'react-redux';
import { asyncAddRecipe } from '../../../actions/recipes';
import CURecipesForm from './form/CURecipesForm';


const mapDispatchToProps = dispatch => {
    return {
        asyncAddRecipe: (categoryId, title, text) => {
            dispatch(asyncAddRecipe(categoryId, title, text));
        }
    };
};

class NewRecipe extends React.Component {
    state = {
        title: '',
        text: '',
        titleAlert: '',
        textAlert: '',
    }

    addRecipeToDispatch = (e) => {
        e.preventDefault();
        switch ('') {
        case e.target.title.value:
            this.setState ({ titleAlert: 'Title can not be empty' });
            break;
        case e.target.text.value:
            this.setState ({ textAlert: 'Text can not be empty' });
            break;
        default:
            this.props.asyncAddRecipe(this.props.match.params.id, e.target.title.value, e.target.text.value);
            break;
        }
    }


    render() {
        return (
            <div className='formContainer'>
                <CURecipesForm
                    state={this.state}
                    Dispatch={this.addRecipeToDispatch}
                    textAlert={this.state.textAlert}
                    titleAlert={this.state.titleAlert}
                />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(NewRecipe);

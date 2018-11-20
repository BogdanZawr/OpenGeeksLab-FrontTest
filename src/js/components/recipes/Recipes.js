import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, } from 'reactstrap';
import { connect } from 'react-redux';
import ModalLogic from '../ModalLogic';
import ModalDelete from '../ModalDelete';

const mapStateToProps = state => ({
    state,
});

class Breadcrumbs extends React.Component {
    state = {
        modal: false,
    }

    renderModal = () => {
        this.setState ({
            modal: !this.state.modal,
        });
    }

    render() {
        return (
            <div className='recipeAndArticleList' key= {this.props.recipe._id} state={this.props.state}> 
                <Card>
                    <CardHeader>Recipe</CardHeader>
                    <CardBody>
                        <CardTitle>{this.props.recipe.title}</CardTitle>
                        <Link to={'/ContentInfo/'+ this.props.recipe._id + '/Recipe'}>
                            <Button>Read More</Button>
                        </Link>
                    </CardBody>
                    <CardFooter>
                        <button onClick={this.renderModal}>
                            Delete Recipe
                        </button>
                        <Link to={'/UpdateRecipe/'+ this.props.recipe._id + '/OfCategory/' + this.props.id}>
                            <button>Update Recipe</button>
                        </Link>
                    </CardFooter>
                </Card>
                {
                    this.state.modal &&
                    <ModalLogic value={this.props.recipe._id} yesButton={this.props.deleteRecipeToDispatch} renderModal={this.renderModal}>
                        <ModalDelete/>
                    </ModalLogic>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(Breadcrumbs);

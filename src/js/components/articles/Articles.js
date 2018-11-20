import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, } from 'reactstrap';
import { connect } from 'react-redux';
import { clearStoreAlerts } from '../../actions/categoryes';
import ModalLogic from '../ModalLogic';
import ModalDelete from '../ModalDelete';

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => {
    return {
        clearStoreAlerts: () => {
            dispatch(clearStoreAlerts());
        }
    };
};

class Articles extends React.Component {
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
            <div className='recipeAndArticleList' key= {this.props.article._id}> 
                <Card>
                    <CardHeader>Article</CardHeader>
                    <CardBody>
                        <CardTitle>{this.props.article.title}</CardTitle>
                        <CardTitle>{this.props.article.description}</CardTitle>
                        <Link to={'/ContentInfo/'+ this.props.article._id + '/Articles'}>
                            <Button>Read More</Button>
                        </Link>
                    </CardBody>
                    <CardFooter>
                        <button onClick={this.renderModal}>Delete Article</button>
                        <Link to={'/UpdateArticle/'+ this.props.article._id + '/OfCategory/' + this.props.id}>
                            <button>Update Article</button>
                        </Link>
                    </CardFooter>
                </Card>
                {
                    this.state.modal &&
                    <ModalLogic value={this.props.article._id} yesButton={this.props.deleteArticleToDispatch} renderModal={this.renderModal}>
                        <ModalDelete/>
                    </ModalLogic>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);

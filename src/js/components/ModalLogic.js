import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalFooter } from 'reactstrap';
import { clearStoreAlerts } from '../actions/categoryes';

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

class ModalRender extends React.Component {
    state ={
        modal: true,
        badResponseDelete: [],
    }

    componentWillReceiveProps = (nextProps) => {
        let errorArray = nextProps.state.categorys.badReqestsCategoryDelete;
        if (errorArray.length > 0) {
            this.setState ({ badResponseDelete: nextProps.state.categorys.badReqestsCategoryDelete });
        }

        if (nextProps.state.categorys.deleteSucsses) {
            this.setState ({ modal: false });
        }

        if (nextProps.isOpen) {
            this.setState ({ modal: nextProps.isOpen });
        }

        if (nextProps.state.articles.badResponseDelete.length > 0) {
            this.setState ({ badResponseDelete: nextProps.state.articles.badResponseDelete });
        }
        
        if (nextProps.state.recipes.badResponseDelete.length > 0) {
            this.setState ({ badResponseDelete: nextProps.state.recipes.badResponseDelete });
        }
    }

    componentWillUnmount = () => {
        this.renderModal();
        this.props.clearStoreAlerts();
    }

    renderModal = () => {
        this.setState ({
            modal: !this.state.modal,
        });
    }

    render() {
        console.log(this.state.badResponseDelete);
        
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.renderModal} className={this.props.className}>
                    {this.props.children}
                    <ModalFooter>
                        {
                            this.state.badResponseDelete.map((response) => {
                                return <div key={response.message}>{response.message}</div>;
                            })
                        }
                        <Button color='primary' value={this.props.value} onClick={this.props.yesButton}>Yes</Button>
                        <Button color='secondary' onClick={this.renderModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRender);

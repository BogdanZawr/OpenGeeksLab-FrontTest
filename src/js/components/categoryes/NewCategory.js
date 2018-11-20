import React from 'react';
import { connect } from 'react-redux';
import { asyncAddCategory, clearStoreAlerts, clearBadReqestUpdate } from '../../actions/categoryes';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const mapStateToProps = state => ({
    state,
});

class NewCategory extends React.Component {

    state = {
        parentCategoryId: null,
        newCategoryErr: [],
        titleAlert: '',
    }

    addCategoryToDispatch = (e) => {
        e.preventDefault();
        let title = e.target.elements.title.value;
        let parentId = e.target.parentId.value;
        if (parentId === 'null') {
            parentId = null;
        } 
        if (title === '') {
            this.setState ({ titleAlert: 'Title can not be empty' });
        } else {
            this.props.AddCategory(title, parentId);
        }
    }

    componentDidMount = () => {
        this.setState ({ parentCategoryId: this.props.match.params.id });
    }

    componentWillUnmount = () => {
        this.props.clearStoreAlerts();
        this.props.clearBadReqestUpdate();
    
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState ({ parentCategoryId: nextProps.match.params.id });

        let errArray = nextProps.state.categorys.badReqestsCategoryCreate;
        if (errArray.length > 0) {
            this.setState ({ newCategoryErr: errArray });
        }
    }

    onChangeSelect = (e) => {
        this.setState ({ parentCategoryId: e.target.value });
    }

    render() {
        return (
            <div className='formContainer'>
                <Form id='form' className ='form' onSubmit={this.addCategoryToDispatch}>
                    <FormGroup>
                        <Label>Create new category</Label>
                        <Input type='text' id='title' placeholder='Title' />
                        {
                            this.state.newCategoryErr.map((response) => {
                                return <div key ={response.message}>{response.message}</div>;
                            })
                        }
                    </FormGroup>
                    <select onChange={this.onChangeSelect} value={this.state.parentCategoryId || 'null'} form='form' size='3' name='parentId' required>
                        <option disabled>Select parent category(Category does not change by default)</option>
                        <option value='null' >No parent</option>
                        <option value='buyabu' >Chech Bad REQEST</option>
                        {
                            this.props.state.categorys.all.map((category) => {
                                return <option key={category._id} value={category._id} onClick={() => { this.setState({ dropdownOpen: !this.state.dropdownOpen }); }}>
                                    {category.title}
                                </option>;
                            })
                        }
                    </select>
                    <div>{this.state.titleAlert}</div>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AddCategory: (title, parentId) => {
            dispatch(asyncAddCategory(title, parentId));
        },
        clearStoreAlerts: () => {
            dispatch(clearStoreAlerts());
        },
        clearBadReqestUpdate: () => {
            dispatch(clearBadReqestUpdate());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCategory);

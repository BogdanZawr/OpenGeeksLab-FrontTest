import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const mapStateToProps = state => ({
    state,
});


class CURecipesForm extends Component {
    state = {
        title: '',
        text: '',
        selectValue: '',
        dropdownOpen: false,
        badResponseUpdate: [],
        badResponseGetById: [],
        badResponseCreate: [],
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.state.recipes.recipeById.title) {
            this.setState ({
                title: nextProps.state.recipes.recipeById.title,
                text: nextProps.state.recipes.recipeById.text,
            });
        }
        if (nextProps.state.recipes.recipeById.categoryId) {
            this.setState ({ selectValue: nextProps.state.recipes.recipeById.categoryId });
        }

        if (nextProps.state.recipes.badResponseUpdate.length > 0) {
            this.setState ({ badResponseUpdate: nextProps.state.recipes.badResponseUpdate });
        }

        if (nextProps.state.recipes.badResponseGetById.length > 0) {
            this.setState ({ badResponseGetById: nextProps.state.recipes.badResponseGetById });
        }

        if (nextProps.state.recipes.badResponseCreate.length > 0) {
            this.setState ({ badResponseCreate: nextProps.state.recipes.badResponseCreate });
        }
    }

    onChangeTitle = (e) => {
        this.setState ({ title: e.target.value });
    }

    onChangeText = (e) => {
        this.setState ({ text: e.target.value });
    }

    onChangeSelect = (e) => {
        this.setState ({ selectValue: e.target.value });
    }

    render() {
        return (
            <div className ='form'>
                <Form id='form' onSubmit={this.props.Dispatch}>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input type='text' id='title' placeholder='Title' onChange={this.onChangeTitle} value={this.state.title} />
                    </FormGroup>
                    {
                        this.props.renderSelect &&
                        <select onChange={this.onChangeSelect} value={this.state.selectValue} form='form' size='4' name='parentId' required >
                            <option disabled>Select recipe category(Category does not change by default)</option>
                            {
                                this.props.state.categorys.all.map((category) => {
                                    return <option key={category._id} value={category._id} onClick={() => { this.setState({ dropdownOpen: !this.state.dropdownOpen }); }}>
                                        {category.title}
                                    </option>;
                                })
                            }
                        </select>
                    }
                    {
                        this.state.badResponseUpdate.map((reqest) => {
                            return <div key={reqest.message}>{reqest.message}</div>;
                        })
                    }
                    {
                        this.state.badResponseGetById.map((reqest) => {
                            return <div key={reqest.message}>{reqest.message}</div>;
                        })
                    }
                    {
                        this.state.badResponseCreate.map((reqest) => {
                            return <div key={reqest.message}>{reqest.message}</div>;
                        })
                    }

                    <div>{this.props.textAlert}</div>
                    <div>{this.props.titleAlert}</div>

                    <FormGroup>
                        <Label>Text</Label>
                        <Input type='textarea' id='text' placeholder='Text' onChange={this.onChangeText} value={this.state.text} />
                    </FormGroup>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CURecipesForm);

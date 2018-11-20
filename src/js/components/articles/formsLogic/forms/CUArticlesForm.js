import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const mapStateToProps = state => ({
    state,
});


class CUArticlesForm extends Component {
    state = {
        title: '',
        description: '',
        text: '',
        selectValue: '',
        dropdownOpen: false,
        badResponseGetById: [],
        badResponseUpdate: [],
        badResponseCreate: [],
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.state.articles.articleToUpdate.title) {
            this.setState ({
                title: nextProps.state.articles.articleToUpdate.title,
                text: nextProps.state.articles.articleToUpdate.text,
                description: nextProps.state.articles.articleToUpdate.description,
            });
        }

        if (nextProps.state.articles.articleToUpdate.categoryId) {
            this.setState ({ selectValue: nextProps.state.articles.articleToUpdate.categoryId });
        }

        if (nextProps.state.articles.badResponseGetById.length > 0) {
            this.setState ({ badResponseGetById: nextProps.state.articles.badResponseGetById });
        }

        if (nextProps.state.articles.badResponseUpdate.length > 0) {
            this.setState ({ badResponseUpdate: nextProps.state.articles.badResponseUpdate });
        }

        if (nextProps.state.articles.badResponseCreate.length > 0) {
            this.setState ({ badResponseCreate: nextProps.state.articles.badResponseCreate });
        }
    }

    onChangeTitle = (e) => {
        this.setState ({ title: e.target.value });
    }

    onChangeText = (e) => {
        this.setState ({ text: e.target.value });
    }
    
    onChangeDescription = (e) => {
        this.setState ({ description: e.target.value });
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
                        <Input type='text' id='title' onChange={this.onChangeTitle} value={this.state.title} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input type='text' id='description' onChange={this.onChangeDescription} value={this.state.description} />
                    </FormGroup>
                    {
                        this.props.renderSelect &&
                        <select onChange={this.onChangeSelect} value={this.state.selectValue} form='form' size='4' name='parentId' required >
                            <option disabled>Select recipe category(Category does not change by default)</option>
                            <option value='bubaldum'>***Category for check bad response***</option>
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
                        this.state.badResponseGetById.map((response) => {
                            return <div key={response.message}>{response.message}</div>;
                        })
                    }
                    {
                        this.state.badResponseUpdate.map((response) => {
                            return <div key={response.message}>{response.message}</div>;
                        })
                    }
                    {
                        this.state.badResponseCreate.map((response) => {
                            return <div key={response.message}>{response.message}</div>; 
                        })
                    }

                    <div>{this.props.titleAlert}</div>
                    <div>{this.props.descriptionAlert}</div>
                    <div>{this.props.textAlert}</div>

                    <FormGroup>
                        <Label>Text</Label>
                        <Input type='textarea' id='text' onChange={this.onChangeText} value={this.state.text} />
                    </FormGroup>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CUArticlesForm);

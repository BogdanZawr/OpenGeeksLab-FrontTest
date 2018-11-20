import React from 'react';

class NewCategoryForm extends React.Component {
    state = {
        selectValue: this.props.currentCategory.parentId,
        title: this.props.currentCategory.title,
        NewCategoryErr: [],
    }

    componentWillUnmount = () => {
        this.props.clearBadReqestUpdate();
    }

    componentWillReceiveProps = (nextProps) => {
        let errArray = nextProps.state.categorys.badReqestCategoryUpdate;
        if (errArray.length > 0) {
            this.setState ({ NewCategoryErr: errArray });
        }
    }

    onChangeSelect = (e) => {
        this.setState ({ selectValue: e.target.value });
    }

    onChangeTitle = (e) => {
        this.setState ({ title: e.target.value });
    }

    render() {
        return (
            <div className='listElement'>
                <form id='form' onSubmit={this.props.updateCategoryToDispatch}>
                    <input onChange={this.onChangeTitle} value={this.state.title} id='title' type='text' />

                    <select onChange={this.onChangeSelect} value={this.state.selectValue || 'null'} form='form' size='3' name='parentId' required>
                        <option disabled>Select parent category(Category does not change by default)</option>
                        <option value='null' >No parent</option>
                        <option value='buyabu' >Check Bad REQEST</option>
                        {
                            this.props.state.categorys.all.map((category) => {
                                return <option key={category._id} value={category._id} onClick={() => { this.setState({ dropdownOpen: !this.state.dropdownOpen }); }}>
                                    {category.title}
                                </option>;
                            })
                        }
                    </select>

                    <button type='submit'>Submit</button>
                    <button type='button' onClick={this.props.updateRenderFlag}>Cancel</button>
                    {
                        this.state.NewCategoryErr.map((response) => {
                            return <div key={response.message}>{response.message}</div>;
                        })
                    }
                </form>
                <div>{this.props.titleEmptyAlert}</div>
                <div>{this.props.titleToLongAlert}</div>
            </div>
        );
    }
}

export default NewCategoryForm;

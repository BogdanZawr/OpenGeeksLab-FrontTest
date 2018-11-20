import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';


class ModalRender extends React.Component {
    render() {
        return (
            <div>
                <ModalHeader>Delete category</ModalHeader>
                <ModalBody>
                    Are you sure to delete this category?
                </ModalBody>
            </div>
        );
    }
}

export default ModalRender;

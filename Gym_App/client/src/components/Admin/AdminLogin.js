import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const AdminLogin = (props) => {

    const {admin,onSubmitHandler,errors,onChangeHandler,buttonText} = props;


    return (
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>{
                        errors?
                        <span>{errors}</span>:
                        <span>Name</span>
                    }</Form.Label>
                    <Form.Control type="text" name="name" value={admin.name} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{
                        errors?
                        <span>{errors}</span>:
                        <span>Password</span>
                    }</Form.Label>
                    <Form.Control type="text" name="password" value={admin.password} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <Button type="submit">{buttonText}</Button>
            </Form>
    )
}
export default AdminLogin;
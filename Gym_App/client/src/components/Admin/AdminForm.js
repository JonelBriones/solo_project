import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const AdminForm = (props) => {

    const {admin,onSubmitHandler,errors,onChangeHandler,buttonText} = props;

    return (
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>{
                        errors.name?
                        <span>{errors.name.message}</span>:
                        <span>Name</span>
                    }</Form.Label>
                    <Form.Control type="text" name="name" value={admin.name} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{
                        errors.password?
                        <span>{errors.password.message}</span>:
                        <span>Password</span>
                    }</Form.Label>
                    <Form.Control type="text" name="password" value={admin.password} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{
                        errors.confirmPassword?
                        <span>{errors.confirmPassword.message}</span>:
                        <span>Confirm Password</span>
                    }</Form.Label>
                    <Form.Control type="text" name="confirmPassword" value={admin.confirmPassword} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <Button type="submit">{buttonText}</Button>
            </Form>
    )
}
export default AdminForm;
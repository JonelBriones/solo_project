import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const AdminForm = (props) => {

    const {admin,onSubmitHandler,errors,onChangeHandler,buttonText,confirmReg} = props;

    return (
            <Form onSubmit={onSubmitHandler} className="sign-up-input">
                <div className="reg-container">
                <div className='reg-user-info'>
                    <h1>Admin Login & Registration</h1>
                    {
                    confirmReg?
                    <h1>{confirmReg}</h1>:
                    null
                    }
                <Form.Group className="mb-3">
                    <Form.Label>{
                        errors.name?
                        <span className="reg-errors"> {errors.name.message}</span>:
                        <span className="reg-errors">Name</span>
                    }</Form.Label>
                    <Form.Control type="text" name="name" value={admin.name} placeholder="First Name" onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{
                        errors.password?
                        <span>{errors.password.message}</span>:
                        <span>Password</span>
                    }</Form.Label>
                    <Form.Control type="password" name="password" value={admin.password} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{
                        errors.confirmPassword?
                        <span>{errors.confirmPassword.message}</span>:
                        <span>Confirm Password</span>
                    }</Form.Label>
                    <Form.Control type="password" name="confirmPassword" value={admin.confirmPassword} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <div className='userReg-btn'>
                    <Button type="submit">{buttonText}</Button>
                </div>
                </div>
                </div>
            </Form>
    )
}
export default AdminForm;
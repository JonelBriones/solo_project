import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const UserForm = (props) => {

    const {user,onSubmitHandler,errors,onChangeHandler,buttonText,confirmReg} = props;

    return (
        <>
            {
                confirmReg?
            <h1>{confirmReg}</h1>:null
            }
            <Form onSubmit={onSubmitHandler}>
            <div className="userReg">
                <div className='reg-user-info'>
                    <h4>User Information</h4>
                        <Form.Group className="mb-3">
                            <Form.Label>{
                                errors.firstName?
                                <span>{errors.firstName.message}</span>:
                                <span>First Name</span>
                            }</Form.Label>
                            <Form.Control type="text" name="firstName" value={user.firstName} onChange={(e)=>onChangeHandler(e)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{
                                errors.lastName?
                                <span>{errors.lastName.message}</span>:
                                <span>Last Name</span>
                            }</Form.Label>
                            <Form.Control type="text" name="lastName" value={user.lastName} onChange={(e)=>onChangeHandler(e)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{
                                errors.email?
                                <span>{errors.email.message}</span>:
                                <span>Email</span>
                            }</Form.Label>
                            <Form.Control type="text" name="email" value={user.email} onChange={(e)=>onChangeHandler(e)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{
                                errors.password?
                                <span>{errors.password.message}</span>:
                                <span>Password</span>
                            }</Form.Label>
                            <Form.Control type="password" name="password" value={user.password} onChange={(e)=>onChangeHandler(e)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>{
                                errors.confirmPassword?
                                <span>{errors.confirmPassword.message}</span>:
                                <span>Confirm Password</span>
                            }</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=>onChangeHandler(e)}/>
                        </Form.Group>

                    <div className='userReg-btn'>
                        <Button type="submit">{buttonText}</Button>
                    </div>
                </div>
                <div className='reg-shipping-info'>
                <h4>Shipping Information</h4>
                <Form.Group>
                    <Form.Label>{
                        errors.address?
                        <span>{errors.address.message}</span>:
                        <span>Address</span>
                    }</Form.Label>
                    <Form.Control type="text" name="address" value={user.address} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <Form.Group>
                    <span>Apartment (optional)</span>
                    <Form.Control type="text" name="apartment" value={user.apartment} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{
                        errors.city?
                        <span>{errors.city.message}</span>:
                        <span>city</span>
                    }</Form.Label>
                    <Form.Control type="text" name="city" value={user.city} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{
                        errors.countryOrRegion?
                        <span>{errors.countryOrRegion.message}</span>:
                        <span>Country/Region</span>
                    }</Form.Label>
                    <Form.Control type="text" name="countryOrRegion" value={user.countryOrRegion} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{
                        errors.state?
                        <span>{errors.state.message}</span>:
                        <span>State</span>
                    }</Form.Label>
                    <Form.Control type="text" name="state" value={user.state} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{
                        errors.zipcode?
                        <span>{errors.zipcode.message}</span>:
                        <span>Zipcode</span>
                    }</Form.Label>
                    <Form.Control type="text" name="zipcode" value={user.zipcode} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{
                        errors.phone?
                        <span>{errors.phone.message}</span>:
                        <span>Phone</span>
                    }</Form.Label>
                    <Form.Control type="text" name="phone" value={user.phone} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                </div>
            </div>
            </Form>
        </>
    )
}
export default UserForm;
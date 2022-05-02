import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const UserLogin = (props) => {

    /* ------- USER LOGIN -------- */
    const {user,onSubmitHandler,errors,onChangeHandler,buttonText} = props;

    return (
            <Form onSubmit={onSubmitHandler}>
                <div className="userLog">
                    <Form.Group className="mb-3">
                        <Form.Label>{
                            errors?
                            <span>{errors}</span>:
                            <span>Email</span>
                        }</Form.Label>
                        <Form.Control type="text" name="email" value={user.email} onChange={onChangeHandler}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{
                            errors?
                            <span>{errors}</span>:
                            <span>Password</span>
                        }</Form.Label>
                        <Form.Control type="password" name="password" value={user.password} onChange={onChangeHandler}/>
                    </Form.Group>
                    <Button type="submit">{buttonText}</Button>
                </div>
            </Form>
    )
}
export default UserLogin;
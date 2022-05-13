import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const ProductForm = (props) => {
    const {product,onSubmitHandler,onChangeHandler,errors,buttonText} = props;
    return (
        <div>
            <Form onSubmit={onSubmitHandler} className='admin-add-product'>
                <Form.Group className="mb-3">
                    <Form.Label>{
                        errors.name?
                        <span>{errors.name.message}</span>:
                        <span>Product Name</span>
                    }</Form.Label>
                    <Form.Control type="text" name="name" value={product.name} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{
                        errors.description?
                        <span>{errors.description.message}</span>:
                        <span>Description</span>
                    }</Form.Label>
                    <Form.Control type="text" name="description" value={product.description} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{
                        errors.category?
                        <span>{errors.category.message}</span>:
                        <span>Category</span>
                    }</Form.Label>
                    <Form.Control type="text" name="category" value={product.category} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{
                        errors.image?
                        <span>{errors.image.message}</span>:
                        <span>Image</span>
                    }</Form.Label>
                    <Form.Control type="text" name="image" value={product.image} placeholder="Enter Image URL" onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{
                        errors.price?
                        <span>{errors.price.message}</span>:
                        <span>Price</span>
                    }</Form.Label>
                    <Form.Control type="number" step="0.01" name="price" value={product.price} onChange={(e)=>onChangeHandler(e)}/>
                </Form.Group>
                <Button type="submit">{buttonText}</Button>
            </Form>
        </div>
    )
}
export default ProductForm;
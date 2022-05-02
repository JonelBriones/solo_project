import {useNavigate} from 'react-router-dom'
const ProductsData = (props) => {
    const navigate = useNavigate();
    const products = [
        {
            _id: 1,
            image: 'https://cdn.shopify.com/s/files/1/1228/5232/products/DSC00307_ec99cfda-f89b-487b-8250-c7076d18391b_400x.jpg?v=1614148185',
            name: 'Axiom - Tee',
            color: 'Black',
            price: '33.00',
            description: 'The Axiom Tee introduces a contemporary approach to our traditional skull & barbells lockup. Featuring the our core mantra, founding year, and classic imagery, it is yet another heavy-hitter in our latest rotation of lifestyle tees.',
            productDetails: [
                '100% Cotton',
                'High-end Jersey Tee',
                'Lightweight Performance Fabric',
                'Soft Feel',
                'Pre-shrunk',
                'Athletic Fit'
            ]
        },
        {
            _id: 2,
            image: 'https://cdn.shopify.com/s/files/1/1228/5232/products/DSC02564_f1209fca-0335-4d03-ac43-cf37ad25f4f1_400x.jpg?v=1641852729',
            name: "Statement - Tee",
            color: 'Army',
            price: '36.00',
            description: 'The Statement Tee, aptly named for the purpose it was meant to serve, makes a statement. We layered the classic Barbell Brigade logo and mantra right in the middle of this tee so you can proudly wear the ethos of the Barbell Brigade community on your chest. Strength through domination. Strength through humility. Dominate Humbly.',
            productDetails: [
                '100% Cotton',
                'High-end Jersey Tee',
                'Lightweight Performance Fabric',
                'Soft Feel',
                'Pre-shrunk',
                'Athletic Fit'
            ]
        },
    ]
    const redirect = (page) => {
        navigate(page)
    }
    return (
        <>
        {
                products.map((oneProduct)=> (
                    <div key={oneProduct._id}>
                        <button onClick={()=>redirect(`${oneProduct.name}`)} className="product-border">
                            <img src={oneProduct.image}/>
                            <div className='product-content'>
                                <div>{oneProduct.name}</div>
                                <div>{oneProduct.price}</div>
                            </div>
                        </button>
                    </div>
                ))
            }
        </>
    )
}
export default ProductsData;
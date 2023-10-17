import { useShoppingCart } from '../contex/ShoppingCartContext.tsx';
import { useEffect, useState } from 'react';
import { IProduct } from '../shared/model/product.model.ts';
import ProductService from '../service/product.service.ts';
import { ApplicationConfigService } from '../shared/service/application-config.service.ts';
import AlertService from '../shared/alert/alert.service.tsx';

import './CheckoutPage.css';
import LoadingSpinner from './LoadingSpinner.tsx';

function CheckoutPage() {
    const productService = new ProductService(new ApplicationConfigService())
    const alertService = new AlertService();
    const {cartItems} = useShoppingCart();
    const {removeFromCart} = useShoppingCart();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [cartProducts, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProductData = async () => {
            setIsFetching(true);
            const productData = [];
            for (const item of cartItems) {
                try {
                    const product = await productService.find(item.id);
                    productData.push(product);
                } catch (error) {
                    alertService.showHttpError(error);
                }
            }
            setIsFetching(false);
            setProducts(productData);
        };

        fetchProductData();
    }, [cartItems]);
    return (
        <div>
            <h2>Checkout Page</h2>
            {isFetching ? (
                <LoadingSpinner/>
            ) : ([
                    <table key={0}>
                        <thead>
                        <tr>
                            <th className="product-col">Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartProducts.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="product-info">
                                        <img src={product.image} alt={product.title} className="product-image"/>
                                        <div className="product-details">
                                            <h3 className="product-title">{product.title}</h3>
                                            <p className="product-description">{product.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>${product.price.toFixed(2)}</td>
                                {cartItems.map((item) => (
                                    <td>{item.quantity}</td>
                                ))}
                                <td>${(product.price * product.quantity).toFixed(2)}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            if (product.id !== undefined) {
                                                removeFromCart(product.id);
                                            }
                                        }} className="delete-button">x
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>,
                    <div className="continue-shopping-button-container align-content-end" key={1}>
                        <button className="continue-shopping-button">Save and Continue Shopping</button>
                    </div>
                ]
            )}
        </div>
    );
}

export default CheckoutPage;

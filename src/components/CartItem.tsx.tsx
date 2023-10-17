import { useShoppingCart } from '../contex/ShoppingCartContext.tsx';

function CheckoutPage() {
    const {cartItems} = useShoppingCart();

    return (
        <div>
            <h2>Checkout Page</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>{item.id} - {item.quantity} x {9000}</li>
                ))}
            </ul>
        </div>
    );
}

export default CheckoutPage;

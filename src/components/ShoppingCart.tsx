import { Button, Offcanvas, Stack } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItem } from "./CartItem"
import storeItems from "../data/items.json"
import { useShoppingCart } from '../contex/ShoppingCartContext.tsx';
import { useNavigate } from "react-router-dom";

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartProps) {
    const navigateTo = useNavigate();
    const {closeCart, cartItems} = useShoppingCart()
    const handleCheckout = () => {
        navigateTo('/checkout');
        closeCart();
    };
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                // @ts-ignore
                                const item = storeItems.find(i => i.id === cartItem.id);
                                // @ts-ignore
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                </Stack>
                <Button className="w-100 mt-3" variant="primary" onClick={handleCheckout}>
                    Checkout
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

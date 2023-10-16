import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from '../contex/ShoppingCartContext.tsx';
import { CSSProperties } from 'react';

type StoreItemProps = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
    description: string;
    categoryId: number;
};

export function StoreItem({id, title, price, image, description}: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart();
    const quantity = getItemQuantity(id);

    const truncatedDescription = shortDescription(description);


    return (
        <Card className="h-100" style={cardStyle}>
            <Card.Img variant="top" src={image} height="200px" style={imageStyle}/>
            <Card.Body className="d-flex flex-column">
                <Card.Subtitle className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{title}</span>
                </Card.Subtitle>
                <Card.Text className="d-flex justify-content-center align-items-baseline mb-4">
                    <span className="ms-2 text-lg-center">
                        {formatCurrency(price)}
                    </span>
                </Card.Text>
                <Card.Text className="d-flex justify-content-between align-items-baseline mb-4">
                    <span>{truncatedDescription}</span>
                </Card.Text>

                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
                            + Add To Cart
                        </Button>
                    ) : (
                        <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}}>
                            <div className="d-flex align-items-center justify-content-center" style={{gap: ".5rem"}}>
                                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    <span className="fs-3">{quantity}</span> in cart
                                </div>
                                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                            <Button onClick={() => removeFromCart(id)} variant="danger" size="sm">
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

// Define CSS styles
const cardStyle = {
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const imageStyle: CSSProperties = {
    objectFit: 'contain',
    borderRadius: '10px 10px 0 0',
};

// Method to truncate description
function shortDescription(value: string) {
    if (value && value.length > 100) {
        return value.substring(0, 100) + '...';
    } else {
        return value;
    }
}

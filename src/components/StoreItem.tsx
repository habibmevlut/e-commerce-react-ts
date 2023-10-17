import { Button, Card, Form } from "react-bootstrap"; // Import Form from react-bootstrap for input field
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from '../contex/ShoppingCartContext.tsx';
import { CSSProperties, useState } from 'react';

type StoreItemProps = {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    categoryId: number;
    quantity: number;
};
// const productService = new ProductService(new ApplicationConfigService())
// const alertService = new AlertService();

export function StoreItem({id, title, price, image, quantity, description}: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart();
    const enteredQunantity = getItemQuantity(id);

    const truncatedDescription = shortDescription(description);
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [newPrice, setNewPrice] = useState(price); // Track the new price in the state

    const handleEditPrice = () => {
        setIsEditingPrice(true);
    }

    const handleCancel = () => {
        setIsEditingPrice(false);
        // Reset the new price to the original price
        setNewPrice(price);
    }

    const handleUpdatePrice = () => {
        const updatedProduct = {
            id: id,
            price: newPrice,
        };
        console.log(updatedProduct)
        // productService.update(updatedProduct)
        //     .then((res) => {
        //             if (res) {
        //                 alertService.showSuccess("Price updated successfully");
        //             }
        //         },
        //         (error) => {
        //             alertService.showError(error);
        //         });

        setIsEditingPrice(false);
    }

    return (
        <Card className="h-100" style={cardStyle}>
            <Card.Img variant="top" src={image} height="200px" style={imageStyle}/>
            <Card.Body className="d-flex flex-column">
                <Card.Subtitle className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{title}</span>
                </Card.Subtitle>
                {isEditingPrice ? ( // Render input field if editing price
                    <Form>
                        <Form.Group>
                            <Form.Control
                                className={"mb-3"}
                                type="number"
                                value={newPrice}
                                onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                            />
                        </Form.Group>
                    </Form>
                ) : (
                    <Card.Text className="d-flex justify-content-center align-items-baseline mb-4">
                        <span className="ms-2 text-lg-center">
                            {formatCurrency(price)}
                        </span>
                    </Card.Text>
                )}
                <Card.Text className="d-flex justify-content-between align-items-baseline mb-4">
                    <span>{truncatedDescription}</span>
                </Card.Text>

                <h6 className="card-subtitle mb-2 remain" style={quantityColor}>{quantity} left in stock</h6>


                <div className="mt-auto">
                    {enteredQunantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}
                                disabled={quantity === 0}>
                            + Add To Cart
                        </Button>
                    ) : (
                        <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}}>
                            <div className="d-flex align-items-center justify-content-center" style={{gap: ".5rem"}}>
                                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    <span className="fs-3">{enteredQunantity}</span>
                                </div>
                                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                            <Button onClick={() => removeFromCart(id)} variant="danger" size="sm">
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
                <div className="card-body text-center">
                    {isEditingPrice ? (
                        <div>
                            <Button onClick={handleUpdatePrice}>Update</Button>&nbsp;
                            <Button onClick={handleCancel} variant="warning">Cancel</Button>
                        </div>
                    ) : (
                        <Card.Link onClick={handleEditPrice}>Edit Price</Card.Link>
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
    cursor: 'pointer',
};

const quantityColor = {
    color: '#d17581',
}
const imageStyle: CSSProperties = {
    objectFit: 'contain',
    borderRadius: '10px 10px 0 0',
};

function shortDescription(value: string) {
    if (value && value.length > 100) {
        return value.substring(0, 100) + '...';
    } else {
        return value;
    }
}
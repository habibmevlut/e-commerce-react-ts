import { Button, Stack } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';
import { useEffect, useState } from 'react';
import { useShoppingCart } from '../contex/ShoppingCartContext.tsx';
import ProductService from '../service/product.service.ts';
import { ApplicationConfigService } from '../shared/service/application-config.service.ts';
import { IProduct } from '../shared/model/product.model.ts';

type CartItemProps = {
    id: number;
    quantity: number | null;
};

export function CartItem({id, quantity}: CartItemProps) {
    const {removeFromCart} = useShoppingCart();
    const [item, setItem] = useState<IProduct | null>(null);
    useEffect(() => {
        const productService = new ProductService(new ApplicationConfigService());
        productService.find(id).then((data) => {
            setItem(data);
        });
    }, [id]);

    if (item === null) return null;

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            {item.image && (
                <img src={item.image} style={{width: "125px", height: "75px", objectFit: "cover"}} alt=""/>
            )}
            <div className="me-auto">
                <div>
                    {item.title}{" "}
                    {quantity && quantity > 1 && (
                        <span className="text-muted" style={{fontSize: ".65rem"}}>
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{fontSize: ".75rem"}}>
                    {item.price ? formatCurrency(item.price) : "Loading..."}
                </div>
            </div>
            <div>
                {item.price && quantity ? formatCurrency(item.price * quantity) : ""}
            </div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                    if (item.id !== undefined) {
                        removeFromCart(item.id);
                    }
                }}>
                &times;
            </Button>

        </Stack>
    );
}

import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import { useEffect, useState } from 'react';
import ProductService from '../service/product.service.ts';
import { ApplicationConfigService } from '../shared/service/application-config.service.ts';
import { IProduct } from '../shared/model/product.model.ts';
import { AppPagination } from '../components/Pagination.tsx';
import { ITEMS_PER_PAGE } from '../app.constants.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';

const productService = new ProductService(new ApplicationConfigService())
export default function Store() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(ITEMS_PER_PAGE);

    const handlePageChange = (newPage: any) => {
        debugger;
        setCurrentPage(newPage);
        fetchData();
    };

    const fetchData = () => {
        const req = {
            page: currentPage,
            limit: itemsPerPage,
        };
        setIsFetching(true);
        productService.retrieve(req)
            .then((res) => {
                if (res.products) {
                    const updatedProducts = res.products.map((product: IProduct) => ({
                        ...product,
                        isEditingPrice: false,
                        addedToCart: false,
                    }));
                    setProducts(updatedProducts);
                    setTotalItems(res.count);
                    setIsFetching(false);
                } else {
                    setProducts([]);
                }
            })
            .catch(() => {
                setIsFetching(false);
                // Handle error, e.g., display an alert.
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>Products</h1>
            <div>
                {isFetching ? (
                    <LoadingSpinner/>
                ) : (
                    <Row md={2} xs={1} lg={3} className="g-3">
                        {products.map(item => (
                            <Col key={item.id}>
                                {item && (
                                    <StoreItem {...item} />
                                )}
                            </Col>
                        ))}
                    </Row>
                )}

                <div className="container d-flex justify-content-center">
                    <AppPagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>

            </div>
        </>
    )
}
import Pagination from 'react-bootstrap/Pagination';

// @ts-ignore
export function AppPagination({ totalItems, itemsPerPage, onPageChange, currentPage }) {
    // Remove the local currentPage state and use the prop instead.

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        onPageChange(newPage);
    };

    return (
        <Pagination>
            <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((pageNumber) => (
                <Pagination.Item
                    key={pageNumber}
                    active={pageNumber + 1 === currentPage}
                    onClick={() => handlePageChange(pageNumber + 1)}
                >
                    {pageNumber + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );
}

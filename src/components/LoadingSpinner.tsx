import Spinner from 'react-bootstrap/Spinner';

export function LoadingSpinner() {
    return (
        <div className="text-center align-items-center">
            <Spinner animation="border" role="status" size="sm" style={{width: "6rem", height: "6rem"}}> </Spinner>
        </div>
    );
}

export default LoadingSpinner;

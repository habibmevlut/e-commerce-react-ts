import Toast from 'react-bootstrap/Toast';

class AlertService {
    showError(message: string) {
        const toastProps = {
            variant: 'danger',
            autohide: true,
            delay: 5000
        };

        return (
            <Toast {...toastProps}>
                <Toast.Header closeButton={false}>
                    <strong className="mr-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        );
    }

    showSuccess(message: string) {
        const toastProps = {
            variant: 'success',
            autohide: true,
            delay: 5000
        };

        return (
            <Toast {...toastProps}>
                <Toast.Header closeButton={false}>
                    <strong className="mr-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        );
    }

    showHttpError(httpErrorResponse: any) {
        switch (httpErrorResponse.status) {
            case 0:
                return this.showError('Unable to reach the server. Please check your internet connection.');

            case 400: {
                const arr = Object.keys(httpErrorResponse.headers);
                let errorHeader = null;

                for (const entry of arr) {
                    if (entry.toLowerCase().endsWith('app-error')) {
                        errorHeader = httpErrorResponse.headers[entry];
                    } else if (entry.toLowerCase().endsWith('app-params')) {
                    }
                }

                if (errorHeader) {
                    return this.showError(errorHeader);
                } else if (httpErrorResponse.data !== '' && httpErrorResponse.data.fieldErrors) {
                    return this.showError(httpErrorResponse.data.message);
                } else {
                    return this.showError(httpErrorResponse.data.message);
                }
            }

            case 404:
                return this.showError('The endpoint does not exist.');

            default:
                return this.showError(httpErrorResponse.data.message);
        }
    }
}

export default AlertService;

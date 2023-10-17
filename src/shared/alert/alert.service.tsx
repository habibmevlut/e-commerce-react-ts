import { toast } from 'react-toastify';

class AlertService {
    showError(errorMessage: string) {
        toast.error(errorMessage, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    }

    showSuccess(message: string) {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
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
                        const paramsHeader = decodeURIComponent(httpErrorResponse.headers[entry]).replace(/\+/g, ' ');
                        return this.showError(errorHeader + paramsHeader);
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

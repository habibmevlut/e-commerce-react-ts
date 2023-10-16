class UIHelperService {
    createRequestOptionMultipleWithoutNull(...req: any[]) {
        const orgOptions = this.mergeOptions(...req);
        const filteredOptions = this.filterNullOrEmpty(orgOptions);
        return this.createRequestOption(filteredOptions);
    }

    filterNullOrEmpty(obj: any) {
        return Object.keys(obj).reduce((p, c) => {
            if (!(this.isNullOrUndefined(obj[c]) || (Array.isArray(obj[c]) && obj[c].length === 0))) {
                // @ts-ignore
                p[c] = obj[c];
            }
            return p;
        }, {});
    }

    createRequestOption(req: any) {
        let queryString = '';

        if (req) {
            Object.keys(req).forEach(key => {
                if (!this.isNullOrUndefined(req[key]) && !this.isEmptyArray(req[key]) && key !== 'sort') {
                    if (queryString !== '') {
                        queryString += '&';
                    }
                    queryString += `${key}=${encodeURIComponent(req[key])}`;
                }
            });

            if (req.sort) {
                req.sort.forEach((val: any) => {
                    if (queryString !== '') {
                        queryString += '&';
                    }
                    queryString += `sort=${val}`;
                });
            }
        }

        return queryString;
    }

    isNullOrUndefined(value: any) {
        return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
    }


    isEmptyArray(arr: any) {
        return Array.isArray(arr) && arr.length <= 0;
    }

    mergeOptions(...req: any[]) {
        return Object.assign({}, ...req);
    }
}

export default UIHelperService;

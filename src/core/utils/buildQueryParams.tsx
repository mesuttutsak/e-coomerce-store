export interface QueryParams {
    [key: string]: string | number | boolean;
}

export default function buildQueryParams(params: QueryParams): string {
    const queryParams = Object.keys(params)
        .map(key => {
            const value = params[key];
            if (value !== undefined && value !== null) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
            }
            return '';
        })
        .filter(Boolean)
        .join('&');

    return queryParams ? `?${queryParams}` : '';
}
export const apiConfig = {
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};
export async function setHeaders(headers: Headers) {

    return headers;
}
export const apiPaths = {
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL + '/api/v1',
    getMembersUrl: '/members/'
};

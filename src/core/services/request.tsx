
export default function request(urlPath: string, method : 'GET' | 'POST' | 'DELETE' = 'GET' ) {
    const baseUrl = "https://dummyjson.com/";

    return new Promise(async (resolve, reject) => {
        const options: any = {
            method
        }

        const response = await fetch(baseUrl + urlPath, options);
        const result = await response.json();
        if (response.ok && response.status === 200) {
            resolve(result);
        } else {
            reject(result)
        }
    })

}

export const get = (urlPath: string) => request(urlPath);
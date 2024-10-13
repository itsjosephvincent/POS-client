import APIError from './APIError'

export default class BaseAPIService {
    async request(url: string, method: string, params: object|null = null): Promise<any> {
        const runtimeConfig = useRuntimeConfig()
        let config = null
        if (method === 'GET') {
            // GET
            config = {
                baseURL: runtimeConfig.public.apiBaseURL,
                method: method,
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('_token'),
                },
                query: params,
            }
        } else {
            // POST, PUT, DELETE
            config = {
                baseURL: runtimeConfig.public.apiBaseURL,
                method: method,
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('_token'),
                },
                body: params,
            }
        }

        try {
            return await $fetch(url, config)
        } catch (error: any) {
            if (!error.response) {
                throw new APIError({
                    message: "Network Error."
                })  
            }
            switch (error.response.status) {
                case 400:
                case 422:
                    throw new APIError(error.response._data)
                case 404:
                    throw navigateTo('/404')
                case 401:
                    this.revokeAccess()
                    throw new APIError({message: error.response._data.data.message || "Invalid credentials."})
                case 500:
                    throw navigateTo('/500')
                default:
                    throw new APIError({
                        message: "Something went wrong. Please try again. If the problem persists, contact your system administrator"
                    })
            }
        }
    }

    revokeAccess() {
        localStorage.removeItem('_token')
        navigateTo('/')
    }
}

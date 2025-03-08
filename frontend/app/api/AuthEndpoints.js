import { post } from './HelperEndpoints/ApiEndpoints'

function login(data) {
    return post('baseUser/signin', data)
}

export { login };
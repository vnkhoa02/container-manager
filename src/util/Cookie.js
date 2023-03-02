import Cookies from 'js-cookie'

const accessToken = 'accessToken'
const refreshToken = 'refreshToken'

class CookiesUtil {
    static setAccessToken = (token) => {
        Cookies.set(accessToken, token)
    }

    static getAccessToken = () => {
        return Cookies.get(accessToken)
    }

    static setRefreshToken = (token) => {
        Cookies.set(refreshToken, token)
    }

    static getRefreshToken = () => {
        return Cookies.get(refreshToken)
    }

    static removeAccessToken = () => {
        Cookies.remove(accessToken)
    }

    static removeRefreshToken = () => {
        Cookies.remove(refreshToken)
    }
}

export default CookiesUtil

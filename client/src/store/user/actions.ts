import { VKLogin } from "../../VK.API/index";
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'


export function handleLogin() {
    return function (dispatch: any) {
        dispatch({
            type: LOGIN_REQUEST,
        })
        VKLogin((r: any) => {
            if (r.session) {
                let username = r.session.user.first_name
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: username,
                })
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    error: true,
                    payload: new Error('Ошибка авторизации'),
                })
            }
        })
    }
}

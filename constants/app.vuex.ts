export enum DispatchAction {
    LOGIN = "auth/login",
    LOGOUT = "auth/logout",
    CLEAR_AUTH = "auth/clear"
}

export enum MutationState {
    SHOW_SNACKBAR = 'snackbar/showMessage',
    SET_TOKEN = "auth/setToken",
    SET_USER = "auth/setUser"
}

export enum Getter {
    USER = "auth/user"
}
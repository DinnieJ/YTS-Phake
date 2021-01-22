export default function ({redirect, store}:any) {
    if(store.state.auth.user) {
        redirect('/')
    }
}
import { DispatchAction, MutationState } from '@/constants/app.vuex'
import AuthRepository from '@/repositories/AuthRepository'
import { getTokenCookie } from '@/utils/cookies'

export default async function ({ redirect, store}: any) {
  const token = getTokenCookie()
  console.log(getTokenCookie())
  if (token && !store.state.auth.token) {
    store.commit(MutationState.SET_TOKEN, token)
    await AuthRepository.authUser()
      .then((response) => {
        store.commit(MutationState.SET_USER, response.data)
        store.commit(MutationState.SHOW_SNACKBAR, {
            message: `Login successful with ${response.data.email}`,
            color: "green"
        })
      })
      .catch((error) => {
        store.dispatch(DispatchAction.CLEAR_AUTH)
        console.log("Token expired!")
      })
  }
}

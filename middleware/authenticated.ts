import { DispatchAction, MutationState } from '@/constants/app.vuex'
import AuthRepository from '@/repositories/AuthRepository'
import { getTokenCookie } from '@/utils/cookies'

export default async function ({ redirect, store}: any) {
  const token = getTokenCookie()
}

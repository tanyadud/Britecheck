// import moment from 'moment'
// import { store } from '../store'
// import * as errors from './errors'

// export const checkTokenExpiration = () => {
// Checks if time set in localstorage is past to check for refresh token
//   if (
//     window.localStorage.getItem('token') !== null &&
//     window.localStorage.getItem('tokenExpiration') !== null
//   ) {
//     if (moment().unix() >= localStorage.tokenExpiration) {
//       store.dispatch('authLogout')
//     }
//   }
// }

export const checkApiSuccess = (response) => {
  return response.data.error.type === 200
}

// export const checkApiErrors = (response) => {
//   const errorCode = parseInt(response.data.error_code)
//   const message = response.data.message
//   switch (errorCode) {
//     case 3:
//       return new errors.BadJsonError(message)
//     case 4:
//       return new errors.BadDataError(message)
//     case 6:
//       return new errors.NotModifiedError(message)
//     case 8:
//       return new errors.DeleteEntityError(message)
//     case 10:
//       return new errors.UniqueConstraintError(message)
//   }
//
//   return new Error(message)
// }

// export const checkNetErrors = (error) => {
//   if (error.response) {
//     const errorCode = parseInt(error.response.data.error_code)
//     if (errorCode === 9) {
//       store.dispatch('authLogout')
//     }
//     const message = error.response.data.message
//     switch (errorCode) {
//       case 1:
//         return new errors.AuthenticationError(message)
//       case 5:
//         return new errors.NotFoundError(message)
//       case 7:
//         return new errors.DatabaseError(message)
//     }
//   }
//
//   return error
// }

import { useRouteError, isRouteErrorResponse } from "react-router-dom"

function ErrorPage() {
  const error = useRouteError()
  let errorMsg: string

  if (isRouteErrorResponse(error)) {
    // error of type 'ErrorResponse'
    errorMsg = error.error?.message || error.statusText
  } else if (error instanceof Error) {
    // error of type 'Error'
    errorMsg = error.message
  } else if (typeof error === 'string') {
    // error is a string
    errorMsg = error
  } else {
    // Unknown
    errorMsg = 'Unknown error'
  }

  console.error(error)

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p><i>{errorMsg}</i></p>
    </div>
  )
}

export default ErrorPage
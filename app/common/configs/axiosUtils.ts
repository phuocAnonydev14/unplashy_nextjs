export function defineCancelApiObject(apiObject: Record<string, Function>) {
  const cancelApiObject: Record<string, any> = {}


  Object.getOwnPropertyNames(apiObject).forEach((apiPropertyName) => {
    console.log({apiPropertyName})
    const cancellationControllerObject: { controller: AbortController | undefined } = {
      controller: undefined,
    }

    cancelApiObject[apiPropertyName] = {
      handleRequestCancellation: () => {
        if (cancellationControllerObject.controller) {
          // canceling the request and returning this custom message
          cancellationControllerObject.controller.abort()
        }
        cancellationControllerObject.controller = new AbortController()

        return cancellationControllerObject.controller
      },
    }
  })

  return cancelApiObject
}

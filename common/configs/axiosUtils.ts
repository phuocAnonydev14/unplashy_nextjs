import { UnsplashService } from '@/common/services/unsplash';

export function defineCancelApiObject(apiObject: UnsplashService | Record<string, any>) {
  const cancelApiObject: { [key: string]: { handleRequestCancellation: () => AbortController } } =
    {};

  Object.getOwnPropertyNames(apiObject).forEach((apiPropertyName) => {
    const cancellationControllerObject: { controller: AbortController | undefined } = {
      controller: undefined
    };

    cancelApiObject[apiPropertyName] = {
      handleRequestCancellation: () => {
        if (cancellationControllerObject.controller) {
          // canceling the request and returning this custom message
          cancellationControllerObject.controller.abort();
        }
        cancellationControllerObject.controller = new AbortController();

        return cancellationControllerObject.controller;
      }
    };
  });

  return cancelApiObject;
}

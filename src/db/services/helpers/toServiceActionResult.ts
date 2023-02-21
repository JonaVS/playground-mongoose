import { ActionResult } from "../../../types/ActionResult.js";

type MapperFunc<T, U> = (val: T) => U;
type ActionData<T> = T | T[] | null

export const toServiceActionResult = <T, Q>(
  inputResult: ActionResult<ActionData<T>>,
  mapperFunc: MapperFunc<T, Q>
): ActionResult<ActionData<Q>> => {
  const serviceResult = new ActionResult<ActionData<Q>>(null);

  if (!inputResult.data) {
    serviceResult.setError(inputResult.errorCode!, inputResult.error);
  } else {
    if (Array.isArray(inputResult.data)) {
      serviceResult.data = inputResult.data.map(mapperFunc);
    } else {
      serviceResult.data = mapperFunc(inputResult.data);
    }
  }

  return serviceResult;
};
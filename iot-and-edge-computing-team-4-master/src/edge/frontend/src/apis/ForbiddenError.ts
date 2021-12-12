import { FetchError } from "./FetchError";

class ForbiddenError extends FetchError {
  constructor(response: Response) {
    super("Forbidden", response);
  }
}
export { ForbiddenError };

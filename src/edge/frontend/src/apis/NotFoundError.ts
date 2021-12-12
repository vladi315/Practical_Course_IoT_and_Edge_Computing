import { FetchError } from "./FetchError";

class NotFoundError extends FetchError {
  constructor(response: Response) {
    super("NotFound", response);
  }
}
export { NotFoundError };

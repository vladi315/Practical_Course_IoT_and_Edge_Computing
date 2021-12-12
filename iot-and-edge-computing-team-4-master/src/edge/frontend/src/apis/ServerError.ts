import { FetchError } from "./FetchError";

class ServerError extends FetchError {
  constructor(response: Response) {
    super("Server", response);
  }
}
export { ServerError };

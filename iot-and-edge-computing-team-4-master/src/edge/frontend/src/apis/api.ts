import { BACKEND_URL } from "./config";
import { FetchError } from "./FetchError";
import { ForbiddenError } from "./ForbiddenError";
import { NotFoundError } from "./NotFoundError";
import { ServerError } from "./ServerError";

interface Options {
  command?: string;
  method?: string;
}

interface IResult<T> {
  data: T | null;
  error: FetchError | null; // define an Error here
}

function getFromServer<T>(path: string): Promise<T> {
  return call(BACKEND_URL + path, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function pushToServer<T, K>(
  path: string,
  body_data: K,
  options?: Options
): Promise<T> {
  let promise: Promise<T> = call(BACKEND_URL + path, {
    method: (options ? options.method : undefined) || "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },

    body: JSON.stringify(body_data),
  });
  return promise;
}

async function getData<T>(path: string): Promise<IResult<T>> {
  try {
    let result: T = await getFromServer(path);
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

async function fetchData<T, K>(
  path: string,
  body_data: K,
  options?: Options
): Promise<IResult<T>> {
  try {
    let result: T = await pushToServer(path, body_data, options);
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

const call = <T>(url: string, options?: any): Promise<T> => {
  return fetch(url, options).then((response) => {
    if (response.status === 403) {
      return Promise.reject(new ForbiddenError(response));
    } else if (response.status === 404) {
      return Promise.reject(new NotFoundError(response));
    } else if (response.status === 500) {
      return Promise.reject(new ServerError(response));
    } else if (response.status === 300) {
      return Promise.reject(
        new FetchError("HTTP Status " + response.status, response)
      );
    } else if (response.status > 200) {
      return Promise.resolve();
    }
    return response.json();
  });
};

export { getFromServer, fetchData, call, getData };

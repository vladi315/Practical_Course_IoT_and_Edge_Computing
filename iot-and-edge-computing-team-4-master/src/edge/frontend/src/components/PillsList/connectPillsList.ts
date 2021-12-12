import { fetchData } from "../../apis/api";

const endpoint = "/database/pills";
const method = "GET";

// TODO: body?
async function getPills() {
    return fetchData(endpoint, {}, { method: method });
}

export { getPills };

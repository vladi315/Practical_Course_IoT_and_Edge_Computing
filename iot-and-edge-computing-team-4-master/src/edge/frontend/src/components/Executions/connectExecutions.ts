import { fetchData } from "../../apis/api";

const endpoint = "/triggers/demo";
const method = "POST";

async function triggerDemo() {
    return fetchData(endpoint, {}, { method: method });
}

export { triggerDemo };
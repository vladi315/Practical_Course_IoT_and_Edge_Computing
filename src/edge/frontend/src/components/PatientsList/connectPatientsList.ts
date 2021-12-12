import { getData, fetchData } from "../../apis/api";

const endpoint = "/database/patients";

async function getPatients() {
    return getData(endpoint);
}

const method = "POST";
const endpoint_dispenser = "/dispense";

async function triggerDispenser(id: number, tod: number) {
    let kwargs = `?patientnr=${id}&tod=${tod}`;
    return fetchData(endpoint_dispenser + kwargs, {}, { method: method });
}

export { getPatients, triggerDispenser };

import { fetchData } from "../../apis/api";

const endpoint = "/database/patient/schedule/";
const method = "POST";

async function setPillExecution(patientennr: string, entry: string[][][]) {
    let body_data = {
        entry: entry
    }
    return fetchData(endpoint + patientennr, body_data, { method: method });
}

export { setPillExecution };

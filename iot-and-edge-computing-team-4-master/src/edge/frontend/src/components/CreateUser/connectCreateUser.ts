import { fetchData } from "../../apis/api";
import { FetchError } from "../../apis/FetchError";

const endpoint = "/database/patient/change";
const method = "POST";

interface ApiDict {
    data: any;
    error: FetchError | null;
  }
  

async function setUser(name: string, leavingDate: string, age: string, location: string): Promise<ApiDict> {
    let body_data = {
        entry: {
            name: name,
            leavingdate: leavingDate,
            age: age,
            location: location,
            pills: []
        }
    };
    let kwargs = "?action=add";
    return fetchData(endpoint + kwargs, body_data, { method: method });
}

export { setUser };

import {postRequest} from "../libs/AxiosService.util";

export async function serviceGetInventoryList (params) {
    return await postRequest('products/detail', params);
}

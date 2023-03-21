import {formDataRequest} from "../libs/AxiosService.util";


export async function serviceCreateVacancy(params) {
    return await formDataRequest('vacancies/create', params);
}

export async function serviceGetVacancies(params) {
    return await formDataRequest('vacancies', params);
}

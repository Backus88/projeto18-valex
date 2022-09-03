import { findByApiKey } from "../repositories/companyRepository";

export async function containsApiKey (apiKey : string){
    const thereIsApi = await findByApiKey(apiKey);
    console.log(thereIsApi);
    if(!thereIsApi){
        throw notFoundError('Api-key');
    }
    return thereIsApi;
}

function notFoundError(entity : any) {
	return {
		type: "error_not_found",
		message: `Could not find specified "${entity}"!`
	};
}
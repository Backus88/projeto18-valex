export function notFoundError(entity : string) {
	return {
		type: "error_not_found",
		message: `Could not find specified "${entity}"!`
	};
}

export function notValidEntrie (entity: string){
    return {
		type: "error_not_valid",
		message: `Not valid "${entity}"!`
	};
}

export function notPossibleOperation(entity:string){
	return {
		type: "error_not_possible",
		message: `Not possible "${entity} "already exists!`
	};
}

export function notAuthorized(entity: string){
	return {
		type: "error_not_authorized",
		message: `This"${entity} " isn't authorized!`
	};
}
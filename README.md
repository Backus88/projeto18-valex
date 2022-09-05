# projeto18-valex

### 1- Create CardRoute:
Route:(POST, http://localhost:4000/card).
Header:x-api-key, example: x-api-key = zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0.
Body: JSON, {
		"employeeId": number,
    "type": *transactionType
}
Example of Body = {
		"employeeId": 1,
    "type": "transport"
}


*transactionType = ['groceries', 'restaurant', 'transport', 'education', 'health'].

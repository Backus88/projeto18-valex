# projeto18-valex

### 1- Create CardRoute:
Route:(POST, http://localhost:4000/card).

Header:x-api-key, example: x-api-key = zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0.

Body: JSON, {
		"employeeId": number,
    		"type": (1)transactionType
}

Example of Body = {
		"employeeId": 1,
    		"type": "transport"
}

Return:Status 201(created); Return a object that allows the user to test the other routes.

Example of return= {
	"employeeId": 1,
	"number": "3698-030583-9194",
	"cardholderName": "FULANO R D SILVA",
	"securityCode": "557",
	"expirationDate": "09/27",
	"isVirtual": false,
	"isBlocked": false,
	"type": "transport"
}

### 2- Activate CardRoute:
Route: (POST,http://localhost:4000/card/activation).

Header: none.

Body: JSON, {
	"password":(2)string,
	"number":string,
	"cardholderName": string,
	"securityCode": (3)string,
	"expirationDate": string
}
Return Status 201(created);

### 3- Block CardRoute:
Route: (POST,(http://localhost:4000/card/block)

Header: none.

Body: JSON, {
	"password":(2)string,
	"number":string,
	"cardholderName": string,
	"expirationDate": string
}

Return Status 201(created);

### 4- unBlock CardRoute:
Route: (POST,(http://localhost:4000/card/unblock)

Header: none.

Body: JSON, {
	"password":(2)string,
	"number":string,
	"cardholderName": string,
	"expirationDate": string
}

Return Status 201(created);


### 5- showTransactions CardRoute:
Route: (GET,(http://localhost:4000/card/:id)

Header: none.

Body: none.

Return Status 200(OK); Return a object type ={
	"balance": number,
	"transactions": [
		{
			"id": number,
			"cardId": number,
			"businessId": number,
			"timestamp": string,
			"amount": number,
			"businessName": string
		}
	],
	"recharges": [
		{
			"id": number,
			"cardId": number,
			"timestamp": string,
			"amount":number
		}
	]
};

### 6- rechargeCard RechargeRoute:
Route (POST, (http://localhost:4000/recharge))

Header:x-api-key, example: x-api-key = zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0.

Body:JSON, {
	"amount": (4)number,
	"employeeId":(4)number,
	"type": transactionType
}

Return Status 201(created);

### 7- paymentCard PaymentRoute:
Route (POST, (http://localhost:4000/payment))

Header:none

Body:JSON, {
	"password": (2)string,
	"cardId": (4)number,
	"businessId": (4)number,
	"amount": (4)number
}

Return Status 201(created);


### Comments:
(1)transactionType = ['groceries', 'restaurant', 'transport', 'education', 'health'].

(2)Allows only numeric strings with length = 4.

(3)Allows only numeric strings with length = 4.

(4)Allows only numbers greater than 0.

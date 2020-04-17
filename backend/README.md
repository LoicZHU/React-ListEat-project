Requêtes JSON

-------------------------------------
/api/tickets

{
	"lastName": "Oclock",
	"firstName": "Jean",
	"cellPhone": "0612345678",
	"email": "jean@oclock.io",
	"restaurant": 1,
	"ticket": {
		"coversNb": 10
	}
} 
-------------------------------------

/api/partner

{
"email": "toto@gmail.com",
"password": "toto",
"lastName": "HUGUENY",
"firstName": "damien",

 "restaurant":{
	"siret_code": "49066714400011",
	"name": "CHEZ BABA",
	"address": "2 Place de la République",
	"postcode": 69002,
	"city": "Lyon",
          
	"country": "FRANCE",
	"phone": "0620323333",
	"average_eating_time": 45,
	"seat_nb": 60
	}
}

------------------------------------------
/api/partner/login

{ 
	"username": "damiende@gmil.om", "password": "toto" 
}
------------------------------------------
/api/tickets/id PUT

{
	"validation": "cancel"
} 


-------------------------------------------
/forgotten-password

{"username": "blabla@bla.com"}

--------------------------------------------
/forgotten-password/confirmation

{
"securityCode":"NwE4Ajfs45fe",
"userId": 4,
"newPassword":"blabla"
}

--------------------------------------------
/api/partner/{id<\d+>}/status PUT

{
	"status": "on" / "off"
}

-----------------------------------------
/api/partner/{id<\d+>}/eating-time PUT

{
	"addedTime": 25
}
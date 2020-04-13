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
"email": "anTHIuvfvfvoipR@gmail.com",
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
	"seat_nb": 60,
	"status" : 1
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

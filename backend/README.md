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
	"username": "toto@toto.fr", "password": "toto" 
}
------------------------------------------
/api/tickets/id PUT

{
	"ticket": {
		"id": 4,
		"validation": "cancel" / "validate"
	}
} 

-------------------------------------------

bin/console d:m:m

composer require nelmio/cors-bundle

CORS_ALLOW_ORIGIN=^https?://localhost:?[0-9]*$


    Content-Type: application/json
    
	siretcode : 49066714400011

	http://localhost:8001/_profiler/83f5b0

# Requêtes JSON API ![Logo legalistEat](./ressource/logo/LogoListEat.png)

URL|Contrôleur|Méthode|Paramètres|Description|
|---|---|---|---|---|
|/api/tickets |TicketController|POST|JSON|Création d'un ticket|
|/api/partner|RestaurantController|POST|JSON|Création d'un restaurant et d'user|
|api/partner/{id}|PUT|JSON+Id restaurant|Modification données User et restaurant|

//TODO NEXT

-------------------------------------
### /api/tickets **POST**

>{
>	"lastName": "Oclock",
>	"firstName": "Jean",
>	"email": "jean@oclock.io",
>	"restaurant": 1,
>	"ticket": {
>		"coversNb": 10
>	}
>}
-------------------------------------

### /api/partner **POST**

> {
> "email": "toto@gmail.com",
> "lastName": "HUGUENY",
> "firstName": "damien",
> "restaurant":{
>	"siret_code": "49066714400011",
>	"name": "CHEZ BABA",
>	"postcode": 69002,
>	"city": "Lyon",
>	"country": "FRANCE",
>	"phone": "0620323333",
>	"average_eating_time": 45,
>	"seat_nb": 60
>	}
>}

------------------------------------------
### api/partner/{id} **PUT**

>{
>	"restaurant":{
>		"name":"chez couscous"
>	},
>	"user":{
>			"password":"toto12345"
>	},
>	"currentpassword":"toto1234"
>}
>}

------------------------------------------
### /api/partner/login **POST**
>{
>	"username": "damiende@gmil.om", "password": "toto"
>}
------------------------------------------
### /api/tickets/id **PUT**

>{
>	"validation": "cancel"
>}
-------------------------------------------
### /forgotten-password **POST**

> {"username": "blabla@bla.com"}

--------------------------------------------
### /forgotten-password/confirmation **POST**

> {
> securityCode":"NwE4Ajfs45fe",
> "userId": 4,
> "newPassword":"blabla"
> }

--------------------------------------------
### /api/partner/{id<\d+>}/status **PUT**

> {
>	"status": "on" / "off"
> }

-----------------------------------------
### /api/partner/{id<\d+>}/eating-time **PUT**

> {
>	"addedTime": 25
> }

------------------------------------------
### /api/partner/{id<\d+>}/tickets/{ticketId<\d+>} **PUT**

> {
>    "status": "seated" / "cancelled" / "restored"
> }

-------------------------------------------
### /api/decrypt **GET**

> {"restaurant": "**MA CHAINE A DECRYPTER**"}

-------------------------------------------
### /api/partner/{id>\d+>}/qrcode **POST**

**id correspond à celui du restaurant**

### return

>{
>  "QrCodeUrl": "**adresse du Qrcode sur le serveur**",
>  "message": "Qrcode généré"
>}

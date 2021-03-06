# Requêtes JSON API ![Logo legalistEat](./ressource/logo/LogoListEat.png)

URL|Contrôleur|Méthode|Paramètres|Description|
|---|---|---|---|---|
|/api/tickets |TicketController|POST|JSON|Création d'un ticket|
|/api/partner|RestaurantController|POST|JSON|Création d'un restaurant et d'user|
|api/partner/{id}|RestaurantController|PUT|JSON+Id restaurant|Modification données User et restaurant|
|api/partner/{id}|RestaurantController|GET|Id restaurant|Visualiser le profil du restaurateur|

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
>		"name":"chez O'restaurant"
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
### /api/decrypt/tickets **POST**

> {"ticket": "**MA CHAINE A DECRYPTER**"}

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
>	"addedTime": 5 / -5
> }

------------------------------------------
### /api/partner/{id<\d+>}/tickets/{ticketId<\d+>} **PUT**

> {
>    "status": "confirmed" / "seated" / "cancelled" / "restored"
> }

-------------------------------------------
### /api/decrypt **POST**

> {"restaurant": "**MA CHAINE A DECRYPTER**"}

-------------------------------------------
### /api/partner/{id>\d+>}/qrcode **POST**

**id correspond à celui du restaurant**

### return

>{
>  "QrCodeUrl": "**adresse du Qrcode sur le serveur**",
>  "message": "Qrcode généré"
>}

-------------------------------------------

# Command

> bin/console app:send:notif

_____________[currentTime]_________[Ticket]_____[currentTime+5]___________ 

**Permet d'envoyer une notification par mail à tous les tickets dont 'estimated hour' est inférieur à current time + 5 min
et dont le status = 1 et que le statusNotification = 0.
Cette commande change le status notification à 1 et écrit dans le fichier diary/notification.txt les notifs envoyer ainsi que l'heure.
Elle sera éxécuté toutes les 5 minutes par le biai  d'une tâche crone.** 

pour éditer le fichier des taches cron 

> crontab -e

mettre cette ligne dedans
> 5 * * * *  /usr/bin/php   /var/www/html/projet-list-eat/backend/bin/console app:send:notif --env=prod

> Connaitre le  chemin absolu vers le binaire PHP CLI  
>  **which php** ou **whereis php**

## Modifier le fuseau horaire via .htaccess
Rajouter cet ligne
> SetEnv TZ Europe/Paris

# Dépendances Utilisés

> phpseclib/phpseclib:~2.0 : cryptage Encryptage  
> mashape/unirest-php : facilite l'appel d'un api  
> nelmio: gestion des CORS  
> endroid/qrcode : pour la création de QR codes  
> imal-h/pdf-box : pour convertir jpg to pdf  


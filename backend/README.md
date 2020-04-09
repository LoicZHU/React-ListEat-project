Requetes JSON


{
"role": {
    "id": 1,
  "name": "ROLE_USER",
  "label": "ROLE_USER"
  },
"email": "anTHIuvfvfvoipR@gmail.com",
"password": "toto",
"lastName": "HUGUENY",
"firstName": "damien",


 "restaurant":{
	"siret_code": "12345678912345",
	"name": "CHEZ BABA",
	"address": "3 rue du slip",
	"postcode": 71200,
	"city": "lille",
	"country": "FRANCE",
	"phone": "0620323333",
	"average_eating_time": 45,
	"seat_nb": 60,
	"status" : 1
	}
}



UserController.php on line 44:
{#585 ▼
  +"role": "ROLE_USER"
  +"email": "anTHIuvfvfvoipR@gmail.com"
  +"password": "toto"
  +"lastName": "HUGUENY"
  +"firstName": "damien"
  +"restaurant": {#586 ▼
    +"siret_code": "12345678912345"
    +"name": "CHEZ BABA"
    +"address": "3 rue du slip"
    +"postcode": 71200
    +"city": "lille"
    +"country": "FRANCE"
    +"phone": "0620323333"
    +"average_eating_time": 45
    +"seat_nb": 60
    +"status": 1
  }
}

UserController.php on line 49:
App\Entity\Role {#886 ▼
  -id: null
  -name: null
  -label: null
}

UserController.php on line 25:
{#736 ▼
  +"role": 1
  +"email": "anTHIuffvoipR@gmail.com"
  +"password": "toto"
  +"lastName": "HUGUENY"
  +"firstName": "damien"
  +"restaurant": {#737 ▼
    +"siret_code": "12345678912345"
    +"name": "CHEZ BABA"
    +"address": "3 rue du slip"
    +"postcode": 71200
    +"city": "lille"
    +"country": "FRANCE"
    +"phone": "0620323333"
    +"average_eating_time": 45
    +"seat_nb": 60
    +"status": 1
  }
}


{
"user":{
	"email": "anTHIufhtoipR@gmail.com",
"password": "toto",
"lastName": "HUGUENY",
"firstName": "damien"

},

 "restaurant":{
	"siret_code": "12345678912345",
	"name": "CHEZ BABA",
	"address": "3 rue du slip",
	"postcode": 71200,
	"city": "lille",
	"country" :"",
	"phone": "0620323333",
	"average_eating_time": 45,
	"seat_nb": 60,
	"status" : 1
	}
}

Attempted to call an undefined method named "getPropertyPath" of class "Symfony\Component\Validator\ConstraintViolationList".


{
	"email": "anTHIuftoipR@gmail.com",
"password": "toto",
"lastName": "HUGUENY",
"firstName": "damien",



 "restaurant":{
	"siret_code": "12345678912345",
	"name": "CHEZ BABA",
	"address": "3 rue du slip",
	"postcode": 71200,
	"city": "lille",
	"country" :"",
	"phone": "0620323333",
	"average_eating_time": 45,
	"seat_nb": 60,
	"status" : 1
	}
}


 /**
     * @Assert\Email(
     *     message = "The email '{{ value }}' is not a valid email."
     * )
     */

      json_login:
                check_path: /api/login

            form_login:
                login_path: login
                check_path: login
                username_parameter: login[_username]
                password_parameter: login[_password]

            logout:
                path:   /logout
                target: /




Call to a member function getUsername() on null

   public function login(Request $request)    {        $user = $this->getUser();        return $this->json([            'username' => $user->getUsername(),            'roles' => $user->getRoles(),        ]);    }


{
    "username": "toto@toto.fr",
    "password": "toto"
}

{
  "username": "toto@toto.fr",
  "roles": [
    "ROLE_USER"
  ]
}
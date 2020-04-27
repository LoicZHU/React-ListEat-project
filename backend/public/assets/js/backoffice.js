let app = {

  //WARNING BIEN MODIFIER EN PROD
  //apiBaseURL: 'http://localhost:8001/',
  apiBaseURL: 'https://www.listeat.io:8080/',
  // Méthode executée au lancement de l'application
  init: function () {
    console.log('init');

    app.initMap();
    app. webSocket();

  },

  webSocket: function(){

    // On va se placer sur le topic "ticket" partout
    var topic = 'backoffice';
    // Note: je vais utiliser partout ici des templates litterals JS, plus lisibles,
    // au lieu de quotes on a des backtics (`), et deans on peut afficher des variables avec ${}.
    //scoreBoard.insertAdjacentHTML('beforeEnd', `Écoute du topic ${topic}`);

    //Ici l'adresse du serveur Mercure
    const url = new URL('https://www.listeat.io/hub/.well-known/mercure');
    // Et on rajoute les topics auxquels s'inscrire (en paramètre GET)
    url.searchParams.append('topic', `https://www.listeat.io/${topic}`);

    const eventSource = new EventSource(url);

    console.log('Client démarré!');
    // Ce callback sera appelé à chaque réception de message
    //A toi sylvain de le tuner
    eventSource.onmessage = function(event) {

      //On appel l'Api pour mettre à jour les imformations
      let fetchOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
      };
      fetch(app.apiBaseURL + 'back/office', fetchOptions)
      // .then(app.convertJSONtoJS)
      .then(
        function (response) {
          return response.json();
        }
      )
      .then(
        function (jsonResponse) {

          console.log(jsonResponse);
          console.log(`Reçu un message avec l\'ID ${event.lastEventId}`);

          const details = JSON.parse(event.data);

          let ticket = document.getElementById('ticketNb').textContent = jsonResponse['ticketNb'];
          let userNb = document.getElementById('user').textContent = jsonResponse['userNb'];
          let customer = document.getElementById('customer').textContent = jsonResponse['customer'];

          let ticketsCancelled = document.getElementById('cancelled').textContent = jsonResponse['ticketsCancelled'];
          let waiting = document.getElementById('waiting').textContent = jsonResponse['waiting'];
          let coversNb = document.getElementById('coversNb').textContent = jsonResponse['coversNb'];
          //scoreBoard.insertAdjacentHTML('beforeEnd', `<p>${details.eventName}</p>`);

        }
      );
    } 
  },  

  initMap: function () {
    map = new google.maps.Map(document.getElementById("map"), {
      center: new google.maps.LatLng('47.152969', '2.349903'),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      scrollwheel: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
      },
      navigationControl: true,
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.ZOOM_PAN
      }

    });

    let fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    };
    fetch(app.apiBaseURL + 'back/office/user', fetchOptions)
    // .then(app.convertJSONtoJS)
    .then(
      function (response) {
        return response.json();
      }
    )
    .then(
      function (jsonResponse) {
        // Nous parcourons la liste des villes
        for (let i = 0; i < jsonResponse.length; i++) {
          var marker = new google.maps.Marker({
            // A chaque boucle, la latitude et la longitude sont lues dans le tableau
            position: { lat: parseFloat(jsonResponse[i]['latitude']), lng: parseFloat(jsonResponse[i]['longitude']) },
            // On en profite pour ajouter une info-bulle contenant le nom de la ville
            title: `restaurant: ${jsonResponse[i]['name']}`,
            map: map
          });
        }
      }
    );
  }

}

app.init()
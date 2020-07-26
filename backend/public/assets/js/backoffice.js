let app = {

  //WARNING BIEN MODIFIER EN PROD
  //apiBaseURL: 'http://localhost:8000/',
  //apiBaseURL: 'https://www.listeat.io:8080/',
  apiBaseURL: 'http://ec2-100-26-241-214.compute-1.amazonaws.com:8080/',

  // Méthode executée au lancement de l'application
  init: function () {
    //console.log('init');

    app.initMap();
    app.webSocket();
    app.addAllEventListeners();
    
  },

  addAllEventListeners: function() {
    console.log('coucou');
    // On récupère l'élément <select> des jeux vidéo
    let selectElement = document.getElementById('bouton_service');
    // On ajoute l'écouteur pour l'event "change"
    selectElement.addEventListener('click', app.handleSubmitCheck);
  },

  handleSubmitCheck: function(evt) {
    app.spine1();
    setTimeout(app.spine2, 700);
    setTimeout(app.spine3, 1000);
    setTimeout(app.spine4, 1200);
    setTimeout(app.spine5, 1300);
    setTimeout(app.spine6, 1450);
    setTimeout(app.spine7, 1700);

    
    // https://developer.mozilla.org/fr/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
   
    let fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        // les données doivent être envoyées dans un format
        // spécifique pour que Lumen arrive à les lire
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
    };
    //fetch('https://www.listeat.io:8080/back/office/test', fetchOptions)
    fetch('http://ec2-100-26-241-214.compute-1.amazonaws.com:8080/back/office/test', fetchOptions)
    .then(app.convertJSONtoJS)
    .then(function(jsonResponse){
      console.log(jsonResponse);
      setTimeout(function(){
        if(jsonResponse[0]['login'] == true){
          document.getElementById('login').className = "fas fa-bolt fa-1x ok pr-3";
        }else{
          document.getElementById('login').className = "fas fa-bolt fa-1x bad pr-3";
        }

        if(jsonResponse[1]['ticket_add'] == true){
          document.getElementById('ticket_add').className = "fas fa-bolt fa-1x ok pr-3";
        }else{
          document.getElementById('ticket_add').className = "fas fa-bolt fa-1x bad pr-3";
        }

        if(jsonResponse[2]['ticket_edit'] == true){
          document.getElementById('ticket_edit').className = "fas fa-bolt fa-1x ok pr-3";
        }else{
          document.getElementById('ticket_edit').className = "fas fa-bolt fa-1x bad pr-3";
        }

        if(jsonResponse[3]['restaurant_show'] == true){
          document.getElementById('restaurant_show').className = "fas fa-bolt fa-1x ok pr-3";
        }else{
          document.getElementById('restaurant_show').className = "fas fa-bolt fa-1x bad pr-3";
        }

        if(jsonResponse[4]['restaurant_edit'] == true){
          document.getElementById('restaurant_edit').className = "fas fa-bolt fa-1x ok pr-3";
        }else{
          document.getElementById('restaurant_edit').className = "fas fa-bolt fa-1x bad pr-3";
        }

        if(jsonResponse[5]['islogged'] == true){
          document.getElementById('is_logged').className = "fas fa-bolt fa-1x ok pr-3";
        }else{
          document.getElementById('is_logged').className = "fas fa-bolt fa-1x bad pr-3";
        }

        if(jsonResponse[6]['logout'] == true){
          document.getElementById('logout').className = "fas fa-bolt fa-1x ok pr-3";
        }else{
          document.getElementById('logout').className = "fas fa-bolt fa-1x bad pr-3";
        }
      }, 1750);
    });
  },

  spine1: function(){
    document.getElementById('login').className = "spinner-border spinner-border-sm spiner";
  },
  spine2: function(){
    document.getElementById('ticket_add').className = "spinner-border spinner-border-sm spiner";
  },
  spine3: function(){
    document.getElementById('ticket_edit').className = "spinner-border spinner-border-sm spiner";
  },
  spine4: function(){
    document.getElementById('restaurant_show').className = "spinner-border spinner-border-sm spiner";
  },
  spine5: function(){
    document.getElementById('restaurant_edit').className = "spinner-border spinner-border-sm spiner";
  },
  spine6: function(){
    document.getElementById('is_logged').className = "spinner-border spinner-border-sm spiner";
  },
  spine7: function(){
    document.getElementById('logout').className = "spinner-border spinner-border-sm spiner";
  },

  convertJSONtoJS: function (response) {
    //console.log(response);
    if (!response.ok) {
      throw "Erreur";
    }
    return response.json();
  },

  webSocket: function(){

    // On va se placer sur le topic "ticket" partout
    var topic = 'backoffice';
    // Note: je vais utiliser partout ici des templates litterals JS, plus lisibles,
    // au lieu de quotes on a des backtics (`), et deans on peut afficher des variables avec ${}.
    //scoreBoard.insertAdjacentHTML('beforeEnd', `Écoute du topic ${topic}`);

    //Ici l'adresse du serveur Mercure
    // const url = new URL('https://www.listeat.io/hub/.well-known/mercure');
    const url = new URL('http://ec2-100-26-241-214.compute-1.amazonaws.com:3000/.well-known/mercure');
    // Et on rajoute les topics auxquels s'inscrire (en paramètre GET)
    // url.searchParams.append('topic', `https://www.listeat.io/${topic}`);
    url.searchParams.append('topic', `http://ec2-100-26-241-214.compute-1.amazonaws.com/${topic}`);

    const eventSource = new EventSource(url);

    //console.log('Client démarré!');
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

          //console.log(jsonResponse);
          //console.log(`Reçu un message avec l\'ID ${event.lastEventId}`);

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
            animation: google.maps.Animation.DROP,
            position: { lat: parseFloat(jsonResponse[i]['latitude']), lng: parseFloat(jsonResponse[i]['longitude']) },
            // On en profite pour ajouter une info-bulle contenant le nom de la ville
            title: `restaurant: ${jsonResponse[i]['name']}`,
            map: map
          });
          
        }

        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
        
      }
    );
  }

}

app.init()
  mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('header.mdc-top-app-bar'));
  const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
  document.querySelector(".mdc-top-app-bar__navigation-icon").addEventListener("click", (e) => {
      drawer.open = true;
  });

  const viewsDis = () => {
      document.querySelectorAll("div.view").forEach((item) => {
          item.style.display = "none";
      })
  }
  
  document.querySelectorAll("aside.mdc-drawer a.mdc-list-item").forEach(item => {
      item.addEventListener("click", (event) => {
          viewsDis();
          let ref = item.getAttribute("href");
          document.querySelector(ref).style.display = "block";
          drawer.open = false;
      })
  })

   let apiEndpoint = "https://data.cityofchicago.org/resource/ijzp-q8t2.json";
  let url = apiEndpoint;
  document.querySelector("#searchButton").addEventListener("click", (event) => {
      let va = document.querySelector("#searchOp").value;
      let searchVal = va.toUpperCase();
      let newUrl = url + "&primary_type=" + encodeURI(searchVal);
      console.log(newUrl);
      fetch(url).then(response => {
          return response.json()
      })
          .then((json) => {
          
          for(let record of json) {
              
                  let listCl = document.querySelector(".clone-list").cloneNode(true);
                  listCl.classList.remove("view");
                  listCl.querySelector(".mdc-list-item__primary-text").textContent = "Description: " + record["description"];
                  listCl.querySelector(".mdc-list-item__secondary-text").textContent = "Address: " + record["block"];
                     let l = document.querySelector("ul").appendChild(listCl);
                  console.log(l);
                  
              
            
          }
    
      });
  });


    document.querySelector("#searchButton2").addEventListener("click", (event) => {
        initMap();  
    })

     let map;
      initMap = () => {
        let map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.8, lng: -87.5},
          zoom: 8
        });
          
        
 
     let mapVa = document.querySelector("#searchMap").value;
      let mapValUp = mapVa.toUpperCase();
      let mapUrl = url + "&primary_type=" + encodeURI(mapValUp);
      fetch(url).then(response => {
          return response.json()
      })
          .then((json) => {
          for(let rec of json) {

        let inf = '<div id="content">'+ '<div id="siteNotice">' + '</div>'+ '<h1 id="firstHeading" class="firstHeading">'+ rec["description"] + '</h1>'+ '<div id="bodyContent">' + rec["block"] + '<p>' + rec["date"].split("T",1) + '</div>'+'</div>';
        let infowindow = new google.maps.InfoWindow({content: inf});
        let marker = new google.maps.Marker({
          position: {lat: parseFloat(rec["latitude"]), lng: parseFloat(rec["longitude"])},
          map: map,
          title: rec["primary_type"]
        });
        marker.addListener('click', (evt) => {
          infowindow.open(map, marker);
        });
          
        }   
          })
          }


if("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/serviceWorker.js").then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
    });
}
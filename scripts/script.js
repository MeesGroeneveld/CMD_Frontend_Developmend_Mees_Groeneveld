// JavaScript Document
console.log("aaaaah");

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function createCaroCarrousel(carrouselID) {
	let carrousel = document.querySelector("#"+carrouselID);
  let carrouselElementsContainer = carrousel.querySelector(":scope > ul");
	let carrouselElements = carrouselElementsContainer.querySelectorAll("li");
  let linkButtons = carrousel.querySelectorAll(":scope > a");
  
  
  /*****************************/
	/* LINKS/RECHTS LINK-BUTTONS */
	/*****************************/  

	// de links/rechts link-buttons initialiseren en activeren
  function iniLinkButtons() {    
    for(linkButton of linkButtons) {
			// beide link-buttins naar kliks laten luisteren
      linkButton.addEventListener("click", function(e){
        // als er geklikt wordt
				// de default-actie (de link volgen) niet uitvoeren
				e.preventDefault();

				// bepalen of er op 'previous' of 'next' geklikt is
				let direction = this.getAttribute("href");
				// naar het element gaan
				goToElement(direction);
      });
    }
	}
  
  
  /*****************/
	/* START POSITIE */
	/*****************/
  
	// het eerste element actief maaken
  function iniStartPosition() {
    // eerste element current maken
    carrouselElements[0].classList.add("current");
		// aan het begin van de container starten
    carrouselElementsContainer.scrollLeft = 0;
  }
  
  
  /*********************/
	/* ALGEMENE FUNCTIES */
	/*********************/
  
  //////////////////////////////////
  // naar volgende/vorige element //
  function goToElement(direction) {
		// het huidige current element opzoeken
		let currentElement = carrousel.querySelector(":scope > ul > .current");

		let newElement;
		if (direction == "previous") {
			// het nieuwe element is het vorige broertje/zusje
			newElement = currentElement.previousElementSibling;
			// checken of nieuwe element bestaat - anders naar laatste
			if (!newElement) {
				newElement = carrousel.querySelector(":scope > ul > li:last-of-type");
			}
		} else {
			// het nieuwe element is het volgende broertje/zusje
			newElement = currentElement.nextElementSibling;
			// checken of nieuwe element bestaat - anders naar eerste
			if (!newElement) {
				newElement = carrousel.querySelector(":scope > ul > li:first-of-type");
			}
		}

		// naar het nieuwe element scrollen
		scrollToElement(newElement);
  }
  
  
  ///////////////////////////
  // scroll to new element //
  function scrollToElement(newElement) {
    // carousel container opzoeken
    let carouselElementsContainer = newElement.closest("ul");

		// de linker offset van het nieuwe element bepalen 
		let newElementOffset = newElement.offsetLeft;
		
		// de carousel naar de berekende positie scrollen
		carouselElementsContainer.scrollTo({
			left: newElementOffset
		});
    
    // nieuwe element current element maken
    updateCurrentElement(newElement);
  }
  
  
  ////////////////////////////
	// update current element //
	function updateCurrentElement(newElement) {
		// het huidige current element opzoeken
		let currentElement = carrousel.querySelector(":scope > ul > .current");
		// de class current verwijderen
		currentElement.classList.remove("current");

		// de class current toevoegen
		newElement.classList.add("current");
	}
  
  
  // de linkbuttons activeren
  iniLinkButtons();	
  // de carrousel bij het begin starten
  iniStartPosition();
}


/************************/
/* DE CARROUSEL CREËREN */
/************************/

// nadat de pagina geladen is, de carrousels activeren
(function() {
  // hier de id gebruiken van de section in de html
  createCaroCarrousel("justButtons");
  //je kunt hier ook meerdere carrousellen activeren
})();
	
	
	// All of the images to be loaded  are in the images array
	let images = ["burger.png", "burrito.png", "chips.png", "fries.png", "pizza.png", "sandwich.png"];
	let dogMouthX = 400 + 145; //dog's mouth X position
	let dogMouthY = 400 + 105; // dog's mouth Y position
	// If animatingDogFood[x] = true, must be animated towards dog's mouth ,if False will stop animation(mouth)
	let animatingDogFood = {};
	let initialFoodMouthDistance = [];
	let currentFoodMouthDistance = [];
	let foodAngle = []; // food angle relative to mouth  horizontal line 
	let distancePerCycle = 1; //  1 animation cycle per every 10ms.
	let anglePerCycle = Math.PI / 90; // increased 1 animation cycle every 10ms.(Spiral effect).
	let imageEls = []; // All of the image elements. Populated in load()
	// for each image in the image names array

	function load() {
	    for (var i = 0; i < images.length; i++) {
	        let distance = 200 + (Math.random() * 200); // the max initial distance set in the range 200-400
	        initialFoodMouthDistance.push(distance); // Add the initial distance to the array  
	        currentFoodMouthDistance.push(distance); // Add the current distance to the  array.
	        let angle = 2 * Math.random() * Math.PI; //Random angle from 0-2*PI,This is the initial angle.
	        foodAngle.push(angle);
	        let image = new Image();
	        image.src = images[i]; // Add the image to the source.
	        image.setAttribute('class', 'food'); // Set the style class "food"
	        image.setAttribute('imgNo', i); // for referring to the image. 
	        document.getElementById('images').appendChild(image); // Append it to the "images" container.
	        //set the top/left attribute of the food.
	        image.style.top = (dogMouthY - (Math.sin(angle) * distance) - 50) + "px"; //food top/Trigonometry 
	        image.style.left = (dogMouthX + (Math.cos(angle) * distance) - 50) + "px"; //food left/Trigonometry
	        // When clicked, just adds the index clicked to animatingDogFood


	        image.addEventListener('click', function(e) {
	            animatingDogFood[parseInt(e.target.getAttribute('imgNo'))] = true;
	        });

	        imageEls.push(image); // Adds the image element to the array.

	    }
	}

	function animate() {
	    for (var i in animatingDogFood) {
	        // If the image at index i is done animating, ignore.
	        if (!animatingDogFood[i]) {
	            continue;
	        }
	        // If the image distance from dog's mouth is less than 3px, we assume it has reached the destination.
	        // At that point, we hide the image and mark animation done by setting animatingDogFood[i] = false.
	        if (currentFoodMouthDistance[i] <= 3) {
	            currentFoodMouthDistance[i] = 0;
	            // Hide the food image.
	            imageEls[i].style.display = "none";
	            animatingDogFood[i] = false;
	            continue;
	        }
	        // Otherwise animate.
	        animateSingle(i);
	    }
	}

	function animateSingle(i) {
	    let image = imageEls[i]; // Get the current image element.
	    foodAngle[i] = foodAngle[i] + anglePerCycle; // Increase the angle as per the cycle.
	    currentFoodMouthDistance[i] = currentFoodMouthDistance[i] - distancePerCycle; // Decrease the distance as per the cycle.

	    // Adjust the image width with respect to the initial distance.
	    // If the distance travelled already is half, then the food shouldlook half of its initial size.
	    let width = (100 * currentFoodMouthDistance[i]) / initialFoodMouthDistance[i];
	    let height = (100 * currentFoodMouthDistance[i]) / initialFoodMouthDistance[i];
	    // Set the properties in the image element.
	    image.style.height = height + "px";
	    image.style.width = width + "px";
	    image.style.top = (dogMouthY - (Math.sin(foodAngle[i]) * currentFoodMouthDistance[i]) - (height / 2)) + "px";
	    image.style.left = (dogMouthX + (Math.cos(foodAngle[i]) * currentFoodMouthDistance[i]) - (width / 2)) + "px";
	}

	function feedAll() {
	    for (var i = 0; i < images.length; i++) {
	        animatingDogFood[i] = true;
	    }
	}

	window.setInterval(animate, 20);
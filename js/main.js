var artists = [
	{
		name : 'Derp City Blues',
		imageFile : 'b1.jpg'
	},
	{
		name: 'CR-39',
		imageFile : 'b2.jpg'
	},
	{
		name : 'Aire Tech',
		imageFile : 'b3.jpg'
	}
];
var index = 0;

var arrows = document.querySelectorAll('.arrow');
for (i = 0; i < arrows.length; i++) { 
	arrows[i].addEventListener('click', function (e) { 
		e.preventDefault();
		var currentImage = document.querySelectorAll('.carousel .artist-image')[index];
		if (e.currentTarget.classList.contains('left')) {
			index--;
			if (index < 0) {
				index = artists.length-1;
			}
		} else {
			index++;
			if (index > artists.length-1) {
				index = 0;
			}
		}

		document.querySelector('.carousel .artist-name').innerHTML = artists[index].name;

		currentImage.classList.add('offscreen');
		currentImage.classList.remove('onscreen');

		nextImage = document.querySelectorAll('.carousel .artist-image')[index];
		nextImage.classList.add('onscreen');
		nextImage.classList.remove('offscreen');
	});
}

// TODO: set year 
// document.querySelector('.date').text()

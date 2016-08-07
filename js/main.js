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

document.querySelectorAll('.arrow').forEach(function (el) {
	alert('load');
	el.addEventListener('click', function (e) { 
		alert('yo');
		e.preventDefault();
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
		document.querySelector('.carousel .artist-image').src = 'assets/' + artists[index].imageFile;
	});
});

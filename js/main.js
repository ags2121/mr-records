
// TODO: set year 
// document.querySelector('.date').text()

// NEWS
var html = ""
news.forEach(function(el) { 
	newsItem = 
		"<li>" +
			"<div class='title'>" + el.title + "</div>" +
			"<small class='date'>Posted on " + formatDate(el.date) + "</small>" +
			"<div class='body'>" + el.body + "</div>" +
		"</li>";
	html += newsItem;
})
document.querySelector('.news-list').innerHTML = html;

// ARTISTS
var artistPopoverHtml = "";
var carouselHtml = "";
var artistListHtml = "";
artists.forEach(function(artist, i) {
	artistPopoverHtml +=
	'<li class="popover-item">' +
  		'<a class="popover-link" href="#artists/'+ toId(artist.name) + '">' + artist.name + '</a>' +
	'</li>';

	if (i === 0) {
		carouselHtml += 
		'<a class="artist-info" href="#artists/' + toId(artist.name) + '">' +
		  '<small class="artist-name">'+ artist.name + '</small>' +
		'</a>';
	}

	carouselHtml += 
	'<a class="artist-image ' + ((i === 0) ? "onscreen" : "offscreen") + '" href="#artists/'+ toId(artist.name) +'">' + 
		'<img src="assets/'+ artist.imageFile + '"/>' + 
	'</a>';

	artistReleases = "";
	artist.releases.forEach(function(rel) {
		artistReleases += 
		'<li>' +
			'<div class="row">' +
			  '<img src="assets/' + rel.imageFile + '"/>' +
			  '<div class="release-name">"'+ rel.name + '"</div>' +
			  '<div>' + rel.type + ' * ' + rel.year + ' * ' + rel.id + '</div>' +
			'</div>'
		'</li>';
	});
	artistListHtml +=
	'<li id="artists/' + toId(artist.name) + '">' +
		'<h5>'+ artist.name + '</h5>' +
		'<div class="row">' +
		  '<img src="assets/'+  artist.imageFile + '"/>' +
		'</div>' +
		'<div class="row">' +
		  '<div class="two-thirds column">' +
		    '<h6 class="">about</h6>' +
		    '<div>' + artist.about + '</div>' +
		  '</div>' +
		  '<div class="one-third column">' +
		    '<h6 class="">releases</h6>' +
		    '<ul class="release-list">' + artistReleases + '</ul>' +
		  '</div>' +
		'</div>' +
	'</li>';
});

document.querySelector('.popover-list').innerHTML = artistPopoverHtml;
document.querySelector('.carousel').innerHTML += carouselHtml;
document.querySelector('.artist-list').innerHTML = artistListHtml;


function toId(name) {
	return name.split(" ").join("-");
}

function formatDate(dateStr) {
	var monthNames = [
	  "January", "February", "March",
	  "April", "May", "June", "July",
	  "August", "September", "October",
	  "November", "December"
	];

	var date = new Date(dateStr);
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return day + ' ' + monthNames[monthIndex] + ' ' + year
}

// Carousel event handlers
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

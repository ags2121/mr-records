// RELEASES
var releases = [].concat.apply([], artists.map(function(el) { 
	el.releases.forEach(function(r) {
		r['artistName'] = el.name;
	});
	return el.releases;
}));

// sort by release date desc
// releases.sort(
// 	function compare(a, b) {
// 	  if (a.year > b.year)
// 	    return -1;
// 	  if (a.year < b.year)
// 	    return 1;
// 	  return 0;
// 	}
// );

var releasesHtml = "";
partition(releases.slice(), 3).forEach(function(releases) {
	var release_group = '<div class="row"><ul class="release-list">';
	releases.forEach(function(r) {
		release_group +=
		'<li class="one-third column" data-release="' + r.id + '">' +
			'<img src="assets/' + r.imageFile + '"/>' +
			'<div class="artist-name">' + r.artistName + '</div>' +
			'<div class="release-name">' + r.name + '</div>' +
			getTrackControls(r.tracks) +
		'</li>';
	});
	release_group += '</ul></div>';
	releasesHtml += release_group;
});
document.querySelector('.releases').innerHTML = releasesHtml;

// NEWS
var html = ""
news.forEach(function(el) { 
	newsItem = 
		"<li>" +
			"<div class='title'>" + el.title + "</div>" +
			"<small class='date'>" + formatDate(el.date) + "</small>" +
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
		'<img class="current" src="assets/'+ artist.imageFile + '"/>' + 
		'<img class="ondeck" src="assets/'+ artist.imageFile + '"/>' + 
	'</a>';

	artistReleases = "";
	artist.releases.forEach(function(rel) {
		artistReleases += 
		'<li data-release="' + rel.id + '">' +
			'<div class="row">' +
			  '<img src="assets/' + rel.imageFile + '"/>' +
			  '<div class="release-name">'+ rel.name + '</div>' +
			  '<div>' + rel.type + ' * ' + rel.year + ' * ' + rel.id + '</div>' +
			  getTrackControls(rel.tracks) +
			'</div>' +
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
				renderSocialLinks(artist.social) +
			'</div>' +
			'<div class="one-third column">' +
				'<h6 class="">releases</h6>' +
				'<ul class="release-list">' + artistReleases + '</ul>' +
			'</div>' +
		'</div>' +
	'</li>';
});

function renderSocialLinks(socialLinks) {
	if (!socialLinks) {
		return '';
	}
	sHtml = '';
	socialLinks.forEach(function(link) {
		sHtml += '<a class="external" href="' + link.url + '" target="_blank"><small>' + link.name + '</small></a> '
	});
	return sHtml;
}

document.querySelector('.popover-list').innerHTML = artistPopoverHtml;
document.querySelector('.carousel').innerHTML += carouselHtml;
document.querySelector('.artist-list').innerHTML = artistListHtml;

// CAROUSEL EVENT HANDLERS
var index = 0;
var arrows = document.querySelectorAll('.arrow');
for (i = 0; i < arrows.length; i++) { 
	arrows[i].addEventListener('click', function (e) {
		e.preventDefault();
		var doSlideLeft = e.currentTarget.classList.contains('left');
		slideCarousel(doSlideLeft);
	});
}

function slideCarousel(doSlideLeft) { 
	var currentImage = document.querySelectorAll('.carousel .artist-image')[index];
	if (doSlideLeft) {
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

	document.querySelector('.carousel .artist-info').href = '#artists/' + toId(artists[index].name);
	document.querySelector('.carousel .artist-name').innerHTML = artists[index].name;

	nextImage = document.querySelectorAll('.carousel .artist-image')[index];
	nextImageImgSrc = nextImage.querySelector('img').getAttribute('src')

	var currentImageImg = currentImage.querySelector('img.current');
	var ondeckImageImg = currentImage.querySelector('img.ondeck');

	ondeckImageImg.setAttribute('src', nextImageImgSrc);
	currentImageImg.classList.add('slide');

	setTimeout(function() {
		currentImage.classList.add('offscreen');
		currentImageImg.classList.remove('slide');
		nextImage.classList.remove('offscreen');
	 }, 600);
};
var autoSlideId = setInterval(slideCarousel, 5000);

// STORE
releasesForSale = releases.filter(function (unit) {return unit['buyUrl']});
var storeHtml = "";
partition(releasesForSale.slice(), 3).forEach(function(releases) {
	var release_group = '<div class="row"><ul class="release-list">';
	releases.forEach(function(r) {
		release_group +=
		'<a href="' + r.buyUrl + '" target="_blank"><li class="one-third column for-sale">' +
			'<img src="assets/' + r.imageFile + '"/>' +
			'<div class="artist-name">' + r.artistName + '</div>' +
			'<div class="release-name">' + r.name + '</div>' +
		'</li></a>';
	});
	release_group += '</ul></div>';
	storeHtml += release_group;
});
document.querySelector('.titles').innerHTML = storeHtml;

// FOOTER

document.querySelectorAll('.copyright-date')[0].innerHTML = new Date().getFullYear();

// AUDIO CONTROL HANDLERS

function resetAudioControls() {
	document.querySelectorAll('.wwfm-play').forEach(function(e) { e.classList['remove']('hide');});
	document.querySelectorAll('.wwfm-pauseoff').forEach(function(e) { e.classList['add']('hide');});
}

var controls = document.querySelectorAll('.controls');
for (i = 0; i < controls.length; i++) { 
	controls[i].addEventListener('click', function (e) {
		var releaseId = e.currentTarget.closest("[data-release]").getAttribute('data-release');
		var currentRelease = releases.filter(function(el) { return el.id == releaseId })[0];

		var pauseButton = e.currentTarget.querySelector('.wwfm-pauseoff');
		var isPauseButtonHidden = e.currentTarget.querySelector('.wwfm-pauseoff').classList.contains('hide');

		var playButton = e.currentTarget.querySelector('.wwfm-play');

		// reset global UI control state
		resetAudioControls();

		// toggle all audio control state of currently clicked release

		document.querySelectorAll('[data-release="' + releaseId + '"]').forEach(function(r) {
			r.querySelector('.wwfm-pauseoff').classList[isPauseButtonHidden ? 'remove' : 'add']('hide');
			r.querySelector('.wwfm-play').classList[isPauseButtonHidden ? 'add' : 'remove']('hide');
		});
		
		if (isPauseButtonHidden) {
			var nowPlayingBar = document.querySelector('.now-playing');
			nowPlayingBar.querySelector('.song').innerHTML = currentRelease.track;
			nowPlayingBar.querySelector('.artist').innerHTML = currentRelease.artistName;
			nowPlayingBar.querySelector('.album').innerHTML = currentRelease.name;
		}

		document.querySelector('.now-playing').classList[isPauseButtonHidden ? 'remove' : 'add']('hidden');

		// play audio
		var currentReleaseUrl = currentRelease.trackUrl;
		var audioPlayer = document.querySelector('audio');
		if (clickedSameAudio(audioPlayer, currentReleaseUrl)) {
		  if (audioPlayer.paused) {
		    audioPlayer.play();
		  } else {    
		    audioPlayer.pause();  
		  }
		} else {
			playAudio(audioPlayer, currentReleaseUrl);
		}
	});
}

// reset all UI control state when audio ends
document.querySelector('audio').addEventListener('ended', function () {
	resetAudioControls();
	document.querySelector('.now-playing').classList['add']('hidden');
});

function clickedSameAudio(audioPlayer, audioUrl) {
	return !audioPlayer.ended && (0 < audioPlayer.currentTime)
	&& audioUrl === audioPlayer.querySelector('source').getAttribute('src');
}

function playAudio(audioPlayer, audioUrl) {
	audioPlayer.querySelector('source').setAttribute('src', audioUrl);
	audioPlayer.pause();
	audioPlayer.load();
	audioPlayer.oncanplaythrough = audioPlayer.play();
}

// SHARED (vars+fns)

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

function partition(array, n) {
	return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
}

function getTrackControls(numberOfTracks) {
return '<div class="controls">' +
	'<i class="wwfm-play"></i>' +
	'<i class="wwfm-pauseoff hide"></i> ' +
	'<small>1 (of ' + numberOfTracks + ') Tracks</small>' +
'</div>';
}
// Fetches URL
function getContent()
{
	return fetch('http://127.0.0.1:8080/generate')
	.then(response => response.json())
	.then(data => data);
}

// Adds video or image URL to div
async function addContent() 
{
	// Gets array containing content URL and true/false value indicating whether
	// video or not
	btn.innerText = "Generating...";
	media = await getContent();
	btn.innerText = "Generate";
	
	if (media["Video"] == true)
	{
		var video = document.createElement('video');
		
		video.src = media["Content_URL"];
		video.width = 500;
		video.height = 500;
		video.autoplay = true;
		video.loop = true;
		
		// Add video to div "content_location"
		// (this section might not be applicable if going with a popup)
		var dv = document.getElementById('myModal');
		// Remove existing video or image
		while (dv.hasChildNodes())
		{
			dv.removeChild(dv.lastChild);
		}
		
		dv.appendChild(video);
	}

	else
	{
		var img = new Image();
		img.src = media["Content_URL"];
		img.height = 500;
		img.width = 500;
		
		// Add image to div "content_location"
		// (this section might not be applicable if going with a popup)
		var dv = document.getElementById('myModal');
		// Remove existing video or image
		while (dv.hasChildNodes())
		{
			dv.removeChild(dv.lastChild);
		}
				
		dv.appendChild(img);
	}
}
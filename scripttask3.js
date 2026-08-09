const inputText = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');

const episodeName = document.getElementById('episode-name');
const episodeSeason = document.getElementById('episode-season');
const episodeNumber = document.getElementById('episode-number');
const episodeRuntime = document.getElementById('episode-runtime');
const episodeAirdate = document.getElementById('episode-airdate');
const episodeImage = document.getElementById('episode-image');
const episodeSummary = document.getElementById('episode-summary');

let epname="";
searchButton.addEventListener("click", () => {
    epname = inputText.value
    console.log(epname); // Error
});

searchEpisodeByName()
  .then(data => {
    console.log(data)
  });

async function searchEpisodeByName() {
  try {
   
    const showUrl = `https://api.tvmaze.com/shows/431/episodes`;
    const response = await fetch(showUrl);
    
    if (!response.ok) {
      throw new Error(`Episode not found or API error: ${response.status}`);
    }
    
    const showData = await response.json();
    
    const matchedEpisodes = showData.filter(episode => 
      episode.name.includes('The One With the Sonogram at the End')
    );    
    
    const y = JSON.stringify(matchedEpisodes);
    //console.log(t);
    const t = JSON.parse(y);
    console.log(t.name);
    episodeName.innerHTML = t.name; //Error t.name = undefined
    episodeSeason.innerHTML = t.season; //Error t.season = undefined
    episodeNumber.innerHTML = t.number; //Error t.number = undefined
    episodeRuntime.innerHTML = t.runtime;   //Error t.runtime = undefined
    episodeAirdate.innerHTML = t.airdate;   //Error t.airdate = undefined
    episodeImage.innerHTML = t.image;   //Error t.image = undefined
    episodeSummary.innerHTML = t.summary;   //Error t.summary = undefined

    return {
      results: matchedEpisodes
    };

  } catch (error) {
    console.error("Error fetching data from TVmaze:", error);
    return null;
  }
}

'use strict';

const states = {AL:"Alabama",AK:"Alaska",AS:"American Samoa",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",DC:"District Of Columbia",FM:"Federated States Of Micronesia",FL:"Florida",GA:"Georgia",GU: "Guam",HI:"Hawaii", ID:"Idaho",IL:"Illinois",IN:"Indiana",IA: "Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MH:"Marshall Islands",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",MP:"Northern Mariana Islands",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PW:"Palau",PA:"Pennsylvania",PR:"Puerto Rico",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VI:"Virgin Islands",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"}
const STORE = {
  stateSelected: ""
}

const apiKey = 'TVTdAb5hfTZMmnxVHHeJpk1a6Vih1l1uv4vovpdU'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li>${responseJson.data[i].name}</li>
       <li>${responseJson.data[i].description}</li>
       <li>${responseJson.data[i].url}</li>
       <p>`
    );
  }
  $('#results').removeClass('hidden');
}

function createStateList() {
  let value = '';
  for (let i in states) {
    value += `<option value=${i}>${states[i]}</option>`;
  }
  $('#state-selector').html(value);
}

// function getParks(query, maxResults=10) {
function getParks(maxResults=10) {
    const params = {
    // q: query,
    limit: maxResults,
    stateCode: STORE.stateSelected,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    // const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val() - 1;
    STORE.stateSelected = $('#state-selector option:selected').val();
    // getParks(searchTerm, maxResults);
    getParks(maxResults);
  });
}

// $(watchForm);

$(() => {
  createStateList();
  watchForm();
});
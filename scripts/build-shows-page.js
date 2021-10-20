//get API URL
const apiURL = "https://project-1-api.herokuapp.com/";

// //grab API Key
const apiKey = "2b520fc3-667b-4bd3-ac89-da88cdb78e25";

//link code to the main tag
const main = document.querySelector("main");

//create section, styling div, and h2 tags for shows
const showsSection = createChild(main, "section", "shows");
const showsStyling = createChild(showsSection, "div", "shows__styling");
const showsTitle = createChild(showsStyling, "h2", "shows__title");
showsTitle.innerText = "Shows";

//creates table and column headers
const showsTable = createChild(showsStyling, "table", "shows__list");
const tableHead = createChild(showsTable, "thead", "shows__head");
const tableHeaders = createChild(tableHead, "tr", "shows__headers");
const thDate = createChild(tableHeaders, "th", "shows__label");
thDate.innerText = "DATE";
const thVenue = createChild(tableHeaders, "th", "shows__label");
thVenue.innerText = "VENUE";
const thLocation = createChild(tableHeaders, "th", "shows__label");
thLocation.innerText = "LOCATION";
const thButton = createChild(tableHeaders, "th", "shows__label");
const tableBody = createChild(showsTable, "tbody", "shows__body");

//function to create a new child
function createChild(parent, type, clName) {
  const newChild = document.createElement(type);
  newChild.classList.add(clName);
  parent.appendChild(newChild);
  return newChild;
}

//convert date from UNIX timestamp to human-readable
function convertDate(date) {
  const d = new Date(Number(date));
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return d.toLocaleDateString("en-US", options).replace(/,/g, "");
}

//creates list of shows
function createList(shows) {
  shows.forEach((show) => {
    //create table row and adds selected row class
    const tableRow = createChild(tableBody, "tr", "shows__single");
    tableRow.addEventListener("click", (event) => {
      tableRow.classList.toggle("shows__single--selected");
    });
    const tdDate = createChild(tableRow, "td", "shows__date");
    tdDate.innerText = convertDate(show.date);
    const tdVenue = createChild(tableRow, "td", "shows__venue");
    tdVenue.innerText = show.place;
    const tdLocation = createChild(tableRow, "td", "shows__location");
    tdLocation.innerText = show.location;
    const tdButton = createChild(tableRow, "td", "shows__button");
    const button = createChild(tdButton, "button", "shows__btn");
    button.innerText = "BUY TICKETS";
  });
}

//create shows after getting key
axios
  .get(`${apiURL}showdates/?api_key=${apiKey}`)
  .then((response) => {
    const shows = response.data;
    createList(shows);
  })
  .catch((error) => {
    console.log(error);
  });

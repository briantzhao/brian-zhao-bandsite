const shows = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",

    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",

    venue: "Pier 3 East",

    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",

    venue: "View Lounge",

    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",

    venue: "Hyatt Agency",

    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",

    venue: "Moscow Center",

    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",

    venue: "Press Club",

    location: "San Francisco, CA",
  },
];

//link code to the main tag
const main = document.querySelector("main");

//create section, styling div, and h2 tags for shows
const showsSection = createChild(main, "section", "shows");
const showsStyling = createChild(showsSection, "div", "shows__styling");
const showsTitle = createChild(showsStyling, "h2", "shows__title");
showsTitle.innerText = "Shows";

//creates table and column headers
const showsTable = createChild(showsStyling, "table", "shows__list");
const tableHeaders = createChild(showsTable, "tr", "shows__headers");
const thDate = createChild(tableHeaders, "th", "shows__label");
thDate.innerText = "DATE";
const thVenue = createChild(tableHeaders, "th", "shows__label");
thVenue.innerText = "VENUE";
const thLocation = createChild(tableHeaders, "th", "shows__label");
thLocation.innerText = "LOCATION";
const thButton = createChild(tableHeaders, "th", "shows__label");

//creates list of shows
createList(shows);
function createList(shows) {
  for (let i = 0; i < shows.length; i++) {
    //create table row and adds selected row class
    const tableRow = createChild(showsTable, "tr", "shows__single");
    tableRow.addEventListener("click", (event) => {
      tableRow.classList.toggle("shows__single--selected");
    });
    const tdDate = createChild(tableRow, "td", "shows__date");
    tdDate.innerText = shows[i].date;
    const tdVenue = createChild(tableRow, "td", "shows__venue");
    tdVenue.innerText = shows[i].venue;
    const tdLocation = createChild(tableRow, "td", "shows__location");
    tdLocation.innerText = shows[i].location;
    const tdButton = createChild(tableRow, "td", "shows__button");
    const button = createChild(tdButton, "button", "shows__btn");
    button.innerText = "BUY TICKETS";
  }
}

//function to create a new child
function createChild(parent, type, clName) {
  const newChild = document.createElement(type);
  newChild.classList.add(clName);
  parent.appendChild(newChild);
  return newChild;
}

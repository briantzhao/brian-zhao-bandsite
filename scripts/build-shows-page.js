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

const showsList = document.querySelector(".shows__list");
createList(shows);
function createList(shows) {
  for (let i = 0; i < shows.length; i++) {
    let show = document.createElement("article");
    show.classList.add("show__object");
    createChild(show, shows[i], "date");
    createChild(show, shows[i], "venue");
    createChild(show, shows[i], "location");
    let btn = document.createElement("button");
    btn.classList.add("show__btn");
    btn.innerText = "Buy Tickets";
    show.appendChild(btn);
    showsList.appendChild(show);
  }
}

function createChild(parent, object, key) {
  let showChild = document.createElement("h3");
  showChild.classList.add("show__label");
  switch (key) {
    case "date":
      showChild.innerText = "DATE";
      break;
    case "venue":
      showChild.innerText = "VENUE";
      break;
    default:
      showChild.innerText = "LOCATION";
  }
  parent.appendChild(showChild);
  let showChild1 = document.createElement("h3");
  showChild1.innerText = object[key];
  parent.appendChild(showChild1);
}

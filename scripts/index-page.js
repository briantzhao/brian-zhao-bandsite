let comments = [
  {
    name: "Connor Walton",
    date: "02/17/2021",
    noProfile: true,
    quote:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    noProfile: true,
    quote:
      "I feel blessed to have seen them in person. What a comment! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    noProfile: true,
    quote:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

//grab comments section from HTML
const commentsList = document.getElementById("comments__content");

//create initial list of comments
createList(comments);
function createList(comments) {
  for (let i = 0; i < comments.length; i++) {
    displayComment(comments[i]);
  }
}

//turns object into HTML element
function displayComment(comment) {
  let content = document.createElement("li");
  let picSec = document.createElement("div");
  let pic = document.createElement("div");
  let textSec = document.createElement("div");
  let headSec = document.createElement("div");
  content.classList.add("comments__single");
  content.appendChild(picSec);

  //determines if comment was auto-generated (noProfile), or user-generated
  if (comment.noProfile) {
    pic.classList.add("comments__profile");
  } else {
    pic.classList.add("comments__form__profile");
  }
  picSec.appendChild(pic);
  content.appendChild(textSec);
  textSec.classList.add("comments__text");
  textSec.appendChild(headSec);
  headSec.classList.add("comments__head-section");
  createChild(headSec, comment, "name");
  createChild(headSec, comment, "date");
  createChild(textSec, comment, "quote");
  commentsList.appendChild(content);
}

//creates new child and appends to parent
function createChild(parent, object, key) {
  let commentChild = document.createElement("p");
  commentChild.classList.add(`comments__${key}`);

  //handles date conversion, function shown at bottom
  if (key === "date") {
    commentChild.innerText = convertDate(object[key]);
  } else {
    commentChild.innerText = object[key];
  }
  //   commentChild.innerText = object[key]; placeholder for date w/o conversion
  parent.appendChild(commentChild);
}

//handles form submission
const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //checks if form fields are empty
  if (event.target.name.value == "") {
    formError(event.target.name, true);
    alert("Please enter a valid name");
    formError(event.target.comment, false);
    if (event.target.comment.value == "") {
      formError(event.target.comment, true);
      alert("Please enter a valid comment");
    }
  } else if (event.target.comment.value == "") {
    formError(event.target.comment, true);
    formError(event.target.name, false);
    alert("Please enter a valid comment");
  } else {
    formError(event.target.name, false);
    formError(event.target.comment, false);

    //constructs new comment object from form submission
    let newComment = {};
    newComment.name = event.target.name.value;
    newComment.date = todaysDate();
    newComment.quote = event.target.comment.value;

    // sets noProfile field to false to tell displayComment that appropriate class should be applied
    newComment.noProfile = false;

    //adds new comment to existing array
    comments.unshift(newComment);

    //clears comments section
    clearList();

    //reconstructs comments
    createList(comments);
    form.reset();
  }
});

//renders today's date for new comment
function todaysDate() {
  const d = new Date();
  let month;
  if (d.getMonth() + 1 < 10) {
    month = "0" + d.getMonth() + 1;
  } else {
    month = d.getMonth() + 1;
  }
  return month + "/" + d.getDate() + "/" + d.getFullYear();
}

//clears comments list (I wrote this before we learned about innerHTML)
function clearList() {
  while (commentsList.lastElementChild) {
    commentsList.removeChild(commentsList.lastElementChild);
  }
}

//changes form field to red on error, to standard otherwise
function formError(field, error) {
  if (error) {
    field.style.borderColor = "#D22D2D";
  } else {
    field.style.borderColor = "#e1e1e1";
  }
}

//diving deeper: converts date to relative duration
function convertDate(date) {
  //get key value date
  const month = parseInt(date.substr(0, 2));
  const day = parseInt(date.substr(3, 4));
  const year = parseInt(date.substr(6));
  const d = new Date();

  //get today's date
  const todayMonth = parseInt(d.getMonth()) + 1;
  const todayDay = parseInt(d.getDate());
  const todayYear = parseInt(d.getFullYear());

  //calculate days since 0AD
  const adDays = day + 30 * (month + 12 * year);
  const adToday = todayDay + 30 * (todayMonth + 12 * todayYear);
  const diff = adToday - adDays;

  //check if we should represent in years, months, days, or "Just now"
  if (diff / 365 > 1) {
    return "Over a year ago";
  } else if (diff / 30 > 1) {
    return `${Math.round(diff / 30)} months ago`;
  } else if (diff > 1) {
    return `${diff} days ago`;
  }
  return "Just now";
}

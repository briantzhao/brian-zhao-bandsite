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

const commentsList = document.getElementById("comments__content");
createList(comments);
function createList(comments) {
  for (let i = 0; i < comments.length; i++) {
    displayComment(comments[i]);
  }
}

function createChild(parent, object, key) {
  let commentChild = document.createElement("p");
  commentChild.classList.add(`comments__${key}`);
  commentChild.innerText = object[key];
  parent.appendChild(commentChild);
}

function displayComment(comment) {
  let content = document.createElement("article");
  let picSec = document.createElement("div");
  let pic = document.createElement("div");
  let textSec = document.createElement("div");
  let headSec = document.createElement("div");
  content.classList.add("comments__single");
  content.appendChild(picSec);
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

const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (e.target.name.value == "") {
    formError(e.target.name, true);
    alert("Please enter a valid name");
    formError(e.target.comment, false);
    if (e.target.comment.value == "") {
      formError(e.target.comment, true);
      alert("Please enter a valid comment");
    }
  } else if (e.target.comment.value == "") {
    formError(e.target.comment, true);
    formError(e.target.name, false);
    alert("Please enter a valid comment");
  } else {
    formError(e.target.name, false);
    formError(e.target.comment, false);
    let newComment = {};
    newComment.name = e.target.name.value;
    newComment.date = todaysDate();
    newComment.quote = e.target.comment.value;
    newComment.noProfile = false;
    comments.unshift(newComment);
    clearList();
    createList(comments);
    let profilePic = document.querySelector(".comments__form__profile");
    commentsList.firstChild.firstChild.firstChild.style.backgroundImage =
      profilePic.style.backgroundImage;
    e.target.name.value = "";
    e.target.comment.value = "";
  }
});

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

function clearList() {
  while (commentsList.lastElementChild) {
    commentsList.removeChild(commentsList.lastElementChild);
  }
}

function formError(field, error) {
  if (error) {
    field.style.borderColor = "#D22D2D";
  } else {
    field.style.borderColor = "#e1e1e1";
  }
}

let comments = [
  {
    name: "Connor Walton",
    date: "02/17/2021",
    quote:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    quote:
      "I feel blessed to have seen them in person. What a comment! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    quote:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

const commentsList = document.querySelector(".comments__content");
createList(comments);
function createList(comments) {
  for (let i = 0; i < comments.length; i++) {
    let comment = document.createElement("article");
    let picSec = document.createElement("div");
    let pic = document.createElement("img");
    let textSec = document.createElement("div");
    let headSec = document.createElement("div");
    comment.classList.add("comments__single");
    comment.appendChild(picSec);
    picSec.appendChild(pic);
    pic.classList.add("comments__profile");
    comment.appendChild(textSec);
    textSec.classList.add("comments__text");
    textSec.appendChild(headSec);
    headSec.classList.add("comments__head-section");
    createChild(headSec, comments[i], "name");
    createChild(headSec, comments[i], "date");
    createChild(textSec, comments[i], "quote");
    commentsList.appendChild(comment);
  }
}

function createChild(parent, object, key) {
  let commentChild = document.createElement("p");
  commentChild.classList.add(`comments__${key}`);
  commentChild.innerText = object[key];
  parent.appendChild(commentChild);
}

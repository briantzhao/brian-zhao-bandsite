//array of pre-loaded comments (stores new comments later)
// let comments = [
//   {
//     name: "Connor Walton",
//     date: "02/17/2021",
//     noProfile: true,
//     quote:
//       "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//   },
//   {
//     name: "Emilie Beach",
//     date: "01/09/2021",
//     noProfile: true,
//     quote:
//       "I feel blessed to have seen them in person. What a comment! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//   },
//   {
//     name: "Miles Acosta",
//     date: "12/20/2020",
//     noProfile: true,
//     quote:
//       "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//   },
// ];
//get API URL
const apiURL = "https://project-1-api.herokuapp.com/";

//grab API Key
let apiKey;
axios
  .get(`${apiURL}register`)
  .then((response) => {
    apiKey = response.data.api_key;
    return axios.get(`${apiURL}comments/?api_key=${apiKey}`);
  })
  //create shows after getting key
  .then((response) => {
    const comments = response.data;
    console.log(comments);
    createList(comments);
  })
  .catch((error) => {
    console.log(error);
  });
//grab comments section from HTML
const commentsList = document.getElementById("comments__content");

//create initial list of comments
// createList(comments);
function createList(comments) {
  for (let i = 0; i < comments.length; i++) {
    displayComment(comments[i]);
  }
}

//turns object into HTML element
function displayComment(comment) {
  const content = createChild(commentsList, null, "single", "li");
  // const picSec = document.createElement("div");
  // const pic = document.createElement("div");
  // const textSec = document.createElement("div");
  // const headSec = document.createElement("div");
  // content.classList.add("comments__single");
  // content.appendChild(picSec);

  // //determines if comment was auto-generated (noProfile), or user-generated
  // // if (comment.noProfile) {
  // //   pic.classList.add("comments__profile");
  // // } else {
  // //   pic.classList.add("comments__form__profile");
  // // }
  // pic.classList.add("comments__profile");
  // picSec.appendChild(pic);
  // content.appendChild(textSec);
  // textSec.classList.add("comments__text");
  // textSec.appendChild(headSec);
  // headSec.classList.add("comments__head-section");
  const picSec = createChild(content, null, null, "div");
  createChild(picSec, null, "profile", "div");
  const textSec = createChild(content, null, "text", "div");
  const headSec = createChild(textSec, null, "head-section", "div");

  createChild(headSec, comment, "name");
  createChild(headSec, comment, "timestamp");
  createChild(textSec, comment, "comment");
  const btnSec = createChild(textSec, null, "btns", "div");
  const likesDisplay = createChild(btnSec, null, "likes-display", "div");
  const likesBtn = createChild(likesDisplay, null, "likes-btn", "button");
  likesBtn.innerText = "LIKE";
  const likesNum = createChild(likesDisplay, comment, "likes", "span");
  const deleteBtn = createChild(btnSec, null, "delete", "button");
  deleteBtn.innerText = "DELETE";
  console.log(comment.id);

  //diving deeper: like button
  // likesBtn.id = comment.id;
  // content.id = comment.id;
  likesBtn.addEventListener("click", (event) => {
    event.preventDefault();
    axios
      .put(`${apiURL}comments/${comment.id}/like/?api_key=${apiKey}`)
      .then((response) => {
        likesNum.innerText = response.data.likes;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //diving deeper: delete button
  deleteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    axios
      .delete(`${apiURL}comments/${comment.id}/?api_key=${apiKey}`)
      .then(() => content.remove())
      .catch((error) => {
        console.log(error);
      });
  });
  // commentsList.appendChild(content);
}

//creates new child and appends to parent
function createChild(parent, object, key, type) {
  let commentChild;
  if (type) {
    commentChild = document.createElement(type);
  } else {
    commentChild = document.createElement("p");
  }
  if (key) {
    commentChild.classList.add(`comments__${key}`);
  }
  //handles date conversion, function shown at bottom
  if (key === "timestamp") {
    commentChild.innerText = convertDate(object[key]);
  } else if (object) {
    commentChild.innerText = object[key];
  }
  //   commentChild.innerText = object[key]; placeholder for date w/o conversion
  parent.appendChild(commentChild);
  return commentChild;
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
    const newComment = {};
    newComment.name = event.target.name.value;
    // newComment.date = todaysDate();
    newComment.comment = event.target.comment.value;
    // -------------------------------------do post here------------------------------------------------------------------------------------------------------------------------------------
    // sets noProfile field to false to tell displayComment that appropriate class should be applied
    // newComment.noProfile = false;

    axios
      .post(`${apiURL}comments?api_key=${apiKey}`, newComment)
      .then((response) => {
        console.log(response);
        return axios.get(`${apiURL}comments?api_key=${apiKey}`);
      })
      .then((response) => {
        const comments = response.data;
        comments.unshift(comments.pop());
        console.log(comments);
        commentsList.innerHTML = "";
        createList(comments);
      })
      .catch((error) => {
        console.log(error);
      });
    // //clears comments section
    // clearList();

    // //reconstructs comments
    // createList(comments);
    form.reset();
  }
});

// //renders today's date for new comment
// function todaysDate() {
//   const d = new Date();
//   let month;
//   if (d.getMonth() + 1 < 10) {
//     month = "0" + d.getMonth() + 1;
//   } else {
//     month = d.getMonth() + 1;
//   }
//   return month + "/" + d.getDate() + "/" + d.getFullYear();
// }

// //clears comments list (I wrote this before we learned about innerHTML)
// function clearList() {
//   while (commentsList.lastElementChild) {
//     commentsList.removeChild(commentsList.lastElementChild);
//   }
// }

//changes form field to red on error, to standard otherwise
function formError(field, error) {
  if (error) {
    field.style.borderColor = "#D22D2D";
  } else {
    field.style.borderColor = "#e1e1e1";
  }
}

// //diving deeper: converts date to relative duration
// function convertDate(date) {
//   //get key value date
//   const month = parseInt(date.substr(0, 2));
//   const day = parseInt(date.substr(3, 4));
//   const year = parseInt(date.substr(6));
//   const d = new Date();

//   //get today's date
//   const todayMonth = parseInt(d.getMonth()) + 1;
//   const todayDay = parseInt(d.getDate());
//   const todayYear = parseInt(d.getFullYear());

//   //calculate days since 0AD
//   const adDays = day + 30 * (month + 12 * year);
//   const adToday = todayDay + 30 * (todayMonth + 12 * todayYear);
//   const diff = adToday - adDays;

//   //check if we should represent in years, months, days, or "Just now"
//   if (diff / 365 > 1) {
//     return "Over a year ago";
//   } else if (diff / 30 > 1) {
//     return `${Math.round(diff / 30)} months ago`;
//   } else if (diff > 1) {
//     return `${diff} days ago`;
//   }
//   return "Just now";
// }

function convertDate(date) {
  const d = new Date(Number.parseInt(date));
  let month;
  let theDate;
  if (d.getMonth() + 1 < 10) {
    month = `0${d.getMonth() + 1}`;
  } else {
    month = d.getMonth() + 1;
  }
  if (d.getDate() < 10) {
    theDate = `0${d.getDate()}`;
  } else {
    theDate = d.getDate();
  }
  return `${month}/${theDate}/${d.getFullYear()}`;
}

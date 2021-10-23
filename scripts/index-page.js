//get API URL
const apiURL = "https://project-1-api.herokuapp.com/";

//grab API Key
const apiKey = "2b520fc3-667b-4bd3-ac89-da88cdb78e25";

//converts date to human-readable format
function convertDate(date) {
  const d = new Date(Number(date));
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
  parent.appendChild(commentChild);
  return commentChild;
}

//turns object into HTML element
function displayComment(comment) {
  const content = createChild(commentsList, null, "single", "li");
  const picSec = createChild(content, null, null, "div");
  const pic = createChild(picSec, null, "profile", "div");
  // pic.alt = "blank profile picture";
  const textSec = createChild(content, null, "text", "article");
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

  //diving deeper: like button
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
}

//create shows after getting key
axios
  .get(`${apiURL}comments/?api_key=${apiKey}`)
  .then((response) => {
    const comments = response.data;
    comments.sort(function (a, b) {
      let key1 = a.timestamp;
      let key2 = b.timestamp;
      if (key1 > key2) {
        return -1;
      } else if (key1 < key2) {
        return 1;
      }
      return 0;
    });
    createList(comments);
  })
  .catch((error) => {
    console.log(error);
  });

//grab comments section from HTML
const commentsList = document.getElementById("comments__content");

//create initial list of comments
function createList(comments) {
  comments.forEach((comment) => displayComment(comment));
}

//changes form field to red on error, to standard otherwise
function formError(field, error) {
  if (error) {
    field.style.borderColor = "#D22D2D";
  } else {
    field.style.borderColor = "#e1e1e1";
  }
}

//handles form submission
const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //checks if form fields are empty
  if (Number(event.target.name.value) === 0) {
    formError(event.target.name, true);
    alert("Please enter a valid name");
    formError(event.target.comment, false);
    if (Number(event.target.comment.value) === 0) {
      formError(event.target.comment, true);
      alert("Please enter a valid comment");
    }
  } else if (Number(event.target.comment.value) === 0) {
    formError(event.target.comment, true);
    formError(event.target.name, false);
    alert("Please enter a valid comment");
  } else {
    formError(event.target.name, false);
    formError(event.target.comment, false);

    //constructs new comment object from form submission
    const newComment = {};
    newComment.name = event.target.name.value;
    newComment.comment = event.target.comment.value;

    //do post call through axios to post new comment
    axios
      .post(`${apiURL}comments?api_key=${apiKey}`, newComment)
      .then((response) => {
        return axios.get(`${apiURL}comments?api_key=${apiKey}`);
      })
      .then((response) => {
        const comments = response.data;

        //sort returned array based on timestamp
        comments.sort(function (a, b) {
          let key1 = a.timestamp;
          let key2 = b.timestamp;
          if (key1 > key2) {
            return -1;
          } else if (key1 < key2) {
            return 1;
          }
          return 0;
        });

        //clear comments list
        commentsList.innerHTML = "";

        //create new comments list
        createList(comments);
      })
      .catch((error) => {
        console.log(error);
      });

    //reset the submission form
    form.reset();
  }
});

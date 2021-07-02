let addToy = false;
const toyUrl = 'http://localhost:3000/toys';

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  function getToys() {
    return fetch(toyUrl)
      .then(resp => resp.json());
  }

  function postToys(toy_data) {
    let formData = {
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch(toyUrl, configObj)
      .then(function(response) {
        return response.json();
      })
      .then(renderCard)
  }

  function likes(e) {
    e.preventDefault()
    let more = parseInt(e.target.previousElementSibling.innerText) + 1

    fetch( `${toyUrl}/${e.target.id}`), { 
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ "likes": more })
    }
    .then(function(resp) {
      return resp.json();
    })
    .then(function(like_obj) {
      e.target.previousElementSibling.innerText = `${more} likes`;
    })
  }

  function renderCard(toy) {
    let h2 = document.createElement("h2")
    h2.innerText = toy.name

    let img = document.createElement("img")
    img.src = `${toy.image}`
    img.classname = 'toy-avatar'

    let p = document.createElement("p")
    p.innerText = `${toy.likes} likes`

    let button = document.createElement("button")
    button.id = toy.id
    button.innerText = "like <3"
    button.classname = "like-btn"
    button.addEventListener('click', function(e) {
      console.log(e.target.dataset);
      likes(e)
    })

    let newDiv = document.createElement("div")
    newDiv.classname = "card"
    newDiv.append(h2, img, p, button)
    toyCollection.append(newDiv)
  }





  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

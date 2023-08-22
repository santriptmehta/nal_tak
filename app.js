$(document).ready(function () {
  //responsive menu toggle
  $("#menutoggle").click(function () {
    $(".xs-menu").toggleClass("displaynone");
  });
  //add active class on menu
  $("ul li").click(function (e) {
    e.preventDefault();
    $("li").removeClass("active");
    $(this).addClass("active");
  });
  //drop down menu
  $(".drop-down").hover(function () {
    $(".mega-menu").addClass("display-on");
  });
  $(".drop-down").mouseleave(function () {
    $(".mega-menu").removeClass("display-on");
  });
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBLuztGCv2d2lc2Dqla0-9mz5DLxBDylwE",
    authDomain: "article-81133.firebaseapp.com",
    projectId: "article-81133",
    storageBucket: "article-81133.appspot.com",
    messagingSenderId: "342766197591",
    appId: "1:342766197591:web:c0103e0cda89e3d816fc12",
    measurementId: "G-Y9FC5NWTXP"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Reference to the "home" collection
const homeCollection = db.collection("home");
const headingNews = db.collection("latestNews");

// Reference to the container div
const articleContainer = document.getElementById("articleContainer");
const newsContainer = document.getElementById("latestNewsContainer");

//Latest News data displayed
// Reference to the latestNews collection and document
const latestNewsDocRef = db.collection("latestNews").doc("l_news_data");

// Get the news data from Firestore
latestNewsDocRef.get().then((doc) => {
  if (doc.exists) {
    const newsData = doc.data();

    // Populate the news container with retrieved data
    newsContainer.innerHTML = `
      <h2 class="headline">${newsData.title}</h2>
      <img src="${newsData.articleImg}" alt="News Image" class="news-image">
      <p class="date-time">Published: ${newsData.dateTime}</p>
      <p class="author">By ${newsData.author}</p>
    `;

    // Add click event listener to open a new page
    // Add click event listener to news items
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach((item) => {
      item.addEventListener('click', () => {
        const newsId = item.getAttribute('data-id');
        
        // Store news data in local storage
        localStorage.setItem("selectedArticle", JSON.stringify(newsData));
        
        window.location.href = "article.html";
      });
    });



  } else {
    console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});

// Retrieve data from the "home" collection
homeCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const articleData = doc.data();
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("article");
        articleDiv.innerHTML = `
            <h2>${articleData.title}</h2>
            <p>Author: ${articleData.author}</p>
            <p>${articleData.context}</p>
            <img src="${articleData.articleImg}" alt="Article Image">
        `;

        // Add click event listener to open a new page
        articleDiv.addEventListener("click", () => {
            // Store article data in localStorage for use in the new page
            localStorage.setItem("selectedArticle", JSON.stringify(articleData));
            // Navigate to the new page
            window.location.href = "article.html";
        });

        articleContainer.appendChild(articleDiv);
    });
}).catch((error) => {
    console.log("Error getting documents: ", error);
});
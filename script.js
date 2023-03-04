const createBlogBtn = document.querySelector("#create-blog-btn");
const blogContainer = document.querySelector("#blog-container");
const createBlogModal = document.querySelector("#create-blog-modal");
const editBlogModal = document.querySelector("#edit-blog-modal");
const closeBtns = document.querySelectorAll(".close");
const createBlogForm = document.querySelector("#create-blog-form");
const editBlogForm = document.querySelector("#edit-blog-form");
const cancelPost = document.querySelector(".cancel-post");

// array to save the posts
let blogPosts = [];

// Function to show all the posts
function displayBlogPosts() {
  blogContainer.innerHTML = "";

  // loopping through blog posts and creating elements
  blogPosts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");

    const titleElement = document.createElement("h2");
    titleElement.innerText = post.title;

    const timestampElement = document.createElement("p");
    timestampElement.setAttribute("class", "timeStamp");
    const date = new Date();
    console.log(date.getTime())
    timestampElement.innerText = date;

    const descriptionElement = document.createElement("p");
    descriptionElement.setAttribute("class", "des");
    descriptionElement.innerText = post.description;

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", () => {
      // edit blog
      document.querySelector("#edit-title").value = post.title;
      document.querySelector("#edit-description").value = post.description;

      // edit blog modal
      editBlogModal.style.display = "block";
      editTimestamp = post.timestamp;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      // Remove post from array
      blogPosts = blogPosts.filter((p) => p.timestamp !== post.timestamp);

      // Re-display blog posts
      displayBlogPosts();
    });

    // appending childs

    postElement.appendChild(titleElement);

    postElement.appendChild(descriptionElement);
    postElement.appendChild(editBtn);
    postElement.appendChild(deleteBtn);
    postElement.appendChild(timestampElement);

    // Add post element to blog
    blogContainer.appendChild(postElement);
  });
}

// creating new blog post
function handleCreateBlogForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const timestamp = Date.now();
  const post = {
    title: formData.get("title"),
    description: formData.get("description"),
    timestamp: timestamp,
  };

  //new post to blogPosts and show blog posts again
  blogPosts.push(post);
  displayBlogPosts();

  // clear       form
  createBlogForm.reset();
  createBlogModal.style.display = "none";
}

// edit post
function handleEditBlogForm(event) {
  event.preventDefault();

  //update post
  const formData = new FormData(event.target);
  const timestamp = Date.now();
  blogPosts = blogPosts.map((post) => {
    if (post.timestamp === editTimestamp) {
      return {
        title: formData.get("edit-title"),
        description: formData.get("edit-description"),
        timestamp: post.timestamp,
      };
    } else {
      return post;
    }
  });

  displayBlogPosts();
  editBlogModal.style.display = "none";
}

createBlogBtn.addEventListener("click", () => {
  createBlogModal.style.display = "block";
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    createBlogModal.style.display = "none";
    editBlogModal.style.display = "none";
  });
});

// cancel the post
cancelPost.addEventListener("click", () => {
  createBlogModal.style.display = "none";
  editBlogModal.style.display = "none";
});

// event listeners for modals to close when clicked
createBlogModal.addEventListener("click", (event) => {
  if (event.target === createBlogModal) {
    createBlogModal.style.display = "none";
  }
});

editBlogModal.addEventListener("click", (event) => {
  if (event.target === editBlogModal) {
    editBlogModal.style.display = "none";
  }
});

// event listener to create blog form
createBlogForm.addEventListener("submit", handleCreateBlogForm);

// event listener to edit blog form
editBlogForm.addEventListener("submit", handleEditBlogForm);

displayBlogPosts();
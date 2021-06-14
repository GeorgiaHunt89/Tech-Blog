const editFormHandler = async (event) => {
  event.preventDefault();

  // Collect values form the form
  const title = document.querySelector('[name="post-title"]').value;
  const post_text = document.querySelector('[name="post-text"]').value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (title && post_text && id) {
    // send a PUT request to the API endpoint
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        post_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);

const newFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;

    if (title && post_text) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
        title,
        post_text
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
         // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

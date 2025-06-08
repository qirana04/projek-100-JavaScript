document.getElementById("searchButton").addEventListener("click", searchProfile);
document.getElementById("usernameInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") searchProfile();
});

function searchProfile() {
    const username = document.getElementById("usernameInput").value.trim();
    if (!username) {
        alert("Masukkan username GitHub!");
        return;
    }

    const loadingElement = document.getElementById("loading");
    const errorElement = document.getElementById("error");
    const profileElement = document.getElementById("profile");
    
    // Reset state
    loadingElement.classList.remove("hidden");
    errorElement.classList.add("hidden");
    profileElement.classList.add("hidden");
    
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Profil tidak ditemukan");
            }
            return response.json();
        })
        .then(data => {
            loadingElement.classList.add("hidden");
            displayProfile(data);
        })
        .catch(error => {
            loadingElement.classList.add("hidden");
            errorElement.classList.remove("hidden");
            console.error("Error:", error);
        });
}

function displayProfile(profile) {
    const profileElement = document.getElementById("profile");
    
    // Set profile picture
    document.getElementById("avatar").src = profile.avatar_url;
    
    // Set name and username
    document.getElementById("name").textContent = profile.name || profile.login;
    document.getElementById("username").textContent = `@${profile.login}`;
    
    // Set stats
    document.getElementById("repos").textContent = profile.public_repos;
    document.getElementById("followers").textContent = profile.followers;
    document.getElementById("following").textContent = profile.following;
    
    // Set bio
    const bioElement = document.getElementById("bio");
    bioElement.textContent = profile.bio || "Tidak ada bio tersedia";
    
    // Set location
    const locationElement = document.getElementById("location");
    if (profile.location) {
        locationElement.querySelector("span").textContent = profile.location;
        locationElement.classList.remove("hidden");
    } else {
        locationElement.classList.add("hidden");
    }
    
    // Set blog
    const blogElement = document.getElementById("blog");
    if (profile.blog) {
        const blogLink = blogElement.querySelector("a");
        blogLink.href = profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`;
        blogLink.textContent = profile.blog;
        blogElement.classList.remove("hidden");
    } else {
        blogElement.classList.add("hidden");
    }
    
    // Set twitter
    const twitterElement = document.getElementById("twitter");
    if (profile.twitter_username) {
        const twitterLink = twitterElement.querySelector("a");
        twitterLink.href = `https://twitter.com/${profile.twitter_username}`;
        twitterLink.textContent = `@${profile.twitter_username}`;
        twitterElement.classList.remove("hidden");
    } else {
        twitterElement.classList.add("hidden");
    }
    
    // Set profile link
    document.getElementById("profileLink").href = profile.html_url;
    
    // Show profile
    profileElement.classList.remove("hidden");
}
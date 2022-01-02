//Targets div where profile information will appear
const overview = document.querySelector (".overview");
const username = "allyson-s-code";
const repoList = document.querySelector (".repo-list");

//Fetch API JSON Data
const getData = async function() {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await res.json();
    console.log(data);
    displayUserData(data);
};
getData();



//Fetch and Display User Info
const displayUserData = function(data) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
  <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> 
  `;
  overview.append(userInfo);
  getRepos();
}; 

//Fetch Repos
const getRepos = async function() {
    const res = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100
        `
    );
    const data = await res.json();
    displayRepoInfo(data);
};
getRepos();

//Display Info about Repos
const displayRepoInfo = function(repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    };
};
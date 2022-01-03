//Targets div where profile information will appear
const overview = document.querySelector (".overview");
const username = "allyson-s-code";
const repoList = document.querySelector (".repo-list");
const reposElement = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

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
    displayRepos(data);
};
getRepos();

//Display Info about Repos
const displayRepos = function(repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    };
};

repoList.addEventListener("click", function(e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //console.log(repoName);
        getRepoInfo(repoName);
    };
});

//Create Array of Languages
const getRepoInfo = async function(repoName) {
    const fetchInfo = await fetch (`
    https://api.github.com/repos/${username}/${repoName}
    `);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    //Grab languages
    const fetchLanguages = await fetch (repoInfo.languages_url);
        const languageData = await fetchLanguages.json();
        console.log(languageData);
    
        //Add languages to empty array
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        console.log(languages);

        displayRepoInfo(repoInfo, languages);
    }
};

//Function to Display Specific Repo Info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
    repoData.classList.remove("hide");
    reposElement.classList.add("hide");
};

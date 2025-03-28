const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getUser = async (username) =>{
    try{
    const response = await fetch(`${APIURL}${username}`);
    const data = await response.json();
    createUserCard(data);
    getRepos(username);
    }catch(error){
            createErrorCard(error);
    }
}

const getRepos = async (username) =>{
    try{
    const response = await fetch(`${APIURL}${username}/repos?sort=created`);
    const data = await response.json();
    addReposToCard(data);
    }catch(error){
        createErrorCard(error);
    
    }
}

const createUserCard = (user) =>{
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul class="info">
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
            </ul>

            <div id="repos"></div>
        </div>
    </div>
    `;

    main.innerHTML = cardHTML;
}

const createErrorCard = (error) =>{
    const cardHTML = `
        <div class="card">
            <h1>${error}</h1>
        </div>
    `;
    main.innerHTML = cardHTML;

};

// const addReposToCard=(repos)=>{
//     const reposEl = document.getElementById('repos');

//     repos.slice(0, 5).forEach(repo =>{
//             const repoEl = document.createElement('a');
//             repoEl.classList.add('repo');
//             repoEl.href = repo.html_url;
//             repoEl.target = '_blank';
//             repoEl.innerText = repo.name;
//             reposEl.appendChild(repoEl);
//         });

// };

const addReposToCard = (repos) => {
    const reposEl = document.getElementById('repos');
  
    if (Array.isArray(repos)) {
      repos.slice(0, 5).forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
      });
    } else {
      // Handle the case when `repos` is not an array, e.g., display an error message.
      reposEl.innerHTML = 'No repositories found.';
    }
  };
  

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if(user){
        getUser(user);
        search.value = "";
    }
});
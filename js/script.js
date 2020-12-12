let tabUsers;
let tabStatics;
let users = [];
let findUsers = [];
let countUsers = 0;

let countAges =0;
let avgAges =0;

let genderF = 0;
let genderM = 0;

let buttonSearch;
let inputName;


window.addEventListener('load', ()=>{
    loadDOM();
    fetchUsers();
    handleButtons();

});

function loadDOM(){
    form = document.querySelector('form');
    inputName = document.querySelector('#inputName');
    buttonSearch = document.querySelector('#buttonSearch');
    countUsers = document.querySelector('#countUser');

    tabUsers = document.querySelector('.users');
    tabStatics = document.querySelector('.statics');

    countAges = document.querySelector('#totalAges');
    avgAges = document.querySelector('#avgAges');

    
    genderF = document.querySelector('#countF');
    genderM = document.querySelector('#countM');


}

async function fetchUsers(){
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();

    users = json.results.map((user) =>{
        const { name, dob, picture, gender } = user;
        return {
            name: name.first + ' ' + name.last,
            age: dob.age,
            avatar: picture.thumbnail,
            gender,   
        };
    });
    findUsers = users;
  render();
}

function render(){
    orderName();
    loadUsers();
    statics();
}

function loadUsers(){
let usersHTML = '<div>';

findUsers.forEach(user => {
    const {name, age, avatar } = user;

    const divHTML = `
    <ul class="collection">
    <li class="collection-item avatar">
      <img src="${avatar}" class="circle">
      <span class="title">${name}, ${age} anos</span>
    </li>
    </ul> 
    `;

    usersHTML += divHTML;
});
usersHTML += '</div>';
tabUsers.innerHTML = usersHTML;

statics();
}

function orderName(){
    findUsers = findUsers.sort((a,b) =>{
        return a.name.localeCompare(b.name);
    });
}

function searchUser(){
    let searchName = inputName.value;
    findUsers = findUsers.filter((user)=>
    user.name.toLowerCase().includes(searchName.toLowerCase()));
    render();
}

function statics(){
    totalUsers = findUsers.length;
    countUsers.innerHTML = totalUsers;

    const womanCount = findUsers.filter((user) => user.gender === 'female');
    genderF.innerHTML = womanCount.length;

    const manCount = findUsers.filter((user)=> user.gender === 'male');
    genderM.innerHTML = manCount.length;

   const totalAges = findUsers.reduce((accumulator, current)=>{
       return accumulator + current.age;
   }, 0);
    countAges.innerHTML = totalAges;

    const averageAges = totalAges / totalUsers;
    avgAges.innerHTML = averageAges.toFixed(2);
}

function handleSubmit(event){
    event.preventDefault();
}

function handleButtons(){
    form.addEventListener('submit',handleSubmit);
   buttonSearch.addEventListener('click', searchUser);
   inputName.addEventListener('keypress', function(e){
       if(e.which == 13){
           searchUser();
   }
   });
}


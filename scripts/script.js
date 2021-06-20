'use script';

const main = document.getElementById('main');
const btnAddUser = document.getElementById('add-user');
const btnDouble = document.getElementById('double');
const btnFilterRich = document.getElementById('filter-rich');
const btnTotal = document.getElementById('total');

//adduser btn
let data = [];

//fetch a random user using random user api
const getRandomUser = async function(){
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const user = data.results[0];

    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        balance:Math.floor(Math.random()*100000)
    };
    addData(newUser);
}

const addData = function(obj){
    data.push(obj);
    updateDom();
};

const updateDom = function(provideData = data) {
    //clear main
    main.innerHTML = '<h2><strong>Name</strong> Balance</h2>';
    provideData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('users');
        element.innerHTML = `<strong>${item.name}</strong>${item.balance}`;
        main.appendChild(element);
    })
}

const balancedouble = function(){
    data = data.map(user => {
        return {...user,balance:user.balance*2}
    });
    updateDom();
};





btnAddUser.addEventListener('click',getRandomUser);
btnDouble.addEventListener('click',balancedouble);
btnFilterRich.addEventListener('click',filterrich);
//update dom with random user

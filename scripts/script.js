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
        element.innerHTML = `<strong>${item.name}</strong>Rs ${formatToCurrency(item.balance)}`;
        main.appendChild(element);
    })
}

const balancedouble = function(){
    data = data.map(user => {
        return {...user,balance:user.balance*2}
    });
    updateDom();
};

const filterrich = function(){
    data = data.filter((user)=>user.balance > 50000);
    updateDom();
};

const totalbalance = function(){
    const wealth = data.reduce((acc,user)=>(acc = acc + user.balance),0);
    const wealthFinal = document.createElement('div');
    wealthFinal.innerHTML = `<h3>Total balance:<strong>${formatToCurrency(wealth)}</strong></h3>`
    main.appendChild(wealthFinal);
};

function formatToCurrency(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



btnAddUser.addEventListener('click',getRandomUser);
btnDouble.addEventListener('click',balancedouble);
btnFilterRich.addEventListener('click',filterrich);
btnTotal.addEventListener('click',totalbalance);
//update dom with random user

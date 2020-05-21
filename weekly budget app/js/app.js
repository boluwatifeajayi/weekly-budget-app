//classes
class Budget{
    constructor(budget){
        this.budget = Number( budget );
        this.budgetLeft = this.budget;
    }
    //substract from budget
    substractFromBudget(amount){
        return this.budgetLeft -= amount;
    }
}

class HTML{
    insertBudget(amount){
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }
    printMessage(message, className){
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

    }
    /*
    setTimeout(() => {
        document.querySelector(".priamary .alert").remove();
    }, 3000);
    */

    addExpenseToList(name, amount){
       const expensesList = document.querySelector('#expenses ul');
       //create li
       const li = document.createElement('li');
       li.className = "list-group-item d-flex justify-content-between align-items-center";
       //create the template
       li.innerHTML = `
       ${name}
       <span class="badge badge-primary badge-pill">$ ${amount}</span>

       
       `;
       //insert into the html
       expensesList.appendChild(li); 
    }
    trackBudget(amount){
        const budgetLeftDollars = budget.substractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`;
        if((budget.budget / 4) > budgetLeftDollars){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        }
        else if((budget.budget / 2) > budgetLeftDollars){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
    
}



//variables
const addExpenseForm = document.querySelector('#add-expense');
const html = new HTML();
const budgetTotal = document.querySelector('span#total');
const budgetLeft = document.querySelector('span#left');
let budget, userBudget;



//eventlisteners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', function(){
        userBudget = prompt(' Whats\'s your budget for this week ?');

        if(userBudget === null || userBudget === '' || userBudget === '0'){
            window.location.reload();
        }
        else{
            budget = new Budget(userBudget);

            html.insertBudget(budget.budget);
        }

    });

    //when a new expense is added
    addExpenseForm.addEventListener('submit', function(e){
        e.preventDefault();


        const expsenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        localStorage.setItem('expenseName', JSON.stringify(expsenseName));

        const expenseNameLS = localStorage.getItem('expenseName');

        


        if(expsenseName === '' || amount === ''){
            html.printMessage("There Was an Error, All The feilds are required","alert-danger");
        }
        else{
            html.addExpenseToList(expsenseName, amount);
            html.trackBudget(amount);
            html.printMessage("Added...", "alert-success");
        }
    });
}




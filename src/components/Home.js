import React from 'react'
import { api } from '../App'
import { useState } from 'react'
let flag = true // flag is to stop transactionHistory calling from twice
const Home = (props) => {
    let totalIncome = 0, totalExpense=0
    document.title = "Expense Tracker | Home"; //Change the title
    const [incomeVal, setIncomeVal] = useState(0);
    const [expenseVal, setExpenseVal] = useState(0);
    const [balance, setBalance] = useState(0);
    // Funtion for new record
    function create() {
        let reason = document.getElementById('reason').value, amount = document.getElementById('amount').value, type;
         if(reason && amount && (amount[0]==='+' || amount[0]==='-')) {
             let doIt = false;
             if(amount[0]==='+') {
                type="income";
                setIncomeVal(incomeVal+parseInt(amount))
                doIt = true;
             } else if(amount[0]==='-'){
                type="expense";
                setExpenseVal(expenseVal+parseInt(amount))
                doIt = true;
             }
             if(doIt) {
                fetch(api,{
                    headers:{"Content-Type":"application/json; charset=utf-8" },
                    method:'POST',
                    body:JSON.stringify({
                        reason : reason,
                        amount : amount,
                        type : type
                    })
                })
                .then(response=>response.json())
                flag = true; // For calling transactionHistory
                transactionHistory();
                document.getElementById('reason').value = ""
                document.getElementById('amount').value = ""
            }
         }
    }
    function deleteRecord(id){ // To delete record
        fetch(api+'/'+id,{
            method: 'DELETE'
        }).then(response => console.log(response))
        flag = true
        transactionHistory()
    }
    function transactionHistory(){ // to show transaction history
        if(flag === true) {
            document.querySelectorAll('.main-box-box').forEach(e => e.remove());
            fetch(api, { method: 'GET' }).then(response => response.json()).then(data => {
                for(let i=0;i<data.length;i++){
                    let div = document.createElement('div')
                    div.className = 'main-box-box'
                    let divs = document.createElement('div')
                    div.appendChild(divs)
                    divs.innerHTML = data[i]['reason'] + " : " + data[i]['amount']
                    divs.style.color = data[i]['type'] === 'income' ? "rgb(85, 170, 1)" : "rgba(220, 20, 60, 1)"
                    divs.style.borderLeft = data[i]['type'] === 'income' ? ".2rem solid rgb(85, 170, 1)" : ".2rem solid rgba(220, 20, 60, 1)"
                    divs.className += 'box-box'
                    let bin = document.createElement('div')
                    bin.innerHTML = 'DELETE'
                    bin.style.color = 'crimson'
                    div.appendChild(bin)
                    bin.id = data[i]['_id']
                    bin.onClick = deleteRecord(data[i]['_id'])
                    document.getElementById('box').append(div)
                }
            })
            flag=false
        }
    }
    function showValues(){ //  Function to show income and expense values when page loaded
        fetch(api, { method: 'GET' }).then(response => response.json()).then(data => {
            for(let i=0;i<data.length;i++){
                if(data[i]['amount'][0] === '+') totalIncome += parseInt(data[i]['amount'])
                else totalExpense += parseInt(data[i]['amount'])
            }
            setIncomeVal(totalIncome)
            setExpenseVal(totalExpense)
            let bal = totalIncome + totalExpense
            bal = bal < 0 ?  Math.abs(bal) + " (Due)" : bal
            setBalance(bal)
        })
    }
    return (
        <div className="container" style={{backgroundColor : props.mode === 'light'? 'rgba(248,249,250,.9)': '#042743', color : props.mode === 'light'? 'black': 'white'}}>
            <div className="show-container" onLoad={showValues()}>
                    {/* Overview part */}
                    <div> {/* Remove div later*/}
                    <h4>Welcome User</h4>
                    <div className="show-container" style={{display:"flex", textAlign:"end", position:"relative"}}>
                            <h5 className="my-3">Balance : {balance}</h5> 
                            <button type="button" data-toggle="collapse" style={{position:"absolute",right:0,fontSize:"2rem",color:"#0d6efd",border:"none",background:"transparent"}} data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                +
                            </button>
                    </div>
                    <div className="collapse" id="collapseExample">
                    <div className={`card card-body  bg-${props.mode === 'light'? 'white' : 'dark'}`}>
                        <label htmlFor="basic-url">Reason</label>
                        <div className="input-group">
                        <input className={`form-control bg-${props.mode === 'light'? 'white' : 'dark text-white'}`} aria-label="With textarea" type="text" id="reason" placeholder="Food"/>
                        </div>
                        <label htmlFor="basic-url"  className="my-3">Amount</label>
                        <div className="input-group mb-1">
                            <input type="text" className={`form-control bg-${props.mode === 'light'? 'white' : 'dark text-white'}`} aria-label="Amount (to the nearest dollar)" id="amount" placeholder="-100"/>
                        </div>
                        <button type="submit" className="btn btn-outline-primary my-3" onClick={create}>Add</button>
                    </div>
                    </div>
                    <div className="amount-box my-3">
                        <div className="income">{incomeVal}</div>
                        <div className="expense">{expenseVal}</div>
                    </div>
                </div>
                {/* Transaction History part */}
                <h5>Transaction History</h5>
                <div id="box" style={{height:"20rem",width:"100%",overflow:"scroll"}} onLoad={transactionHistory()}></div>
            </div>
        </div>
    )
}

export default Home

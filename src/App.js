import React, { Component } from 'react';
import classes from './App.css';
import Input from './components/Input/Input';
import Button from './components/Button/Button';


class App extends Component {
  state = {
    budget: '',
    expense: [],
    context : [
         {item: '',expense:''}
    ],
    value: '',
    count: 0,
    contextValue: '',
    submitted: false
  };
  inputBudgetHandler = (e)=>{
    let budget = e.target.value;
    if(budget<0){
      alert("Budget can't be negitive");
      budget = ''
    }
    this.setState({
      budget: budget,
    })
  }
  inputContextHandler = (e)=>{
  const context = [...this.state.context];
  let contextValue = this.state.contextValue;
  contextValue = e.target.value;
  context[this.state.count].item = contextValue;
  this.setState({
    context: context,
    contextValue: contextValue,
  })
};
  inputValueHandler = (e)=>{
    const state = {...this.state};
    let value = this.state.value;
    value = e.target.value
    if(value<0){
      alert('Amount can\'t be negative');
      value = '';
    }
    state.expense[this.state.count] = value;
    state.context[this.state.count].expense = value;
    this.setState({
      expense: state.expense,
      value : value,
    })
  };
  submitHandler = ()=>{
    this.setState({
      value: '',
      count: this.state.count +1,
      context: this.state.context.concat([{item:"",expense: ''}]),
      contextValue: '',
      submitted: true
    })
  }
  clearHandler = ()=>{
    this.setState({
      budget: '',
      expense: [],
      context : [
         {item: '',expense:''}
      ],
      value: '',
      count: 0,
      contextValue: '',
      submitted: false
    })
  }
  deleteBtnHandler = (i)=>{
    const context = [...this.state.context];
    const tempState = {...this.state};
    tempState.expense.splice(i,1);
    context.splice(i,1);
    this.setState({
      context: context,
      expense: tempState.expense,
      count: this.state.count - 1
    })
  }
  render() {
   const arr = [...this.state.context];
   const expenseSum = [...this.state.expense].reduce((sum,item)=>+sum+(+item),0);
   console.log(this.state)
  
    return (
      <div className ={classes.Container}>
 
        <h1 className = {classes.Heading}>Budget Calculator</h1>
        <div className={classes.Content}>    
          <div className = {classes.Input}>
              <div className ={classes.InputInner}>
                <p>Budget</p>
                <Input 
                type = 'number' 
                placeholder='Enter number' 
                onChange = {(e)=>this.inputBudgetHandler(e)} 
                value = {this.state.budget}/>
              </div >
             <div className ={classes.InputInner}>
             <p>Context</p>
             <Input 
             clicked ={this.inputContextHandler} 
             placeholder = 'e.g Fuel' 
             type = 'text' 
             onChange = {(e)=>this.inputContextHandler(e)} 
             value ={this.state.contextValue}/> 
            </div>
            <div className ={classes.InputInner}>
              <p>Amount</p>
            <Input 
            clicked ={this.inputValueHandler} 
            type ='number' 
            placeholder='Enter number' 
            onChange ={(e)=>{this.inputValueHandler(e)}} 
            value = {this.state.value}/>
          </div>
            </div>
          <div className = {classes.Btn}>
            <Button clicked = {this.submitHandler}>Submit</Button>
          </div>
            <div className ={`${classes.List} ${this.state.submitted ?null:classes.Deleted}`}>
            {arr.map((item,i)=>
            i<arr.length-1?<div className ={classes.ListItems}
             key={item + i}><div>{item.item}</div>
             <div>{item.expense}</div>
            <div><i className={`fa fa-pencil ${classes.Icon}`} aria-hidden="true"></i><i className={`fa fa-trash ${classes.Icon}`} aria-hidden="true" onClick={(i)=>this.deleteBtnHandler(i)}></i></div></div>:null)}
            </div>
          <div className = {classes.Btn}>
            {this.state.submitted && this.state.count>0?<Button clicked ={this.clearHandler} hide ={this.state.submitted}>Clear All</Button>:null}
          </div>
        </div>
        <div className ={`${classes.Balance} ${this.state.submitted?null:classes.Deleted}`}>
         Balance : <span style ={this.state.budget - expenseSum>0?{color:'green'}:{color:'red'}}>Rs {(this.state.budget - expenseSum).toFixed(2)}</span>
        </div>
        </div>

    );
  }
}

export default App;

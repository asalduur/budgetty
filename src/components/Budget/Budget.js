import React, { Component } from 'react';
import {connect} from 'react-redux'
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import {requestUserData} from '../../ducks/userReducer'
import {requestBudgetData, addPurchase, removePurchase} from '../../ducks/budgetReducer'


class Budget extends Component {

  componentDidMount() {
    this.props.requestUserData()
    this.props.requestBudgetData()
  }

  render() {
    const {loading, purchases, budgetLimit} = this.props.budget
    const {firstName, lastName} = this.props.user
    return (
      <Background>
        {/* true in ternary changed to 'loading' off of our reducer (which is false by default) */}
        {loading ? <Loading /> : null} 
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName}/>
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={this.props.addPurchase} />
              <DisplayPurchases purchases={purchases} removePurchase={this.props.removePurchase} />
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit}/>
              <Chart2 purchases={purchases}/>
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget,  //all redux store values are now this.props.budget
    user: state.user

  }  
}
export default connect(mapStateToProps, {requestUserData, requestBudgetData, addPurchase, removePurchase})(Budget);

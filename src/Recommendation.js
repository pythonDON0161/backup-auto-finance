import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { StateMachineContext, useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Center, Progress, Heading, Spinner, Select, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { render } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";

function Recommendation(props) {

  const { handleSubmit, register } = useForm();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const { action, state } = useStateMachine(updateAction);
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "selectedBankOne": data.bankSelection1,
        "selectedBankTwo": data.bankSelection2 
      }
    }
    fetch(`https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications?filter[emailAddress]=${user.email}`, {
      headers: headers,
    })
    .then((response) => response.json())
    .then(json => {
      // Do something with object
      const userID = json.applications[0].id;
      fetch(`https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/applications/${userID}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then((addInfo) => addInfo.json())
    .then(json => {
      // Do something with object
      console.log(json.application);
    });
    });
    props.history.push("./additional-info");
  };

  const [isLoading, setIsLoading] = useState(true);
  const [checkedItems, setCheckedItems] = React.useState([]);
  const [approvedBanks] = useState([]);
  const [monthlyPayments] = useState([]);

     //console.log("hello")

     // add cash down and towardsPurchase variable
     let finalDeposit = ( Number(state.data.cashDown) + Number(state.data.towardsPurchase) )
       
     //console.log("Towards Purchase"+state.data.towardsPurchase);

 //console.log("Cash Down" + state.data.cashDown);
 //parseInt(state.data.towardsPurchase);
  console.log( parseInt(state.data.cashDown) );
  console.log( parseInt(state.data.towardsPurchase) );

  async function fetchTDSR(data) {
    setIsLoading(true);
    const response = await fetch(
      "https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/tdsr",
      {
        method: "GET",
        headers: headers,
      }
    );
    const ratio = await response.json();
   
    const tdsrobj = Object.values(ratio);
    
    //Pre Qualification: Filter for banks qualified for based on TDSR
    //Current: pushes banks where TDSR is less than their maximum to a seperate array name approved banks.

    tdsrobj[0].map((item) => {
      if (state.data.caTotalMonthly > 0){

            if (state.data.finalRatio <= item.maximum) {
              approvedBanks.push({ item });
            }  
      } 

      else if(state.data.ratio<= item.maximum) { 

        approvedBanks.push({ item });

      }
    
    });
     
     
    async function calculateLowestMonthly() {
      console.log(state.data.ratio)
      //console.log(ratio)
      console.log(approvedBanks)

      for (let j = 0; j < approvedBanks.length; j++) {
        const thisBank = approvedBanks[j].item.banks.toLowerCase();
        const response = await fetch(
          `https://api.sheety.co/fac58a6ce39549d46ffe9b02f9d54437/bankTerms/${thisBank}a?filter[year]=${state.data.modelYear}&filter[new/used]=${state.data.carStatus}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        const bankData = await response.json();
     
        const bankObj = Object.values(bankData);
        let payment;
        let loanAmount;
        let deposit = bankObj[0][0].deposit;
        
        //Calculate each approved bank's monthly payment
        if ( state.data.cashDown >  Math.round( (deposit * state.data.totalBorrow * 100 ) / 100) ||
             state.data.towardsPurchase >  Math.round( (deposit * state.data.totalBorrow * 100 ) / 100) 
        ) 
        {

          payment = Math.round(
              ( state.data.totalBorrow  *
                (bankObj[0][0].rate / 12) *
                Math.pow(1 + bankObj[0][0].rate / 12, bankObj[0][0].term)) /
                (Math.pow(1 + bankObj[0][0].rate / 12, bankObj[0][0].term) - 1)
            );

          loanAmount =  state.data.totalBorrow;
        }

        else{

          payment = Math.round(
            ((state.data.totalBorrow-state.data.totalBorrow * bankObj[0][0].deposit) *
              (bankObj[0][0].rate / 12) *
              Math.pow(1 + bankObj[0][0].rate / 12, bankObj[0][0].term)) /
              (Math.pow(1 + bankObj[0][0].rate / 12, bankObj[0][0].term) - 1)
          );

          loanAmount =  state.data.price - Math.round( (deposit * state.data.price * 100 ) / 100);

        }
    
        let rate = bankObj[0][0].rate;
        let fees = Math.round((bankObj[0][0].otherFees + (bankObj[0][0].procFees * state.data.totalBorrow))/1000)*1000;
        let term = bankObj[0][0].term;

       // loanAmount =  state.data.price - Math.round( (deposit * state.data.price * 100 ) / 100);

        monthlyPayments.push({ thisBank, payment, rate, deposit, fees, term, loanAmount });
        
        //create a new array to store just 3 'answers'
      }

      console.log("monthly payments", monthlyPayments)

      state.data.bankPayments = monthlyPayments;

      if (state.data.criteria === "Lowest interest rate") {

        state.data.bankPayments.sort((a, b) => {
          return a.rate - b.rate;
        });

      } else {
        
        if(state.data.carStatus =="Used"){

        state.data.bankPayments.sort((a, b) => {
          /*console.log(a.payment, b.payment)*/ 
          return a.deposit - b.deposit;})
        } else{

          state.data.bankPayments.sort((a, b) => {
            /*console.log(a.payment, b.payment)*/ 
            return a.payment - b.payment;})

        }
          
      }

      if (state.data.primaryBank !== "npa") {
        console.log("Primary Bank " + state.data.primaryBank)
        const position = state.data.bankPayments.findIndex(function (payment) {
          return payment.thisBank === state.data.primaryBank;
        });
        // console.log(position);

      
        if (position >= 2) {
          state.data.bankPayments.unshift(
            state.data.bankPayments.find(
              ({ thisBank }) => thisBank === state.data.primaryBank
            )
          );
        } 

      }
      action(data);
 
      setIsLoading(false);
    }


    calculateLowestMonthly();
  }

  useEffect(() => {
    let unmounted = false;

      if(!unmounted){
        fetchTDSR();
      }
      
    return () => {
      unmounted = true;
    };
    
  }, []);

  return (
    <div class="coApp">
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <Heading>Recommended Banks</Heading>
        <br />
        <p>
          Below are the Bank deals that we believe best meet your needs. Please
          select up to 2 banks to request offers.
          <br />
        </p>
        <br/>
        <p> <strong> Price of Car/Budget: </strong>  ${ state.data.price.toLocaleString() }</p>
        <p> <strong> Model Year Of Vehicle:</strong> {state.data.modelYear}  </p>
        <p> <strong> Status Of Vehicle: </strong> {state.data.carStatus} </p>
        <p> <strong> Criteria: </strong> {state.data.criteria}  </p> 
        
        {isLoading ? (
          <Center>
            <Spinner className="loading" size="xl" />
            We're pulling the latest info from our banking partners to find the best rate for you
          </Center>
        ) : 
        
        (
          <>
            <table>
              <tbody>
                <tr>

                  <th>Bank</th>
                  <th>Total Down<br/> Payment</th>
                  <th>Loan<br/>Amount</th>
                  <th>Monthly<br/>Payment</th>
                  <th>Interest<br/>Rate</th>
                  <th>Loan Term</th>
                  <th>Estimated<br/>Fees</th>
               
                </tr>
              
                <tr>

                  <td> { state.data.bankPayments[0].thisBank.toUpperCase() } </td>
              
                  <td>
                    
              ${  /* If calculated downpayment greater than cashDown then show cashDown */
                ( Math.round( (state.data.bankPayments[0].deposit * state.data.price * 100 ) / 100) > state.data.cashDown 
                  || Math.round( (state.data.bankPayments[0].deposit * state.data.price * 100 ) / 100) > parseInt(state.data.towardsPurchase) )
                      ?
                    // show deposit or cashdown
                  Math.round( (state.data.bankPayments[0].deposit * state.data.price * 100 ) / 100).toLocaleString("en") :
                      Math.round(state.data.cashDown) > parseInt(state.data.towardsPurchase) ?  
                         Math.round(state.data.cashDown).toLocaleString("en") : parseInt(state.data.towardsPurchase).toLocaleString("en")
                    } 

                  </td>

                  <td>${ state.data.bankPayments[0].loanAmount.toLocaleString()}</td>
                  
                  <td> ${state.data.bankPayments[0].payment.toLocaleString("en")} </td>
                  
                  <td> {Math.round(state.data.bankPayments[0].rate * 100 * 100) / 100} % </td>

                  <td>{state.data.bankPayments[0].term} months</td>

                  <td> ${state.data.bankPayments[0].fees.toLocaleString("en")} </td>


                </tr>

                <tr>
                  <td>{state.data.bankPayments[1].thisBank.toUpperCase()}</td>
                  
                  <td>
                    ${  /* If calculated downpayment greater than cashDown then show cashDown */
                      ( Math.round( (state.data.bankPayments[1].deposit * state.data.price * 100 ) / 100) > state.data.cashDown 
                            || Math.round( (state.data.bankPayments[1].deposit * state.data.price * 100 ) / 100) > parseInt(state.data.towardsPurchase)
                            ) ?

                            Math.round( (state.data.bankPayments[1].deposit * state.data.price * 100 ) / 100).toLocaleString("en") :
                            Math.round(state.data.cashDown) > parseInt(state.data.towardsPurchase) ?  
                               Math.round(state.data.cashDown).toLocaleString("en") : parseInt(state.data.towardsPurchase).toLocaleString("en")
                    }
                    </td>
                    
                  <td>${ state.data.bankPayments[1].loanAmount.toLocaleString()}</td>

                  <td> ${state.data.bankPayments[1].payment.toLocaleString("en")} </td>
                  
                  <td> { Math.round(state.data.bankPayments[1].rate * 100 * 100) / 100} %</td>

                  <td>{state.data.bankPayments[1].term} months</td>

                  <td> ${state.data.bankPayments[1].fees.toLocaleString("en")} </td>
                  
                </tr>

                <tr>
                  <td>{state.data.bankPayments[2].thisBank.toUpperCase()}</td>

                    <td>
                    ${  /* If calculated downpayment greater than cashDown then show cashDown */
                      ( Math.round( (state.data.bankPayments[2].deposit * state.data.price * 100 ) / 100) > state.data.cashDown || parseInt(state.data.towardsPurchase) ) ?

                      Math.round( (state.data.bankPayments[2].deposit * state.data.price * 100 ) / 100).toLocaleString("en") :
                      Math.round(state.data.cashDown) > parseInt(state.data.towardsPurchase) ?  
                         Math.round(state.data.cashDown).toLocaleString("en") : parseInt(state.data.towardsPurchase).toLocaleString("en")
                    }
                    </td>


                  <td>${ state.data.bankPayments[2].loanAmount.toLocaleString()}</td>
                  
                  <td> ${state.data.bankPayments[2].payment.toLocaleString("en")} </td>
                  
                  <td> {Math.round(state.data.bankPayments[2].rate * 100 * 100) / 100} % </td>

                  <td> {state.data.bankPayments[2].term} months</td>
                  
                  <td> ${state.data.bankPayments[2].fees.toLocaleString("en")} </td>
                  
                  {/* <td>
                    <Center>
                      <Controller
                        name="chosenBank"
                        control={control}
                        // defaultValue={state.data.chosenBank[3]}loanam
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Checkbox
                            isChecked={checkedItems[2]}
                            onChange={(e) =>
                              setCheckedItems([e.target.checked])
                            }
                            {...field}
                          />
                        )}
                      />
                    </Center>
                  </td> */}
                </tr>
              </tbody>
            </table>
            <div className="bankSelections">
            <Select
              name="bankSelection1"
              options={[state.data.bankPayments[0].thisBank.toUpperCase(), state.data.bankPayments[1].thisBank.toUpperCase(), state.data.bankPayments[2].thisBank.toUpperCase()]}
              defaultValue={state.data.creditGrade}
              placeholder="Select option 1"
              ref={register({ required: true })}
              isFullWidth={false}
            >
              <option value={state.data.bankPayments[0].thisBank.toUpperCase()}>{state.data.bankPayments[0].thisBank.toUpperCase()}</option>
              <option value={state.data.bankPayments[1].thisBank.toUpperCase()}>{state.data.bankPayments[1].thisBank.toUpperCase()}</option>
              <option value={state.data.bankPayments[2].thisBank.toUpperCase()}>{state.data.bankPayments[2].thisBank.toUpperCase()}</option>
            </Select>
            <Select
              name="bankSelection2"
              options={[state.data.bankPayments[0].thisBank.toUpperCase(), state.data.bankPayments[1].thisBank.toUpperCase(), state.data.bankPayments[2].thisBank.toUpperCase()]}
              defaultValue={state.data.creditGrade}
              placeholder="Select option 2"
              ref={register({ required: true })}
              isFullWidth={false}
            >
              <option value={state.data.bankPayments[0].thisBank.toUpperCase()}>{state.data.bankPayments[0].thisBank.toUpperCase()}</option>
              <option value={state.data.bankPayments[1].thisBank.toUpperCase()}>{state.data.bankPayments[1].thisBank.toUpperCase()}</option>
              <option value={state.data.bankPayments[2].thisBank.toUpperCase()}>{state.data.bankPayments[2].thisBank.toUpperCase()}</option>
            </Select>
            </div>
            <Center>
              <button
                type="submit"
                className="submit-button"
                value="Save & Continue"
              >
                Continue
              </button>
            </Center>
          </>
        )}
        <br />
        
      </form>
      )}

      {!isAuthenticated && (
        <Container centerContent class="pt-8">
          <SimpleGrid columns={1} spacing="20px">
            {/* <Center>
              <img src={raceCar} alt="Race Car" />
            </Center> */}
            <Center>
              <Text fontSize="xl">
                Please Log in or Sign Up below to access this page and find out
                what you qualify for.
              </Text>
            </Center>
            <Center>
              <Button
                onClick={() =>
                  loginWithRedirect({
                    redirectUri: `${window.location.origin}/recommendation`,
                  })
                }
              >
                Log In/Sign Up
              </Button>
            </Center>
          </SimpleGrid>
        </Container>
      )}

      <FeedbackFish projectId="01ebf0d6447158">
        <button className="feedback">Give us Feedback</button>
      </FeedbackFish>
    </div>
  );
}

export default withRouter(Recommendation);
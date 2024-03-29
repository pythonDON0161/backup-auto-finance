import React, {useEffect, useState} from "react";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import updateAction from "./updateAction";
import { Grid,
  GridItem, 
  Center, 
  Heading,
  Progress } from "@chakra-ui/react";
import green from "./assets/green.png";
import amber from "./assets/amber.png";
import red from "./assets/red.png";
import { Link, useHistory } from "react-router-dom";
import ConfettiGenerator from "confetti-js";
import { Buffer } from 'buffer';

import Header from "./components/Header";

//email packages
import emailjs from '@emailjs/browser';
import  { parse } from 'json2csv';


var employmentRisk;

const Result = (props) => {
  const { state } = useStateMachine(updateAction);
  const {
    register,
    setValue,
    getValues,
  } = useForm();

  const history = useHistory()
  
  //register({ name: "finalTDSR", type: "custom" });
  // Handles employment risk

  register({name: "employmentRisk", type:"custom"});

  if  (state.data.workExperience == "Less than 1 year" || state.data.probationaryPeriod =="Yes"|| state.data.outOfWork == "Yes"  )
  {
        employmentRisk = "yes"
        setValue("employmentRisk","yes");
   }

const colHeaders=[
  "EmailAddress", "CarPrice","CarStatus","ModelYear","FirstName", "LastName", "DateOfBirth", "CellNumber",
  "EmploymentStatus", "GrossMonthlyIncome","OtherMonthlyIncome","Mortgage","Rent","CreditCard","OtherLoanPayments",
  "TradeIn", "EstimatedTradeValue","TowardsCar", "CashDownPayment","GradeYourCredit", "CoAppFirstName","CoAppLastName",
  "CoAppBirthdate","CoAppCell", "CoAppEmploymentStatus","CoAppGrossMonthly",
  "CoAppOtherMonthly", "CoAppMortgage","CoAppRent","CoAppCreditCard","CoAppOtherLoan","CoAppCredit",	"Ratio", 
  "CombinedTDSR","LoanTerm", "InterestRate", "EstimatedPayment"

]


  var user_data= 
  {
    EmailAddress: state.data.email, 
    CarPrice: state.data.price.toLocaleString(),
    CarStatus: state.data.carStatus,
    ModelYear: state.data.modelYear,
    FirstName: state.data.firstName, 
    LastName: state.data.lastName, 
    DateOfBirth: state.data.dateOfBirth, 
    CellNumber: state.data.cellNumber,
    EmploymentStatus: state.data.employmentStatus,
    GrossMonthlyIncome: state.data.grossMonthly,
    OtherMonthlyIncome: state.data.otherMonthly,
    Mortgage: state.data.mortgage,
    Rent:state.data.rent,
    CreditCard: state.data.creditCard,
    OtherLoanPayments: state.data.otherLoans,
    TradeIn: state.data.tradeIn,
    EstimatedTradeValue: state.data.currentCar ,
    TowardsCar: state.data.towardsPurchase,
    CashDownPayment: state.data.cashDown,
    GradeYourCredit: state.data.creditGrade,
    CoAppFirstName: state.data.caFirstName,
    CoAppLastName: state.data.caLastName,
    CoAppBirthdate : state.data.caDateOfBirth,
    CoAppCell : state.data.caCellNumber,
    CoAppEmploymentStatus: state.data.caCreditGrade,
    CoAppGrossMonthly: state.data.caGrossMonthly,
    CoAppOtherMonthly: state.data.caOtherMonthly,
    CoAppMortgage:  state.data.caMortgage,
    CoAppRent: state.data.caRent,
    CoAppCreditCard: state.data.caCreditCard,
    CoAppOtherLoan: state.data.caOtherloans,
    CoAppCredit: state.data.caCoAppCredit,	
    Ratio: state.data.ratio.toFixed(2),
    CombinedTDSR: state.data.combinedTDSR2,
    LoanTerm: state.data.calcTerm,
    InterestRate: state.data.calcRate,
    EstimatedPayment: state.data.estimatedPayment,

  }

//convert the data to CSV with the column names
const csv = parse(user_data, colHeaders );

var finalCsv =  Buffer.from(csv).toString("base64");

function sendEmail() {  
  
  var templateParams = { 
    email: state.data.email, 
    name: state.data.firstName, 
    lastName: state.data.lastName, 
    employment: state.data.employmentStatus,
    income: parseInt(state.data.grossIncome + state.data.otherMonthlyIncome), 
    dob: state.data.dateOfBirth, 
    cell: state.data.cellNumber,
    cashDown: state.data.cashDown,
    tradeIn: state.data.towardsPurchase,
    carPrice: state.data.price.toLocaleString(),
    status: state.data.carStatus,
    modelYear: state.data.modelYear,
    tdsr : state.data.ratio,
    totalBorrow: state.data.totalBorrow.toLocaleString(),

    cusdata: finalCsv
  
  }

    emailjs.send('service_f9v8pdk', 'template_08gvmnj' ,templateParams, 'PqN3ytZ-5Y1PJ4wPp',{ cusdata: finalCsv } )
    .then(function(response) {

     //console.log('SUCCESS!', response.status, response.text);

    }, function(error) {console.log('FAILED...', error); });

  }


var singleTDSR = state.data.ratio
//setValue("tdsr", singleTDSR);

   var tdsr;

  //if user opts to use a co-applicant

  let combinedTDSR;
  let combinedTDSR2

  const caTDSR = state.data.caTDSR; // co-applicant TDSR
  const caIncome = state.data.caTotalMonthly
  combinedTDSR = (singleTDSR + caTDSR) / 2;
  combinedTDSR2 = (state.data.estimatedExpenses + state.data.caTotalExpenses) / 
    (state.data.totalMonthly + state.data.caTotalMonthly)
  //setValue("finalTDSR", caTDSR)

 //console.log("this is caIncome" + state.data.caTotalMonthly )

if( caIncome > 0 ){
  tdsr = combinedTDSR2;
 //console.log("Combined TDSR", combinedTDSR)
  //console.log("This is FINAL TDSR", state.data.finalTDSR)
} else{ tdsr = singleTDSR  }


  useEffect(() => {
    const confettiSettings = {
      target: 'my-canvas',
      max: 300,
      animate: true,
      props: ["circle","square","triangle","line"],
      colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
      clock: 35,
      start_from_edge: true
    }; 
   
    const confetti = new ConfettiGenerator(confettiSettings);
      // Show confetti if the following criteria are met
    // TDSR is calculated by estimatedExpenses divided by total monthly income

    if(tdsr < 0.4 && ( currentAge >=  18 && (currentAge - 6) < 65 ) && state.data.employmentStatus !== "Student" && state.data.employmentStatus !== "Unemployed" && 
    state.data.employmentStatus !== "Retired" && employmentRisk !== "yes" && state.data.creditGrade !== "Below Average" 
    && state.data.creditGrade !== "Overseas" && state.data.creditGrade !== "No Credit") {
    confetti.render();
    }
    return () => confetti.clear();
  })


  const from = state.data.dateOfBirth.split("/");
  const birthdateTimeStamp = new Date(from[2], from[1] - 1, from[0]);
  const cur = new Date();
  const diff = cur - birthdateTimeStamp;
  // This is the difference in milliseconds
  const currentAge = Math.floor(diff/31557600000);

  let coAppFrom
  let cobirthdate 
  let coAppCur
  let coAppdiff 
  let coAppAge


  if( caTDSR ){
    coAppFrom = state.data.caDateOfBirth.split("/");
    cobirthdate = new Date( coAppFrom[2], coAppFrom[1] - 1, coAppFrom[0] );
    coAppCur = new Date();
    coAppdiff = coAppCur - cobirthdate;
    // This is the difference in milliseconds
    coAppAge = Math.floor(coAppdiff/31557600000);

  }
  
 //console.log(currentAge)
 

  sendEmail() // send email to customer

  function finalTDSR(){

    
    history.push('/bank-selection')
    

}


  const GreenLight = () =>{ 
    return (
        <>

         <div>
            <Heading>Congratulations!</Heading>
            <p>
              Based on the information provided, Deal Selecta JA believes that a car
              loan application for{" "}
              <strong>
                ${Math.round(state.data.totalBorrow).toLocaleString("en")}
              </strong>{" "}
              would be <strong>APPROVED.</strong>
            </p>
            <br />
            
            <Grid templateColumns="repeat(3, 1fr)">
              <GridItem colSpan={1}>
                <img src={green} width={125} alt="Green Light" />
              </GridItem>
              <GridItem colSpan={2}>
                <p className="finePrint">
                  Note: Nothing herein constitutes an offer of finance. Final
                  bank approval will require additional information – and its
                  lending decision will be based on your credit score and other
                  factors.
                </p>
              </GridItem>
            </Grid>
            <br />
            <Center>
            <Link to="bank-selection" >
              <button onClick={finalTDSR} className="submit-button">Bank Selection</button>
            </Link>
          </Center>
          {/* <div className="TDSR">
          
              <p>For Internal Use Only</p>

              <p> <strong> xxx:<large>{state.data.estimatedPayment}</large> </strong> </p>
              <p> <strong> Axx:  <large>{singleTDSR}</large> </strong> </p>
              <p>  <strong> Cxx: {caTDSR.toFixed(2)} </strong>  </p>
              <p>  <strong> Txx: {combinedTDSR2.toFixed(2)} </strong>  </p>
                <p> <strong>  {"yyy:" + state.data.calcRate} </strong> </p>
                <p> <strong>  {"zzz:"+ state.data.calcTerm}</strong></p>
              <br/>
              <br/>

          </div> */}
          </div>
        
        </>

    )}

    const YellowLight = () =>{ 
      return (
          <>
            <div>
              <p>
                Based on the information provided, Deal Selecta JA believes that a car
                loan application for{" "}
                <strong>
                  ${Math.round(state.data.totalBorrow).toLocaleString("en")}
                </strong>{" "}
                may be APPROVED SUBJECT TO CONDITIONS.
              </p>
              <br />
              
              {/* {state.data.existingCarLoan > 0 && (
                <p>
                  The above assumes that your existing car loan of $x [is paid
                  off/remains outstanding].
                </p>
              )} */}

              <Grid templateColumns="repeat(3, 1fr)">
                <GridItem colSpan={1}>
                  <img src={amber} width={125} alt="Amber Light" />
                </GridItem>

                <GridItem colSpan={2}>
                  These may be in relation to:
                  <ol>
                    <strong>
                    {(state.data.estimatedExpenses / state.data.totalMonthly >= 0.4 && state.data.estimatedExpenses / state.data.totalMonthly <= 0.47) && (  
                    <li>
                      Financial Ratios – a bank may ask you to pay down some existing debt, borrow a lower amount or include a Co-Applicant
                    </li>
                    )}
                    {(currentAge < 18 || currentAge > 65 || (currentAge + 6) > 65 ) && (
                    <li>Age of Applicant/Co-Applicant</li>
                    )}
                    {(state.data.employmentStatus === "Student" || state.data.employmentStatus === "Retired") && (
                    <li>Employment Status/Tenure</li>
                    )}
                    {(employmentRisk === "yes" ) && ( <li> Employment</li>)
                    }
                     
                      {(state.data.employmentStatus === "Unemployed" ) && ( <li> Employment</li>)
                    }
                    {(state.data.creditGrade === "Below Average" || state.data.creditGrade === "Overseas" || state.data.creditGrade === "No Credit" ) && (
                    <li>Credit Score/History</li>
                    )}

                    </strong>
                  </ol>
                </GridItem>
              </Grid>
              <br />
              <p className="finePrint">
                Note: Nothing herein constitutes an offer of finance. Final bank
                approval will require additional information – and its lending
                decision will be based on your credit score and other factors.
              </p>
              <br />
            <Center>
            <Link to="/bank-selection" >
              <button  onClick={finalTDSR} className="submit-button">Bank Selection</button>
            </Link>
          </Center>
          <div className="TDSR">

    <p>For Internal Use Only</p>
    <p> <strong> Estimated Payment:<large>{state.data.estimatedPayment}</large> </strong> </p>
    <p> <strong> A:  <large>{singleTDSR}</large> </strong> </p>
    <p> {state.data.caTotalMonthly > 0 ? <strong>CR: {caTDSR.toFixed(2)} </strong> : null} </p>
    <p> {state.data.caTotalMonthly > 0 ? <strong>CO: {combinedTDSR2.toFixed(2)} </strong> : null} </p>
    <p> <strong>  {"R:" + state.data.calcRate} </strong> </p>
    <p> <strong>{"T:"+ state.data.calcTerm}</strong></p>
    <br/>
    <br/>

</div>
            </div>
          </>
  
      )}


      const RedLight = () =>{ 
        return (
            <>

        <div>
            <p>
              Based on the information provided, Deal Selecta JA believes that a car
              loan application for{" "}
              <strong>
                ${Math.round(state.data.totalBorrow).toLocaleString("en")}
              </strong>{" "}
              would be <strong>DECLINED.</strong>
            </p>
            <br />

            <Grid templateColumns="repeat(3, 1fr)">

              <GridItem colSpan={1}>
                <img src={red} width={125} alt="Red Light" />
              </GridItem>

              <GridItem colSpan={2}>
                The negative items likely to factor into a Bank’s decision
                include:
                <ol type="1">

                    <strong>
                    {state.data.estimatedExpenses / state.data.totalMonthly >= 0.47 && (  
                    <li>
                      Financial Ratios – a bank may ask you to pay down some existing debt, borrow a lower amount or include a Co-Applicant
                    </li>
                    )}
                    {(currentAge < 18 || currentAge > 65 || (currentAge + 6) > 65 ) && (
                    <li>Age of Applicant</li>
                    )}
                    {( coAppAge < 18 || coAppAge > 65 || (coAppAge + 6) > 65 ) && (
                       <li>Age of Co-Applicant</li>

                    )}
                    {(state.data.employmentStatus === "Student" || state.data.employmentStatus === "Retired") && (
                    <li>Employment Status/Tenure</li>
                    )}
                     {(employmentRisk === "yes" ) && ( <li> Employment</li>)
                    }
                      {(state.data.employmentStatus === "Unemployed" ) && ( <li> Employment</li>)
                    }

                    {(state.data.creditGrade === "Below Average" || state.data.creditGrade === "Overseas" || state.data.creditGrade === "No Credit" ) && (
                    <li>Credit Score/History</li>
                    )}
                    </strong>

                  </ol>
                  <br />
                 {/* <p>Based on the information you have provided, we estimate that you could be approved for
                    a loan of up to {<strong> max loan variable</strong>} [assuming your current car loan is paid off].</p> */ }
               
                <br/>
                <br />
                Your application may be strengthened by one or more of the
                following: 
                <li>including a co-applicant</li> 
                <li>paying off existing debt obligations</li>
                <li>borrowing a lower amount / buying a less expensive vehicle </li>
                <br/>

                We suggest you speak to your banker to discuss your options. 
                 You may also email us at admin@dealselectaja.com if you have any questions
              </GridItem>
            </Grid>
            <br />

            <p>
               {/* Maximum Loan Amount: tdsr */}

            </p>

            <p className="finePrint">
             
            </p>
            <Center>
              <Link to="/">
                <button className="submit-button">Home/Amend Application</button>
              </Link>
            </Center>
            {/* <div className="TDSR">
              <p>For Internal Use Only</p>
              <p> <strong> xxx:<large>{state.data.estimatedPayment}</large> </strong> </p>
              <p> <strong> Axx:  <large>{singleTDSR}</large> </strong> </p>
                  <p>  <strong> Cxx: {caTDSR.toFixed(2)} </strong>  </p>
                  <p>  <strong> Txx: {combinedTDSR2.toFixed(2)} </strong>  </p>
                  <p> <strong>  {"yyy:" + state.data.calcRate} </strong> </p>
                  <p> <strong>  {"zzz:"+ state.data.calcTerm}</strong></p>
                  <br/>
                  <br/>

            </div> */}
            </div>
            </>
            ) 

        }

if( tdsr> 0.5){
  return (
    <>
<Header />
    <div className="result">
      {/* TDSR OUTPUT IN HTML */}
 

    <canvas id="my-canvas">  </canvas>
     <RedLight></RedLight>

    </div>
    </>
    
    )

}

else if ( tdsr <0.4  && state.data.employmentStatus !== "Student" && employmentRisk !=="yes" && state.data.employmentStatus !== "Retired" && 
   state.data.creditGrade !== "Below Average" && state.data.employmentStatus !=="Unemployed" && 
  
   state.data.creditGrade !== "Overseas" && state.data.creditGrade !== "No Credit" && 
   ( currentAge >=  18 && (currentAge - 6) < 65 )  )   {

  return (
    <>
      <Header />
      <div className="result">
        {/* TDSR OUTPUT IN HTML */}
 

      <canvas id="my-canvas">  </canvas>
       
       <GreenLight></GreenLight>
             
      </div>
    </>

   ) } 
   
   else if( (tdsr>= 0.4 && tdsr<= 0.50) || 
   ( state.data.employmentStatus === "Student" || state.data.employmentStatus === "Retired" ||  
     state.data.employmentStatus === "Unemployed" || employmentRisk === "yes" || state.data.creditGrade === "Below Average" ||  
     state.data.creditGrade === "Overseas" || (currentAge < 18 || currentAge > 65 || (currentAge + 6) > 65 ) ||
     state.data.creditGrade === "No Credit" )  
     
     ) {
      return (
        <>
          <Header />
          <div className="result">
            {/* TDSR OUTPUT IN HTML */}
      
    
          <canvas id="my-canvas">  </canvas>
           <YellowLight></YellowLight>
      
          </div>
        </>)
    } 


    else if(tdsr<0.4 && ( state.data.employmentStatus === "Student" || state.data.employmentStatus === "Retired" ||  
    state.data.employmentStatus === "Unemployed" || employmentRisk === "yes" || state.data.creditGrade === "Below Average" ||  
    state.data.creditGrade === "Overseas" || state.data.creditGrade === "No Credit"))
    {
      return (
        <>
          <Header />
          <div className="result">
            {/* TDSR OUTPUT IN HTML */}
      
                  
          <canvas id="my-canvas">  
             <YellowLight></YellowLight>
           </canvas>
      
          </div>
        </>
        
        )
    }
      else{
        
        return (
          <>
      <Header />
          <div className="result">
            {/* TDSR OUTPUT IN HTML */}
     
    
          <canvas id="my-canvas">  </canvas>
           <RedLight></RedLight>

          </div>
          </>


          
          )
      

      }

};

export default Result;

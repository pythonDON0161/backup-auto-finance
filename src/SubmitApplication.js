import React from "react";
import { withRouter, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {
  SimpleGrid,
  Center,
  Progress,
  Heading,Text
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { FiFile } from "react-icons/fi";
import emailjs from '@emailjs/browser';
import  { parse } from 'json2csv';

const SubmitApplication = (props) => {
  
  const { action, state } = useStateMachine(updateAction);

  
const colHeaders=[
  "EmailAddress", "CarPrice","CarStatus","ModelYear","FirstName", "LastName", "DateOfBirth", "CellNumber",
  "EmploymentStatus", "GrossMonthlyIncome","OtherMonthlyIncome","Mortgage","Rent","CreditCard","OtherLoanPayments",
  "TradeIn", "EstimatedTradeValue","TowardsCar", "CashDownPayment","GradeYourCredit", "CoAppFirstName","CoAppLastName",
  "CoAppBirthdate","CoAppCell", "CoAppEmploymentStatus","CoAppGrossMonthly","CoAppOtherMonthly", "CoAppMortgage","CoAppRent",
  "CoAppCreditCard","CoAppOtherLoan","CoAppCredit",	"Ratio",
  "CombinedTDSR","LoanTerm", "InterestRate","EstimatedPayment", "Criteria",
  "PrimaryBank","SecondaryBank", "TertiaryBank"]
  
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
    Criteria: state.data.criteria,
    PrimaryBank: state.data.primaryBank,
    SecondaryBank: state.data.bankSelection2,
    TertiaryBank: state.data.bankSelection3
  }
  

//convert the data to CSV with the column names
const csv = parse(user_data, colHeaders );

var finalCsv =  Buffer.from(csv).toString("base64");
window.Buffer = window.Buffer || require("buffer").Buffer;
  
function sendEmail() {

  let totalIncome = parseInt(state.data.grossIncome + state.data.otherMonthlyIncome);
  
 
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
    bank1Name: state.data.bankPayments[0].thisBank.toUpperCase(),
    bank1Payments: state.data.bankPayments[0].payment.toLocaleString(),
    bank1Rate: state.data.bankPayments[0].rate,
    bank1Deposit: state.data.bankPayments[0].deposit.toLocaleString(),
    bank1Fees: state.data.bankPayments[0].fees.toLocaleString(),
    bank1Terms: state.data.bankPayments[0].term, //Bank 2 Next --->
    bank2Name: state.data.bankPayments[1].thisBank.toUpperCase(),
    bank2Payments: state.data.bankPayments[1].payment.toLocaleString(),
    bank2Rate: state.data.bankPayments[1].rate,
    bank2Deposit: state.data.bankPayments[1].deposit.toLocaleString(),
    bank2Fees: state.data.bankPayments[1].fees.toLocaleString(),
    bank2Terms: state.data.bankPayments[1].term,
    bank3Name: state.data.bankPayments[2].thisBank.toUpperCase(),
    bank3Payments: state.data.bankPayments[2].payment.toLocaleString(),
    bank3Rate: state.data.bankPayments[2].rate,
    bank3Deposit: state.data.bankPayments[2].deposit.toLocaleString(),
    bank3Fees: state.data.bankPayments[2].fees.toLocaleString(),
    bank3Terms: state.data.bankPayments[2].term,



    cusdata: finalCsv
  }; 


  emailjs.send('service_f9v8pdk', 'template_3wiofi8' ,templateParams, 'PqN3ytZ-5Y1PJ4wPp',{ cusdata: finalCsv } )
      .then(function(response) {

        console.log('SUCCESS!', response.status, response.text);

      }, function(error) { console.log('FAILED...', error); });
      

  //CUSTOMER EMAIL BELOW

  emailjs.send("service_f9v8pdk","template_wltw9za", templateParams, "PqN3ytZ-5Y1PJ4wPp"  )
      .then( function (response) {
         console.log('SUCCESS!', response.status, response.text);
         
      }, function(error) { console.log('FAILED...', error); } );

   
      
  } 





  return (
    <>
      <Header />
      
        <SimpleGrid columns={1} spacing={0}>
          <Center>
            <Heading style={{textAlign:"center"}}>Submitting Your Application</Heading>
          </Center>
         
          </SimpleGrid>
          <div className="coapp">
          <Center>
            <Text fontWeight="bold" textAlign="center">
                Please click the “Finish/Submit My Application” button below for us to send your information to the banks 
                you have selected.
            </Text>
          </Center>

          <Center>
                <Link to="/thank-you">
                    <button className="submit-button" type="submit" onClick={sendEmail}>
                    Finish/Submit My Application
                    </button>
                </Link>
            </Center>

            <Center>
                <Link to="/">
                    <button className="submit-button" >
                    Home/Finish Application Later
                    </button>
                </Link>
            </Center>
  
          <br />
       
        <FeedbackFish projectId="01ebf0d6447158">
          <button className="feedback">Give us Feedback</button>
        </FeedbackFish>
      </div>
    </>
  );
};

export default withRouter(SubmitApplication);

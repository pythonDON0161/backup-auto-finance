import React,{useEffect} from "react";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {
  Progress,
  Center,
  Container,
  SimpleGrid,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { parse } from "postcss";


const BorrowSummary = (props) => {
 // const [count, setCount] = useStateIfMounted(0)
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm();
  const { action, state } = useStateMachine(updateAction);
  
  const onSubmit = (data) => {
    action(data);
    props.history.push("/grade-your-credit");
    var test = 0;
    
  };
  
 // register({ name: "totalBorrow", type: "custom" });

  // FUNCTION STARTS HERE

  console.log( "Calc Term:" + state.data.calcTerm)  

  //console.log( "Calc Term:" + state.data.calcTerm)  


  async function handleTotalBorrow() {
    let testExpenses

    register({ name: "totalBorrow", type: "custom" });
    setValue("totalBorrow", parseInt(state.data.price) - parseInt(state.data.towardsPurchase) - parseInt(state.data.cashDown));
    const totalBorrow = getValues("totalBorrow");
    //console.log(totalBorrow)

    //Recalculate estimated payment and add to total monthly expenses, based on new Total Borrow figure, factoring in trade-in & cash down
    // TODO show estimated payment on borrow summary page 

    register({ name: "estimatedPayment", type: "custom" });
    setValue("estimatedPayment", (Math.round(
      ((totalBorrow - totalBorrow * (state.data.calcDeposit / 100)) 
           *
        (state.data.calcRate / 100 / 12) * Math.pow( 1 + state.data.calcRate / 100 / 12,
          state.data.calcTerm
        )) /

        (Math.pow(1 + state.data.calcRate / 100 / 12, state.data.calcTerm ) - 1)
       )));

          // if user plans to keep their current car and keep paying exsiting loan
          if(state.data.tradeIn ==="No"){ var test =  parseInt(state.data.totalExpenses,10) }

          if(state.data.tradeIn ==="N/A") { var test =  parseInt(state.data.totalExpenses,10) -  parseInt( state.data.existingCarLoan,10) ; }

          if(state.data.tradeIn ==="Yes") { var test =  parseInt(state.data.totalExpenses,10) -  parseInt( state.data.existingCarLoan,10); }

    const estimatedPayment = getValues("estimatedPayment");

    console.log("this is test variable", test)

    console.log ( " This is Estimated Payment "+ estimatedPayment )

    //Create object estimatedExpenses and set the value

    // Estimated Expenses for the month
    register({ name: "estimatedExpenses", type: "custom" });
      setValue ("estimatedExpenses", test + parseInt(estimatedPayment, 10)
    );

    //Calculate TDSR and save to state as variable
    register({ name: "ratio", type: "custom" });

    const estimatedExpenses = getValues("estimatedExpenses");

    console.log("this is estimated expenses", estimatedExpenses)

    setValue( "ratio", estimatedExpenses / parseInt(state.data.totalMonthly, 10) );

   
    
    console.log("this is ratio", state.data.ratio)
    

    //await new Promise((resolve, reject) => setTimeout(resolve, 100));
   // props.history.push("./grade-your-credit");
  }
   
  return (
    <>
      <Header />
      {isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading>Amount You Wish To Borrow</Heading>
        
          {/* IF user wishes to trade or sell vehicle show this */}
          {state.data.tradeIn === "Yes" ? (
            <Text fontSize="2xl">
              Based on your information, you would wish to borrow
              <strong> ${(state.data.price - (state.data.towardsPurchase) - state.data.cashDown) > 0 && <>
                {(state.data.price - (state.data.towardsPurchase) - state.data.cashDown).toLocaleString(undefined, {minimumFractionDigits: 0})}
              </>}
              {(state.data.price - (state.data.towardsPurchase) - state.data.cashDown) < 0 && <>
                0
              </>}</strong>
              &nbsp;as follows:
            </Text>
          ) : (
            <Text fontSize="3xl">
              Based on your information, you would wish to borrow{" "} 
              <strong>{(state.data.price) > 0 && <>
               ${(state.data.price - (state.data.towardsPurchase + state.data.cashDown)).toLocaleString(undefined, {minimumFractionDigits: 0})}
              </>}</strong>
              {(state.data.price - (state.data.towardsPurchase) - state.data.cashDown) < 0 && <>
                0
              </>}
              &nbsp;as follows:
            </Text>
          )}
          <br />

          {state.data.tradeIn === "Yes" ? (
            <Text>
              Price of new car:{" "}

              <strong style={{textAlign: "right"}}>
              ${(state.data.price - 0).toLocaleString(undefined, {minimumFractionDigits: 0})}</strong>

              <br />
              <br />
              {/* TODO if user first inputs positive trade in value then chnages to negative trade in value for car 
                      the positive value is not overwritten  */}
              Less sale/trade-in from current car:{" "}
              <strong>
              ${(state.data.towardsPurchase - 0).toLocaleString(undefined, {minimumFractionDigits: 0})}
              </strong>

              <br />
              <br />
              Less additional cash down payment:{" "}
              <strong>
              {(state.data.cashDown - 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              </strong>
              <br />
              <br />
              Total loan amount:{" "} 
              <strong>
               ${(state.data.price - (state.data.towardsPurchase) - state.data.cashDown) > 0 && <>
                {(state.data.price - (state.data.towardsPurchase) - state.data.cashDown).toLocaleString(undefined, {minimumFractionDigits: 0})}
                
              </>}
              
              {(state.data.price - (state.data.towardsPurchase) - state.data.cashDown) < 0 && <>
                0
              </>}
              </strong>  
              <br />
              <br/>
              <Text fontWeight={400} > { state.data.carStatus =="Used" && <p> (Note - for used cars, certain banks may require a greater
            deposit than the amount you wish to put into the deal) </p>}
              </Text> 
            </Text>
          
          ) : 
          
          (
            <Text>
              Price of New Car/Budget:{" "}

              <strong>
              {(state.data.price - 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              </strong>

              <br />
              <br />
              Less sale/trade-in from current car:{" "}
              <strong>
              ${(state.data.towardsPurchase - 0).toLocaleString(undefined, {minimumFractionDigits: 0})}
              </strong>
              <br/>
              <br/>
              Less additional cash down payment:{" "}
              <strong>
              {(state.data.cashDown - 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              </strong>
              <br />
              <br />
              
              Total borrow amount:{" "} 
              <strong>
              {(state.data.price - state.data.cashDown).toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
              )}</strong>{" "}

              <br/>
              <br/>
            </Text>
          )}
      
      
          <Center>
            <button
              type="submit"
              onClick={handleTotalBorrow}
              className="submit-button"
              value="Save & Continue"
            >
              Save & Continue
            </button>

          </Center>
          <br />
          <FeedbackFish projectId="01ebf0d6447158">
            <button className="feedback">Give us Feedback</button>
          </FeedbackFish>
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
                Our pre-qualification process applies only for individuals and
                self-employed persons. Companies should contact their bank of
                choice directly.
              </Text>
            </Center>
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
                    redirectUri: `${window.location.origin}/borrow-summary`,
                  })
                }
              >
                Log In/Sign Up
              </Button>
            </Center>
          </SimpleGrid>
        </Container>
      )}
    </>
  );
};

export default withRouter(BorrowSummary);

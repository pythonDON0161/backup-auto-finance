import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {
  Progress,
  Select,
  Center,
  Container,
  SimpleGrid,
  Text,
  Button,
  Heading,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import PDFDOC from "./components/PDFMAKE";
import { PDFDownloadLink,PDFViewer,PDFRenderer } from "@react-pdf/renderer";
import CurrencyInput from 'react-currency-input-field';


const TradeIn = (props) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const { register, handleSubmit,control, setValue, watch, errors } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");

  const onSubmit = (data) => {
    action(data);

    const body = {
      "application": {
        "tradeIn": data.tradeIn,
        "estimateTradeValue": data.currentCar,
        "owedOnTrade": data.owed,
        "finalAmount": data.finalAmount
        
      } }

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
   

    if(watchTradeIn  ==="No"){ 
      state.data.totalExpenses = parseInt(state.data.totalExpenses,10) + parseInt( state.data.existingCarLoan,10);
       console.log("This is test expenses" + " "+state.data.totalExpenses)
    }
   
    if (watchTradeIn === "Yes") {
      props.history.push("./trade-in-2");
    }
     
    if (watchTradeIn === "No") {
      props.history.push("./cash-down")
    }
    if (watchTradeIn === "N/A") {
      props.history.push("./cash-down");
    }
    


  };
 

  const [currentCar, setcurrentCar] = useState(state.data.currentCar);
  const [owed, setOwed] = useState(state.data.owed);

  function filterData(val) {
    setcurrentCar(
      val.target.value.replaceAll(/[^0-9]/gi, "").replace(/^\$/, "").replaceAll(",", "")
      
    );  }

    function filterDataTwo(val) {
      setOwed(
        val.target.value.replaceAll(/[^0-9]/gi, "").replace(/^\$/, "").replaceAll(",", "")
      );}
  
      function setcarVals(){
        setValue("currentCar", currentCar)
        setValue("owed", owed)
      }

  const watchTradeIn = watch("tradeIn", state.data.tradeIn);
  return (
    <>
      <Header />
      {isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading>Trade In</Heading>
          <label>
            Do You Plan to Trade-In or Sell Your Current Car?
           
            <Select
              name="tradeIn"
              options={["Yes", "No", "N/A"]}
              defaultValue={ state.data.tradeIn }
              placeholder="Select option"
              ref={register({ required: true })}
            >
              <option value="Yes">Yes</option>
              <option value="No">No, I plan to keep my existing car</option>
              {/* If user has an existing car loan don't show option that he doesn't own car  */}
              { state.data.existingCarLoan <=0 && <option value="N/A">I do not currently own a car</option> }
                { state.data.existingCarLoan === '0'|| ' ' || null || 0 && <option value="N/A">I do not currently own a car</option>  }
                 
            </Select>
            { errors.tradeIn && <p className="error">Please select an option</p> }
          </label>
          
      
          {watchTradeIn === "Yes" && (
            <>
              <label htmlFor="price">
                How much do you estimate your current car is worth?
                <br />
                (If you have a recent valuation, use a figure close to Forced
                Sale Value)
                <Controller
                  name="cuCar"
                  control={control}
                  defaultValue={state.data.currentCar }
                  render={({ onChange, value }) => {
                    return (
                      <CurrencyInput
                        name="currentCar"
                        ref={register({
                          required: "Enter your current car's valuation",
                          min:0
                        })}
                        className="priceInput"
                        placeholder="Please enter a number"
                        prefix="$"
                        maxLength={7}
                        decimalsLimit={2}
                        defaultValue={state.data.currentCar }
                        onChange={filterData}
                      
                    />
                  );
                }}
              />

                {errors.currentCar && (
                  <p className="error">Your input is required</p>
                )}
                
              </label>

              <label >
                How much do you owe on your current car?
                <Controller
                name="ow"
                control={control}
                defaultValue={state.data.owed}
                render={({ onChange, value }) => {
                  return (
                    <CurrencyInput
                      name="owed"
                      defaultValue={state.data.owed}
                      className="priceInput"
                      placeholder="Please enter a number"
                      prefix="$"
                      maxLength={7}
                      decimalsLimit={2}
                      ref={register({
                        min:0
                      })}
                      onChange={filterDataTwo}
                      onValueChange={onChange}
                    />
                  );
                }}
              />

                {errors.owed && <p className="error">Your input is required</p>}
              </label>
            </>
          )}
          
          {watchTradeIn === "No" && (
            <label htmlFor="price">
              Your previously stated current monthly payment:
              <CurrencyInput
                name="currentMonthlyPayment"
                control={control}
                disabled={true}
                className="priceInput"
                defaultValue={state.data.existingCarLoan}
              />
              {errors.currentMonthlyPayment && (
                <p className="error">Your input is required</p>
              )}
            </label>
          )}

          <Center>
         
            <button
              onClick={setcarVals}
              type="submit"
              className="submit-button"
              value="Save & Continue"
            >
              Save & Continue
            </button>
          </Center>


          <br />
          <Progress value={55} />
          <Center>Step 5 of 9</Center>
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
                    redirectUri: `${window.location.origin}/trade-in`,
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

export default withRouter(TradeIn);

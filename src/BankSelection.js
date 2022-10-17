import React from "react";
import { useForm } from "react-hook-form";
import { withRouter,useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Select, Progress, Center, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Header";

const BankSelection = (props) => {

  const history = useHistory();



  const { register, handleSubmit, errors, setValue, getValues } = useForm();
  const { action, state } = useStateMachine( {updateAction} );
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const totalCost = state.data.totalExpenses;
  const totalEarned = state.data.totalMonthly;
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "ratio": combinedTDSR2 ,// Math.round((totalCost / totalEarned) * 100) / 100,
        "primaryBank": data.primaryBank,
        "criteria": data.criteria
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
    props.history.push("./disclaimer");
  };

  let combinedTDSR; // define a variable for combined TDSR

  //If co-applicant is used set TDSR to combined TDSR

  let combinedTDSR2
  combinedTDSR2 = (state.data.estimatedExpenses + state.data.caTotalExpenses) / 
  (state.data.totalMonthly + state.data.caTotalMonthly)

 function handleTDSR() {

    const caTDSR = state.data.caTDSR //getValues("caTDSR") // get co-appliant TDSR

    console.log(caTDSR) // co-applicant TDSR

    register({ name: "TDSR", type: "custom" }); // register TDSR value in React Hook Form
    
   
    //console.log( "combinedTDSR", combinedTDSR) // Log value of combined TDSR

  }

  return (
    <div>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <Heading>Bank Selection</Heading>
        <br />
        <p>
          Which bank (if any) do you have your primary banking relationship
          with?
          <br />
        </p>
        <label>
          Primary Bank:
          <Select
            name="primaryBank"
            defaultValue={state.data.primaryBank}
            placeholder="Select bank"
            ref={register()}
          >
            <option value="bns">BNS</option>
            <option value="cwj">CWJ</option>
            <option value="fcib">FCIB</option>
            <option value="fgb">FGB</option>
            <option value="fhc">FHC</option>
            <option value="jmmb">JMMB</option>
            <option value="jn">JN</option>
            <option value="ncb">NCB</option>
            <option value="sagicor">Sagicor</option>
            <option value="vmbs">VMBS</option>
            <option value="npa">No Primary Affiliation</option>
          </Select>
          {/* {errors.primaryBank && (
            <p className="error">Please choose a Bank from the list</p>
          )} */}
        </label>
        {/* <label>
          Second Option:
          <Select
            name="secondaryBank"
            defaultValue={state.data.secondaryBank}
            placeholder="Select bank"
            ref={register({ required: true })}
          >
            <option value="vmbs">VMBS</option>
            <option value="jmmb">JMMB</option>
            <option value="ncb">NCB</option>
            <option value="bns">BNS</option>
            <option value="fgb">FGB</option>
            <option value="fcib">FCIB</option>
            <option value="sagicor">Sagicor</option>
            <option value="jn">JN</option>
            <option value="cwj">CWJ</option>
            <option value="fhc">FHC</option>
          </Select>
          {errors.secondaryBank && (
            <p className="error">Please choose a Bank from the list</p>
          )}
        </label> */}
        <>
          Please select which criteria is most important to you:
          <br />
          <label>
            Criteria
            <Select
              name="criteria"
              defaultValue={state.data.criteria}
              placeholder="Select one"
              ref={register({ required: true })}
            >
              <option value="Lowest monthly payment">
                Lowest monthly payment
              </option>
              <option value="Lowest interest rate">Lowest interest rate</option>
            </Select>
            {errors.criteria && (
              <p className="error">Please choose a criteria</p>
            )}
          </label>
        </>
        <Center>
          <button
            type="submit"
            onClick={handleTDSR}
            className="submit-button"
            value="Save & Continue"
          >
            Save & Continue
          </button>
        </Center>
        <br />
       
      </form>
      )}
      {!isAuthenticated && (
        <Container centerContent className="pt-8">
          <SimpleGrid columns={1} spacing="20px">
            {/* <Center>
              <img src={raceCar} alt="Race Car" />
            </Center> */}
            <Center>
              <Text fontSize="xl">
                Please Log in or Sign Up below to access this page and find out
                what you might qualify for.
              </Text>
            </Center>
            <Center>
              <Button
                onClick={() =>
                  loginWithRedirect({
                    redirectUri: `${window.location.origin}/bank-selection`,
                  })
                }
              >
                Log In or Sign Up
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
};

export default withRouter(BankSelection);

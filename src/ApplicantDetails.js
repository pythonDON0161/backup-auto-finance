import React from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Input, Progress, Center, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import PDFDOC from "./components/PDFMAKE";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Sidebar from "./components/Sidebar"

const ApplicantDetails = (props) => {
  const { register, handleSubmit, errors, control } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    const body = {
      "application": {
        "firstName": data.firstName,
        "middleInitials": data.middleInit,
        "lastName": data.lastName,
        "dateOfBirth": data.dateOfBirth,
        "cellNumber": data.cellNumber
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
    props.history.push("./monthly-expenses");
  };

  return (
    
    <div> 

      <div class="outer-container">
        <div className="header-container">
       
          </div>
      <div class="sidebar-container">   
       <Sidebar></Sidebar>

       </div>
   
      <div class="form-container"> 
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Applicant Details</Heading>
        <label>
          First Name:
          <Input
            name="firstName"
            ref={register({ required: true })}
            defaultValue={state.data.firstName}
          />
          {errors.firstName && (
            <p className="error">Please enter your first name</p>
          )}
        </label>
        <label>
          Middle Initials:
          <Input
            name="middleInit"
            ref={register}
            defaultValue={state.data.middleInit}
          />
        </label>
        <label>
          Last Name:
          <Input
            name="lastName"
            ref={register({ required: true })}
            defaultValue={state.data.lastName}
          />
          {errors.lastName && (
            <p className="error">Please enter your last name</p>
          )}
        </label>
        <label>
            Cell Number:
            <Controller
              name="cellNumber"
              control={control}
              defaultValue={state.data.cellNumber}
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <InputMask mask="(999)-999-9999" placeholder="(876) 555-5555" value={value} onChange={onChange}>
                  {(inputProps) => (
                    <Input
                      {...inputProps}
                      type="tel"
                      ref={register({ required: true })}
                      disableUnderline
                    />
                  )}
                </InputMask>
              )}
            />
          {errors.cellNumber && (
            <p className="error">Please enter your cellphone number</p>
          )}
          </label>
          <label>
          {/* TODO Integrate a calendar date picker so user doesn't have to input manually */}
        Date of Birth (MM/DD/YYYY):
        <Controller
          name="dateOfBirth"
          control={control}
          defaultValue={state.data.dateOfBirth}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <InputMask mask="99/99/9999" placeholder="MM/DD/YYYY" value={value} onChange={onChange}>
              {(inputProps) => (
                <Input
                  {...inputProps}
                  ref={register({ required: true })}
                  type="tel"
                  disableUnderline
                  defaultValue={state.data.dateOfBirth}
                />
              )}
            </InputMask>
          )}
        />
        {errors.dateOfBirth && (
          <p className="error">Please enter your date of birth</p>
        )}
        </label>
        <Center>
     
          <button
            type="submit"
            className="submit-button"
            value="Save & Continue"
          >
            Save & Continue
          </button>
        </Center>
        <br />
        <Progress value={22} />
        <Center>Step 2 of 9</Center>
        <FeedbackFish projectId="01ebf0d6447158">
          <button className="feedback">Give us Feedback</button>
        </FeedbackFish>
      </form>
      )}
      {!isAuthenticated && (
        <Container centerContent className="pt-8">
          <SimpleGrid columns={1} spacing="20px">
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
                    redirectUri: `${window.location.origin}/applicant-details`,
                  })
                }
              >
                Log In or Sign Up
              </Button>
            </Center>
          </SimpleGrid>
        </Container>
      )}
     </div>
     </div> 
    </div>
    
  );
};

export default withRouter(ApplicantDetails);

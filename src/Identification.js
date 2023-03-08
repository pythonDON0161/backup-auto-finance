import React from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Input, Progress, Center, Select, Heading, Container, SimpleGrid, Text, Button } from "@chakra-ui/react";
import InputMask from "react-input-mask";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";



const Identification= (props) => {
  const { register, setValue, handleSubmit, errors, control } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const headers = new Headers();
  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");
  const onSubmit = (data) => {
    action(data);
    registerPersonal(data)

        async function registerPersonal(data) {

            register({ name: "idType", type: "custom" });
            setValue("idType", data.idType);
        
            register({ name: "idNumber", type: "custom" });
            setValue("idNumber", data.idNumber);
        
            register({ name: "issueDate", type: "custom" });
            setValue("issueDate", data.issueDate);
            
            register({ name: "expiryDate", type: "custom" });
            setValue("expiryDate", data.expiryDate);
                       
        }
        
       props.history.push("./address-information");
  };

  return (
    <>
      <Header />
      {isAuthenticated && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Identification Details</Heading>
        
        <label>
        ID Type
            <Select
              name="idType"
              options={["passport", "driversLicense", "nationalID","postGrad","Other"]}
              defaultValue={state.data.IdType}
              placeholder="Select option"
              ref={register({ required: true })}
            >
              <option value="passport">Passport</option>
              <option value="driversLicense">Driver's License</option>
              <option value="nationalID">National ID</option>
            </Select>
            {errors.tradeIn && <p className="error">Please select an option</p>}
          </label>

        <label>
          ID Number:
          <Input
            name="idNumber"
            ref={register}
            defaultValue={state.data.IdNumber}
          />
        </label>


        <label>
          {/* TODO Integrate a calendar date picker so user doesn't have to input manually */}
        Issue Date:
        <Controller
          name="issueDate"
          control={control}
          defaultValue={state.data.issueDate}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <InputMask mask="99/99/9999" placeholder="MM/DD/YYYY" value={value} onChange={onChange}>
              {(inputProps) => (
                <Input
                  {...inputProps}
                  ref={register({ required: true })}
                  type="text"
                  disableUnderline
                  defaultValue={state.data.issueDate}
                />
              )}
            </InputMask>
          )}
        />
        {errors.dateOfBirth && (
          <p className="error">Please enter your date of birth</p>
        )}
        </label>

        <label>
          {/* TODO Integrate a calendar date picker so user doesn't have to input manually */}
       Expiry Date:
        <Controller
          name="expiryDate"
          control={control}
          defaultValue={state.data.expiryDate}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <InputMask mask="99/99/9999" placeholder="MM/DD/YYYY" value={value} onChange={onChange}>
              {(inputProps) => (
                <Input
                  {...inputProps}
                  ref={register({ required: true })}
                  type="text"
                  disableUnderline
                  defaultValue={state.data.expiryDate}
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
                    redirectUri: `${window.location.origin}/identification`,
                  })
                }
              >
                Log In or Sign Up
              </Button>
            </Center>
          </SimpleGrid>
        </Container>
      )}
    </>
  );
};

export default withRouter(Identification);

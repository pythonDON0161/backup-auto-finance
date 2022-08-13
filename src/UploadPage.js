import React, { useState }  from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { withRouter, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import {  Grid, ListItem,
  GridItem,
  Select, 
  Progress, 
  Center, Tabs, TabList, TabPanels, Tab, TabPanel,
  Heading, Container, SimpleGrid, 
  Text, Button, UnorderedList, Checkbox} from "@chakra-ui/react";
import updateAction from "./updateAction";

import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles.css";
import { Input } from "./components";
import {CgAttachment} from 'react-icons/cg'


const UploadPage = (props) => {
    const {
        register,
        handleSubmit,
        control,
        errors,
        getValues,
        setValue,
        watch,
      } = useForm();
    const { action, state } = useStateMachine(updateAction);
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    const headers = new Headers();

  headers.append("Authorization", "Basic ZHN1bW1lcnM6SmFtZG93bkxvYW5z");
  headers.append("Content-Type", "application/json");

  const onSubmit = (data) => {
    action(data)

  }

    const [step,setStep] = useState(0);
    const [hideButton,setHideButton] = useState(0);
    const step_form = step+1;


    return(
        <>
        <Header/>
        <div className="coapp">
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading>Upload Section</Heading>
          </Center>
        </SimpleGrid>
        
    <Center> 
        <form onSubmit={handleSubmit()}> 
            <Tabs >
                <TabList>
                    <Tab>Personal Documents</Tab>
                    <Tab>Financial Documents</Tab>
                    <Tab>Proof Of Identity</Tab>
                </TabList>
                <TabPanels id={"tabPanel"}>
                    <TabPanel>

                        <Text  mb='1' p='2'>Type Of ID</Text>
                        <Select w='75'
                         name="idType"
                         options={ ["Yes","No"] }
                         placeholder="Select option"
                         ref={register({ required: true })}
                          > ID Type
                            <option value="Driver's License">Driver's License</option>
                            <option value="Passport">Passport</option>
                            <option value="Voter's ID">Voter's ID</option>
                          </Select>

                          <br></br>

                          <Text mb='1' p='2'>Upload Selected ID</Text>
                          <Text> Select your ID</Text>

                       <span> <i> <CgAttachment> </CgAttachment> </i>

                          <input type="file" class="fileUp" name="file" />
                        
                       </span>

                         <label> TRN Card </label>
                         <input  type="file" class="fileUp"  id="" name="trn" />

                         <label> NIS Card </label>
                         <input  type="file" class="fileUp"  name="nis" />

                    </TabPanel>

                    <TabPanel>
                    <label> Last 3 Months Payslip</label>

                    <label>Pay Slip 1</label>

                         <input  type="file" id="fileUp" name="file" />

                         <label>Pay Slip 2</label>
                         <input  type="file" id="" name="trn" />

                         <label>Pay Slip 3</label>
                         <input  type="file" id="" name="nis" />

                         
                         <label>Income Verification Letter (Job Letter)</label>
                         <input  type="file" id="" name="nis" />

                        <label>Credit Authorization</label>
                         <p>The loan for which you are applying involves various disclosures, records, and documents (“Loan Documents”), 
                            including this eDisclosure Agreement. The purpose of this eDisclosure Agreement
                             is to obtain Your consent to receive certain Loan Documents from us in electronic form rather than in paper form. 
                             With Your consent, You will also be able to sign and
                            authorize these Loan Documents electronically, rather than on paper.
                        </p>

                        <Checkbox 
                            isRequired
                        >I confirm that I have read and agree to allow VMBS to apply for a
                             credit report on my behalf</Checkbox>

                    </TabPanel>
                    <TabPanel>
                        <label>Proof Of Identitiy</label>

                        <p>Please upload a self-captured photo (selfie) of yourself holding 
                        up your photo identification next to your face by either taking a
                        Live Photo or Photo Upload
                        </p>

                        <p>Please ensure the photo meets the following requirements:</p>

                        <ol>
                            <li> 1. Ensure the photo and ID text is clear and readable the help us confirm the information on the card.</li>
                            <li> 2. Your entire face must be visible.</li>
                            <li> 3. The photo must not be too dark or too light.</li>
                            <li> 4. The photo ID must be fully visible and not covered in any way. </li>
                            <li> 5. You face must not be covered. Please remove any glasses, hats or any other face coverings.</li>
                            <li> 6. The photo must not be blurry or out of focus.</li>
                        </ol>

                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Center>
            <Link to="/bank-" >
              <button className="wide-button" type="submit">
               Submit Documents
              </button>
             </Link>
            </Center>
            </form>
    </Center>

    </div>

        
        
        </>
    
    )


}

export default withRouter(UploadPage);
import {React, useState} from "react";
import { withRouter, Link,  useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {
  SimpleGrid,
  Center,
  Progress,
  Heading, Text,Spacer,Flex ,List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,HStack,Button
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import {FiMenu,FiHome,FiCalendar,FiUsers,FiDollarSign,FiBriefcase,FiUser,FiSettings
} from 'react-icons/fi'
import{AiOutlineBank,AiFillCheckCircle} from 'react-icons/ai'
import {ImArrowDown} from 'react-icons/im'
import NavItem from './components/NavItem';
import {GrDocumentUpload} from 'react-icons/gr'
import { Warning } from "postcss";


function subApp(){

}


const Navigation = (props) => {

  
  const { action, state } = useStateMachine(updateAction);

  const [clicked, setClicked] = useState('hidden');

  
  const [clicked2, setClicked2] = useState('hidden');

  const [clicked3, setClicked3] = useState('hidden');

  const handleClick = () => {
    state.data.ratio ?  history.push('/bank-selection') : setClicked('show');
  };

  const handleClick2 = () => {
    state.data.ratio ? history.push('/upload-page'): setClicked2('show');
  };

  const handleClick3 = () => {
    state.data.ratio ? history.push('/thank-you'): setClicked3('show');
  };

  const [navSize, changeNavSize] = useState("large");

  const history = useHistory();

  //funciton to reset individual state variables

  return (
    <>
      <Header />
      
        <SimpleGrid columns={1} >

             <Center> 
                 <Heading textAlign="center">Road Map to Finding My Deal</Heading>
              </Center>

          <Center>
            <Text> 
            <p style={{ fontWeight:600,justifyContent: "center",
                        alignItems: "center",textAlign: "center" }}>
             In Order to Find You the Best Bank Deal.
           Please complete Step 1 (Personal Information) before moving onto Other Steps.    <br/> 
            Steps 2 (Co-Applicant) and Step 4 (Document Upload) are Optional.
              </p>
            </Text>
           
          </Center>
        
          </SimpleGrid>

      <div className="coapp" style={{padding:0}}>

        <SimpleGrid spacing={1}>          

            <Center> 
              <Link to="/pre-qualification"> 
                  <HStack> 
                    <button className="nav-button">PERSONAL INFORMATION</button> 
                  </HStack>
              </Link>
            </Center>

          <Center  p={0}> <ImArrowDown  color="#e65323" size={50} /> </Center>
            
            
           <Center> 
            <Link to="/co-app-disclaimer">
                <HStack> 
                    <button className="nav-button">CO-APPLICANT INFORMATION</button>
                </HStack>
            </Link>
           </Center>

           <Center p={0}> <ImArrowDown color="#e65323" size={50} /> </Center>
           
       
           <Center p={0}> 
            <Link > 
                <HStack> 
                    <button  onClick={ handleClick } className="nav-button">BANK SELECTION</button>
                </HStack>
              </Link>
           </Center>

              <Center> 
                  <Text style={{width:"70%",textAlign:"center",color:"red",fontWeight:600, border:"3px red solid"}} 
                  className={clicked}> Please complete Personal Information Module !</Text>
              </Center>
         
           <Center p={0}> <ImArrowDown p={0} color="#e65323" size={50} /> </Center>

           
           <Center p={0} > 
              <Link > 
                <HStack> 
                  <button onClick={ handleClick2 } className="nav-button">DOCUMENT UPLOAD</button>
                </HStack>
              </Link>
           </Center>

              <Center> 
                  <Text style={{width:"70%",textAlign:"center",color:"red",fontWeight:600, border:"3px red solid"}} 
                  className={clicked2}> Please complete Personal Information Module !</Text>
                </Center>

           <Center mt={5}> 
              <Link to="/upload-page"> 
                  <button onClick={ handleClick3 } style={{backgroundColor:"green"}} className="nav-button">FINISH/SUBMIT MY APPLICATION</button>
              </Link>
           </Center>
           
           <Center> 
                  <Text style={{width:"70%",textAlign:"center",color:"red",fontWeight:600, border:"3px red solid"}} 
                  className={clicked3}> Please complete Personal Information Module !</Text>
                </Center>

           <Spacer>

           </Spacer>
          
          </SimpleGrid>


          <br />
       
        <FeedbackFish projectId="01ebf0d6447158">
          <button className="feedback">Give us Feedback</button>
        </FeedbackFish>
      </div>
    </>
  );
};

export default withRouter(Navigation);

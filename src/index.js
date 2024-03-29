import { useEffect } from 'react';
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";
import { Auth0Provider } from "@auth0/auth0-react";
import LandingPage from "./LandingPage";
import Home from "./Home";
import Calculator from "./Calculator";
import history from "./utils/history";
import PreQual from "./PreQual";
import ApplicantDetails from "./ApplicantDetails";
import EmploymentDetails from "./EmploymentDetails";
import MonthlyExpenses from "./MonthlyExpenses.js";
import CreditGrade from "./CreditGrade";
import CoApplicant from "./CoApplicant";
import CoApplicantDisclaimer from "./CoApplicantDisclaimer";
import CAAplicantDetails from "./CA-ApplicantDetails";
import CACreditGrade from "./CA-CreditGrade";
import CAEmploymentDetails from "./CA-EmploymentDetails";
import CAEmploymentDetails2 from "./CA-EmploymentDetails2";
import CASelfEmployed from "./CA-SelfEmployed";
import CAMonthlyExpenses from "./CA-MonthlyExpenses";
import BankSelection from "./BankSelection";
import Result from "./Result";
import Result2 from "./Result2";
import Recommendation from "./Recommendation";
import TradeIn from "./TradeIn";
import TradeIn2 from "./TradeIn2";
import CashDown from "./CashDown";
import EmploymentDetails2 from "./EmploymentDetails2";
import BorrowSummary from "./BorrowSummary";
import SelfEmployed from "./SelfEmployed";
import SelectionDisclaimer from "./SelectionDisclaimer";
import AdditionalInfo from "./ExistingRelationships";
import PromptRequest from "./Prompt-Request";
import PersonalDetails from "./Personal-Details";
import Identification from "./Identification";
import AddressInformation from "./AddressInformation";
import EmployerDetails from "./EmployerDetails";
import CreditReportPrompt from "./CreditReportPrompt";
import CreditReport from "./CreditReport";
import DocumentUpload from "./DocumentUpload";
import UploadSection from "./UploadPage";
import SubmitApplication from "./SubmitApplication";
import "./styles.css";
import PrivacyPolicy from "./PrivacyPolicy";
import Authorization from "./Authorization";
import Communication from "./Communication"
import NextSteps from "./NextSteps";
import Navigation from "./Navigation"
import ThankYou from "./ThankYou";
import Protect from 'react-app-protect'
import theme from './theme'
import RequestQuotePrompt from "./RequestQuotePrompt";
import 'react-app-protect/dist/index.css'
import ExistingRelationships from "./ExistingRelationships";
import './index.css';


const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const providerConfig = {
  domain: "dev-finance.us.auth0.com",
  clientId: "uLylhzwK0tAmPFwq6mOlMsYLnEy5Q7ME",
  redirectUri: window.location.origin,
  useRefreshTokens:true,
  cacheLocation:"localstorage",
  onRedirectCallback,
};


createStore({
    data: {
      creditCard: 0,
      existingCarLoan: 0,
      rent: 0,
      otherLoans: 0,
      mortgage: 0,
      totalExpenses:0,
      otherMonthly: 0,
      grossMonthly: 0,
      caMortgage: 0,
      caGrossMonthly: 0,
      caOtherMonthly: 0,
      caExistingCarLoan: 0,
      caOtherLoans: 0,
      caCreditCard: 0,
      caRent: 0,
      testVal: 0,
      owed: 0,
      combinedTDSR: 0 ,
      currentCar: 0,
      bankPayments: [],
      employmentRisk: "",
      cashDown: 0,
      currentMonthlyPayment: 0,
      towardsPurchase: 0,
      chosenBank: [false, false, false, false],
      calcTerm: [ ],
      calcRate: [ ],
      calcDeposit: [ ],
      officerName: "",
      officerNumber: "",
      officerEmail: "",
      totalBorrow: 0,
      totalBorrowAmount: 0,
      dependents: 0,
      estimatedPayment: 0,
      calcRate: 0,
      calcDeposit: 0,
      calcTerm: 0
    },
  },
  {
    storageType: "local",
  });

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
   
    <Auth0Provider {...providerConfig}>
      <StateMachineProvider>
        {process.env.NODE_ENV !== "production" && <DevTool />}
        <ChakraProvider theme={theme}>
          <Router>
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/navigation" component={Navigation} />
            <Route path="/loan-calculator" component={Calculator} />
            <Route path="/request-quote" component={RequestQuotePrompt} />
            <Route path="/pre-qualification" component={PreQual} />
            <Route path="/trade-in" component={TradeIn} />
            <Route path="/trade-in-2" component={TradeIn2} />
            <Route path="/cash-down" component={CashDown} />
            <Route path="/borrow-summary" component={BorrowSummary} />
            <Route path="/applicant-details" component={ApplicantDetails} />
            <Route path="/employment-details" component={EmploymentDetails} />
            <Route path="/employment-details-2" component={EmploymentDetails2}
            />
            <Route path="/self-employed" component={SelfEmployed} />
            <Route path="/monthly-expenses" component={MonthlyExpenses} />
            <Route path="/grade-your-credit" component={CreditGrade} />
            <Route path="/co-applicant" component={CoApplicant} />
            <Route path="/co-app-disclaimer" component={CoApplicantDisclaimer} />
            <Route path="/ca-applicant-details" component={CAAplicantDetails} />
           
            <Route
              path="/ca-employment-details"
              component={CAEmploymentDetails}
            />
            <Route
              path="/ca-employment-details-2"
              component={CAEmploymentDetails2}
            />
            <Route path="/ca-self-employed" component={CASelfEmployed} />
            <Route path="/ca-monthly-expenses" component={CAMonthlyExpenses} />
            <Route path="/ca-grade-your-credit" component={CACreditGrade} />
            <Route path="/result" component={Result} />
            <Route path="/result2" component={Result2} />
            <Route path="/bank-selection" component={BankSelection} />
            <Route path="/disclaimer" component={SelectionDisclaimer} />
            <Route path="/recommendation" component={Recommendation} />
            <Route path="/additional-info" component={ExistingRelationships} />
            <Route path="/prompt-request" component={PromptRequest} />
            <Route path="/personal-details" component={PersonalDetails} />
            <Route path="/identification" component={Identification} />
            <Route path="/employer" component={EmployerDetails} />
            <Route path="/address-information" component={AddressInformation} />
            <Route path="/credit-prompt" component={CreditReportPrompt} />
            <Route path="/credit-report" component={CreditReport} />
            <Route path="/document-upload" component={DocumentUpload} />
            <Route path="/upload-section" component={UploadSection} />
            <Route path="/upload-page" component={DocumentUpload} />
            <Route path="/submit-application" component={SubmitApplication} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/authorization" component={Authorization} />
            <Route path="/preference" component={Communication} />
            <Route path="/next-steps" component={NextSteps} />
            <Route path="/thank-you" component={ThankYou} />
          </Router>
        </ChakraProvider>
      </StateMachineProvider>
    </Auth0Provider>
   
  );
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

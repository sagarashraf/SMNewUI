import React, { useEffect, useState } from "react";
import { Form, Row, Col, Alert, Container, Button } from "react-bootstrap";
import {
	ALCHOHOL,
	BANK_CUR,
	BMI_WEIGHT,
	CREDIT_CARD,
	credit_rating_master,
	DIABETES,
	EXERCISE,
	GENDER,
	HEALTH_CONDITION,
	HEIGHT_LIST,
	INFRACTIONS,
	MERRIAGE,
	NUMBER_LIST,
	PAYMENT_MODE,
	PERCENTAGE_STEP_UP,
	VEG_FRUIT,
	WEIGHT_LIST,
	YES_NO,
} from "../../utils/AppConstant";
import { MakeLowerCase } from "../../utils/MakeLowerCase";
import { AgeFromDateString, AgeFromDate } from "age-calculator";
import { CALCULATION_OBJECT } from "../../utils/CalculationObjectTemplate";
import { BMI } from "../../utils/BMI";
import { UnhedgeEndDate } from "../../utils/UnhedgeEndDate";
import { HedgeEndDate } from "../../utils/HedgeEndDate";

/**
 * @author
 * @function Calculator
 **/

export const Calculator = (props) => {
	//======== Personal Information ==========/////
	const [date, setDate] = useState(new Date());
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [paymentType, setPaymentType] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zip, setZip] = useState("");
	const [gender, setGender] = useState("Male");
	const [BirthDate, setBirthDate] = useState("");
	const [age, setAge] = useState("");
	const [contact, setContact] = useState("");
	const [SSN, setSSN] = useState("");
	const [email, setEmail] = useState("");
	const [height, setHeight] = useState(5.7);

	const [Weight, setWeight] = useState(70);
	const [disableWeight, setdisableWeight] = useState(true);
	const [WeightBMI, setWeightBMI] = useState("");
	const [insuranceCompany, setInsuranceCompany] = useState("");
	const [insuranceCompanyRating, setInsuranceCompanyRating] = useState("");

	///Financial Hooks //////
	const [startDate, setstartDate] = useState("");
	const [endDate, setendDate] = useState("");
	const [calculatedendDatehedge, setcalculatedendDatehedge] = useState("");
	const [calculatedendDateunhedge, setu] = useState("");
	const [paymentAmount, setpaymentAmount] = useState("");
	const [atPercent, setatPercent] = useState(100);
	const [paymentatHundredpercent, setpaymentatHundredpercent] = useState("");
	const [paymentMode, setpaymentMode] = useState("");
	const [annualIncrease, setannualIncrease] = useState("");

	///Financial Hooks //////

	////Medical Health Profile Hooks/////

	//======= HIV AID ========///
	const [hiv, setHiv] = useState("No");

	//-------- Cancer Hooks---------//
	const [cancer, setCancer] = useState("No");
	const [showCancer, setshowCancer] = useState(false);
	const [cancerlevel, setCancerlevel] = useState(0);
	//-------- Cancer Hooks---------//
	//-------- Annual check-up---------//
	const [anualcheckup, setAnnualCheckUp] = useState("Yes");
	//-------- Annual check-up---------//
	const [medicalHis, setMedicalHistory] = useState("Yes");
	//---------Medical History---------//
	//---------bp---------//
	const [bp, setBP] = useState("No");
	const [bplevel, setBPlevel] = useState(0);
	const [showBP, setshowBP] = useState(false);
	//---------bp---------//
	//---------Cholesterol------//
	const [cholestoral, setCholestoral] = useState("Normal");
	const [cholestorallevel, setCholestorallevel] = useState(0);
	const [showcholestorallevel, setShowCholestorallevel] = useState(false);
	//---------Asthma------//
	const [asthma, setAsthma] = useState("No");
	const [asthmalevel, setAsthmalevel] = useState(0);
	const [showasthmalevel, setShowAsthmalevel] = useState(false);
	//---------Asthma------//
	//---------Diabetes------//
	const [diabetes, setDiabetes] = useState("No");
	const [diabeteslevel, setDiabeteslevel] = useState(0);
	const [showdiabeteslevel, setShowDiabeteslevel] = useState(false);

	//---------Diabetes------//
	const [liver, setLiver] = useState("No");
	const [showliverlevel, setshowLiverlevel] = useState(false);
	const [liverlevel, setLiverlevel] = useState(0);
	///=====liver ======///
	///====== kidney=====
	const [kidney, setKidney] = useState("No");
	const [kidneylevel, setKidneylevel] = useState(0);
	const [showkidneylevel, setshowKidneylevel] = useState(false);
	///====== kidney=====
	///====== kidney=====
	const [apnea, setApnea] = useState("No");
	const [apnealevel, setApnealevel] = useState(0);
	const [showapnealevel, setshowapnealevel] = useState(false);
	///====== kidney=====

	////======Bipolar======///
	const [bipolar, setBipolar] = useState("No");
	const [bipolarlevel, setBipolarlevel] = useState(0);
	const [showbipolarlevel, setshowBipolarlevel] = useState(false);
	////======Bipolar======///
	////======Nuurological======///
	const [neurological, setNeurological] = useState("No");
	const [neurologicallevel, setNeurologicallevel] = useState(0);
	const [showneurologicallevel, setshowNeurologicallevel] = useState(false);
	////======Nuurological======///
	////======psychiatric======///
	const [psychiatric, setPsychiatric] = useState("No");
	const [psychiatriclevel, setPsychiatriclevel] = useState(0);
	const [showpsychiatriclevel, setshowPsychiatriclevel] = useState(false);
	////======psychiatric======///
	////======anxiety======///
	const [anxiety, setAnxiety] = useState("No");
	const [anxietylevel, setAnxietylevel] = useState(0);
	const [showanxietylevel, setshowAnxietylevel] = useState(false);
	////======anxiety======///
	////======heart======///
	const [heart, setHeart] = useState("No");
	const [heartlevel, setHeartlevel] = useState(0);
	const [showheartlevel, setshowHeartlevel] = useState(false);
	////======heart======///
	////======Angio======///
	const [Angio, setAngio] = useState("No");
	const [Angiolevel, setAngiolevel] = useState(0);
	const [showAngiolevel, setshowAngiolevel] = useState(false);
	////======Angio======///

	///======= lifestyle hooks=====///
	const [physicallyActive, setphysicallyActive] = useState("Yes");
	const [physicalActivities, setphysicalActivities] = useState("No Exercise");
	const [vegies, setVegies] = useState("No");
	const [vegiesIntake, setvegiesIntake] = useState("No");
	const [disabilities, setDisabilities] = useState("No");
	const [tabacco, setTabacco] = useState("No");
	const [alchohol, setAlchohol] = useState("No");
	const [drugs, setDrugs] = useState("No");
	///======= lifestyle hooks=====///
	///======= legal history hooks=====///
	const [infractions, setInfractions] = useState("0 Driving Infractions");
	const [criminalCharges, setCriminalCharges] = useState("No Exercise");
	const [DUI, setDUI] = useState("No");
	const [showDUI, setshowDUI] = useState(false);
	const [DUIllevel, setDUIlevel] = useState(0);

	///======= legal history hooks=====///

	///======= financial hooks=====///
	const [bankcrupt, setbankcrupt] = useState("No");
	const [showbankcruptlevel, setshowbankcruptlevel] = useState(false);
	const [bankcruptllevel, setbankcruptlevel] = useState(0);
	const [creditRating, setcreditRating] = useState("Poor (300-549)");
	///======= financial hooks=====///
	///======= Insurance hooks=====///
	const [insuranceCoverage, setInsuranceCoverage] = useState("No");
	const [declinedCoverage, setDeclinedCoverage] = useState("No");

	///======= Insurance hooks=====///
	///======= More Detail =====///
	const [childSupport, setChildSupport] = useState("No");
	const [showchildSupportAmount, setshowchildSupportAmount] = useState(false);
	const [childSupportAmount, setchildSupportAmount] = useState("");
	const [merriage, setmerriage] = useState("No");

	///======= More Detail=====///

	///======== Birthdate =====////

	const BirthdateHandler = async (e) => {
		console.log(e.target.value);
		let ageFromString = new AgeFromDateString(e.target.value).age;
		setBirthDate(e.target.value);
		setAge(ageFromString);
		console.log("=========", await UnhedgeEndDate(ageFromString));
		console.log("===+++====", await HedgeEndDate(30));
	};

	///======= BMI setshow
	const HandleHeight = async (d) => {
		setdisableWeight(false);
		await setHeight(d);
		let BMIType = await BMI(gender, d, Weight);
		setWeightBMI(BMIType);
		console.log("retunr", BMIType);
	};
	const HandleWeight = async (d) => {
		await setWeight(d);
		let BMIType = await BMI(gender, height, d);
		setWeightBMI(BMIType);
		console.log("retunr", BMIType);
	};

	//===== InsuranceHandler
	const InsuranceHandler = (data) => {
		console.log(JSON.parse(data));
		var obj = JSON.parse(data);
		setInsuranceCompany(obj);
		console.log(insuranceCompany);
		setInsuranceCompanyRating(obj.Rating);
	};
	//==== Finncial Handler=====//
	const bankCoruptHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setbankcrupt(select);
			setshowbankcruptlevel(true);
			setbankcruptlevel(1);
		} else if (select == "No") {
			setshowbankcruptlevel(false);
			setbankcrupt(select);
			setbankcruptlevel(0);
		}
	};

	/////========== detail more=====//
	const ChildSupportHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setChildSupport(select);
			setshowchildSupportAmount(true);
			setchildSupportAmount(1);
		} else if (select == "No") {
			setshowchildSupportAmount(false);
			setChildSupport(select);
			setchildSupportAmount(0);
		}
	};

	const CancerHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setCancer(select);
			setshowCancer(true);
			setCancerlevel(1);
		} else if (select == "No") {
			setshowCancer(false);
			setCancer(select);
			setCancerlevel(0);
		}
	};
	///====== life style =========
	const DUIHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setDUI(select);
			setshowDUI(true);
			setDUIlevel(1);
		} else if (select == "No") {
			setshowDUI(false);
			setDUI(select);
			setDUIlevel(0);
		}
	};

	///====== life style =========

	//=======bp========//
	const BpHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setBP(select);
			setshowBP(true);
			setBPlevel(1);
		} else if (select == "No") {
			setshowBP(false);
			setBP(select);
			setBPlevel(0);
		}
	};

	////======chelestrol=====//
	const CholestrolHander = (data) => {
		var select = data.target.value;
		console.log(select);
		if (select == "Normal" || select == "Not Sure") {
			setCholestoral(select);
			setCholestorallevel(0);
			setShowCholestorallevel(false);
		} else {
			setCholestorallevel(1);
			setCholestoral(select);
			setShowCholestorallevel(true);
		}
	};

	///===== asthma====///
	const AsthmaHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setAsthma(select);
			setShowAsthmalevel(true);
			setAsthmalevel(1);
		} else if (select == "No") {
			setShowAsthmalevel(false);
			setAsthma(select);
			setAsthmalevel(0);
		}
	};
	/////======Diabetes======////
	const DiabetesHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setDiabetes(select);
			setShowDiabeteslevel(true);
			setAsthmalevel(1);
		} else if (select == "No") {
			setDiabetes(select);
			setShowDiabeteslevel(false);
			setAsthmalevel(0);
		}
	};
	/////======Diabetes======////
	/////=====liver======////
	const LiverHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setLiver(select);
			setLiverlevel(1);
			setshowLiverlevel(true);
		} else if (select == "No") {
			setLiver(select);
			setshowLiverlevel(false);
			setLiverlevel(0);
		}
	};
	/////=====liver======////
	/////=====Kidney======////
	const KidneyHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setKidney(select);
			setshowKidneylevel(true);
			setKidneylevel(1);
		} else if (select == "No") {
			setKidney(select);
			setshowKidneylevel(false);
			setKidneylevel(0);
		}
	};
	/////=====Kidney======////
	/////=====Apnea======////
	const ApneaHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setApnea(select);
			setshowapnealevel(true);
			setApnealevel(1);
		} else if (select == "No") {
			setApnea(select);
			setshowapnealevel(false);
			setApnealevel(0);
		}
	};
	/////=====Apnea======////

	/////=====Bipolar======////
	const BipolarHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setBipolar(select);
			setshowBipolarlevel(true);
			setBipolarlevel(1);
		} else if (select == "No") {
			setBipolar(select);
			setshowBipolarlevel(false);
			setBipolarlevel(0);
		}
	};

	/////=====Bipolar======////
	/////=====Nuerological======////
	const NueroHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setNeurological(select);
			setshowNeurologicallevel(true);
			setNeurologicallevel(1);
		} else if (select == "No") {
			setNeurological(select);
			setshowNeurologicallevel(false);
			setNeurologicallevel(0);
		}
	};
	/////=====Nuerological======////
	/////=====Psychiatric======////
	const PsychiatricHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setPsychiatric(select);
			setshowPsychiatriclevel(true);
			setPsychiatriclevel(1);
		} else if (select == "No") {
			setPsychiatric(select);
			setshowPsychiatriclevel(false);
			setPsychiatriclevel(0);
		}
	};
	/////=====Psychiatric======////
	/////=====anxiety======////
	const AnxietyHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setAnxiety(select);
			setshowAnxietylevel(true);
			setAnxietylevel(1);
		} else if (select == "No") {
			setAnxiety(select);
			setshowAnxietylevel(false);
			setAnxietylevel(0);
		}
	};
	/////=====anxiety======////
	////======heart======///
	const HeartHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setHeart(select);
			setshowHeartlevel(true);
			setHeartlevel(1);
		} else if (select == "No") {
			setHeart(select);
			setshowHeartlevel(false);
			setHeartlevel(0);
		}
	};
	////======heart======///
	////======Angio======///
	const AngioHandler = (data) => {
		var select = data.target.value;
		if (select == "Yes") {
			setAngio(select);
			setshowAngiolevel(true);
		} else if (select == "No") {
			setAngio(select);
			setshowAngiolevel(false);
			setAngiolevel(0);
		}
	};
	////======Angio======///
	///===== Sumbit logic====== ///
	const PersonalInfo = async (Template) => {
		Template.personalInformation.date = date;
		Template.personalInformation.firstName = firstName;
		Template.personalInformation.lastName = lastName;
		Template.personalInformation.paymentType = paymentType;
		Template.personalInformation.address = `${city}  ${state} ${zip}`;
		Template.personalInformation.gender = gender;
		Template.personalInformation.dateBirth = BirthDate;
		Template.personalInformation.contact = contact;
		Template.personalInformation.ageAuto = age;
		Template.personalInformation.SSN = SSN;
		Template.personalInformation.email = email;
		Template.personalInformation.height = height;
		Template.personalInformation.weightLBS = Weight;
		Template.personalInformation.weightBMI = WeightBMI;
		Template.personalInformation.insuranceCompany = insuranceCompany;
		Template.personalInformation.insuranceCompanyRating =
			insuranceCompanyRating;
	};
	const MedicalProfile = async (Template) => {
		Template.medicalData.hiv = hiv;
		Template.medicalData.cancer.state = cancer;
		Template.medicalData.cancer.level = cancerlevel;
		Template.medicalData.checkUp = anualcheckup;
		Template.medicalData.medHistory = medicalHis;
		Template.medicalData.hypertension.state = bp;
		Template.medicalData.hypertension.level = bplevel;
		Template.medicalData.cholesterol.state = cholestoral;
		Template.medicalData.cholesterol.level = cholestorallevel;
		Template.medicalData.asthma.state = asthma;
		Template.medicalData.asthma.level = asthmalevel;
		Template.medicalData.diabetes.state = diabetes;
		Template.medicalData.diabetes.level = diabeteslevel;
		Template.medicalData.diabetes.state = diabetes;
		Template.medicalData.diabetes.level = diabeteslevel;
		Template.medicalData.liver.state = liver;
		Template.medicalData.liver.level = liverlevel;
		Template.medicalData.kidney.state = kidney;
		Template.medicalData.kidney.level = kidneylevel;
		Template.medicalData.apnea.state = apnea;
		Template.medicalData.apnea.level = apnealevel;
		Template.medicalData.bipolar.state = bipolar;
		Template.medicalData.bipolar.level = bipolarlevel;
		Template.medicalData.neuroDisorder.state = neurological;
		Template.medicalData.neuroDisorder.level = neurologicallevel;
		Template.medicalData.psychiatric.state = psychiatric;
		Template.medicalData.psychiatric.level = psychiatriclevel;
		Template.medicalData.anxiety.state = anxiety;
		Template.medicalData.anxiety.level = anxietylevel;
		Template.medicalData.angiography.state = Angio;
		Template.medicalData.angiography.level = Angiolevel;
		Template.medicalData.heartIssue.state = heart;
		Template.medicalData.heartIssue.level = heartlevel;
	};
	const PaymentInfo = async (Template) => {
		Template.paymentInfo.startDate = startDate;
		Template.paymentInfo.endDate = endDate;
		Template.paymentInfo.calEndDateHedge = calculatedendDatehedge;
		Template.paymentInfo.calEndDateUnhedge = calculatedendDateunhedge;
		Template.paymentInfo.paymentAmount = paymentAmount;
		Template.paymentInfo.atPercent = atPercent;
		Template.paymentInfo.paymentAmountAt100 = paymentatHundredpercent;
		Template.paymentInfo.paymentMode = paymentMode;
		Template.paymentInfo.annualIncrese = annualIncrease;
	};
	const LifeStyle = async (Template) => {
		Template.lifeStyle.phyActive = physicallyActive;
		Template.lifeStyle.phyActivities = physicalActivities;
		Template.lifeStyle.fruitVeg = vegies;
		Template.lifeStyle.fruitvegportion = vegiesIntake;
		Template.lifeStyle.disabilities = disabilities;
		Template.lifeStyle.tobacco = tabacco;
		Template.lifeStyle.drugabuse = drugs;
		Template.lifeStyle.alchohol = alchohol;
	};
	const LegalRisk = async (Template) => {
		Template.legalRisk.infractions = infractions;
		Template.legalRisk.criminal = criminalCharges;
		Template.legalRisk.duidwi.state = DUI;
		Template.legalRisk.duidwi.level = DUIllevel;
	};
	const FinancialRisk = async (Template) => {
		Template.financialRisk.creditrating = creditRating;
		Template.financialRisk.bankcrupt.state = bankcrupt;
		Template.financialRisk.bankcrupt.level = bankcruptllevel;
	};
	const InsuranceRating = async (Template) => {
		Template.insurance.lifeCoverage = insuranceCoverage;
		Template.insurance.decline = declinedCoverage;
	};

	const MoreDetails = async (Template) => {
		Template.moreDetails.merriage = merriage;
		Template.moreDetails.childSupport.state = childSupport;
		Template.moreDetails.childSupport.level = childSupportAmount;
	};

	const onSubmit = async () => {
		let Template = CALCULATION_OBJECT;
		await PersonalInfo(Template);
		await MedicalProfile(Template);
		await PaymentInfo(Template);
		await LifeStyle(Template);
		await LegalRisk(Template);
		await FinancialRisk(Template);
		await InsuranceRating(Template);
		await MoreDetails(Template);
		console.log("===", Template);
	};

	return (
		<Container className='mt-3'>
			<Button onClick={() => onSubmit()}>submit</Button>
			<Row>
				<Alert className='text-center' variant='success'>
					<h3>Personal Information </h3>
				</Alert>
			</Row>

			<Form>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Date</Form.Label>
						<Form.Control
							value={date}
							onChange={(e) => setDate(e.target.value)}
							type='date'
						/>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>First Name</Form.Label>
						<Form.Control
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							type='text'
							placeholder='Oscar'
						/>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Last Name</Form.Label>
						<Form.Control
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							type='text'
							placeholder='Francis'
						/>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Payment Type</Form.Label>
						<Form.Select
							onChange={(e) => setPaymentType(e.target.value)}
							value={paymentType}
							className=''>
							<option value='' selected disabled hidden>
								Select....
							</option>

							<option value='1'>Life Contingent Payment (LCP)</option>
							<option value='2'>Guranteed Payments (GP)</option>
							<option value='0'>I Don’t Know</option>
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Label className='fw-bolder'>Address</Form.Label>
					<Form.Group as={Col} sm={4} xs={12} controlId='formGridCity'>
						<Form.Label className='fw-bolder'>City</Form.Label>
						<Form.Control
							value={city}
							onChange={(e) => setCity(e.target.value)}
							type='text'
							placeholder='Los Angeles'
						/>
					</Form.Group>

					<Form.Group as={Col} sm={4} xs={6} controlId='formGridState'>
						<Form.Label className='fw-bolder'>State</Form.Label>
						<Form.Control
							value={state}
							onChange={(e) => setState(e.target.value)}
							type='text'
							placeholder='California'
						/>
					</Form.Group>

					<Form.Group as={Col} sm={4} xs={6} controlId='formGridZip'>
						<Form.Label className='fw-bolder'>Zip</Form.Label>
						<Form.Control
							value={zip}
							onChange={(e) => setZip(e.target.value)}
							type='text'
							placeholder='000000'
						/>
					</Form.Group>
				</Row>

				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Gender</Form.Label>
						<Form.Select
							onChange={(e) => setGender(e.target.value)}
							value={gender}
							className=''>
							{GENDER.map((item) => {
								return <option value={item}>{item}</option>;
							})}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Date of Birth</Form.Label>
						<Form.Control
							value={BirthDate}
							onChange={(e) => BirthdateHandler(e)}
							type='date'
						/>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Age (Auto Generated)</Form.Label>
						<Form.Control
							value={age}
							type='text'
							placeholder='Auto Generated'
						/>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Contact</Form.Label>
						<Form.Control
							value={contact}
							onChange={(e) => setContact(e.target.value)}
							type='number'
							placeholder='+456 4564 443'
						/>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security (SSN)</Form.Label>
						<Form.Control
							value={SSN}
							onChange={(e) => setSSN(e.target.value)}
							type='number'
							placeholder='3344 3345'
						/>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='ABC@gmail.com'
						/>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={4} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Height</Form.Label>
						<Form.Select
							value={height}
							onChange={(e) => HandleHeight(e.target.value)}
							aria-label='Default select example'>
							{HEIGHT_LIST.map((item, index) => {
								return (
									<option key={`${index}Height`} value={item.value}>
										{item.label}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} sm={4} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Weight (LBS)</Form.Label>
						<Form.Select
							disabled={disableWeight}
							value={Weight}
							onChange={(e) => HandleWeight(e.target.value)}
							aria-label='Default select example'>
							{WEIGHT_LIST.map((item, index) => {
								return (
									<option key={`${index}Height`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} sm={4} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Weight (BMI)</Form.Label>
						<Form.Control
							readOnly
							value={WeightBMI}
							type='text'
							placeholder='Ideal Weight /Average Weight'
						/>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Insurance Company Name
						</Form.Label>
						<Form.Select
							onChange={(e) => InsuranceHandler(e.target.value)}
							aria-label='Default select example'>
							{credit_rating_master.map((item, index) => {
								return (
									<option key={`${index}weight`} value={JSON.stringify(item)}>
										{item.companyName}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Insurance Company Rating: (Auto Generated)
						</Form.Label>
						<Form.Control
							value={insuranceCompanyRating}
							type='text'
							placeholder='ABC'
						/>
					</Form.Group>
				</Row>

				<Row>
					<Alert className='text-center' variant='success'>
						<h3>Payment Information </h3>
					</Alert>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Payment Start Date</Form.Label>
						<Form.Control
							value={startDate}
							onChange={(e) => setstartDate(e.target.value)}
							type='date'
						/>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Payment End Date</Form.Label>
						<Form.Control
							value={endDate}
							onChange={(e) => setendDate(e.target.value)}
							type='date'
						/>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Calculated End Date (Auto Generated: Hedge)
						</Form.Label>
						<Form.Control value={calculatedendDatehedge} type='date' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Calculated End Date (Auto Generated: unhedge)
						</Form.Label>
						<Form.Control value={calculatedendDateunhedge} type='date' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Payment Amount</Form.Label>
						<Form.Control
							value={paymentAmount}
							onChange={(e) => setpaymentAmount(e.target.value)}
							type='number'
							placeholder='$ 35,456,66'
						/>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>At %:</Form.Label>
						<Form.Control
							value={atPercent}
							onChange={(e) => setatPercent(e.target.value)}
							type='number'
							placeholder='100%'
						/>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Payment Amount at 100%
						</Form.Label>
						<Form.Control
							value={paymentatHundredpercent}
							onChange={(e) => setpaymentatHundredpercent(e.target.value)}
							type='number'
							placeholder='$ 34,656,3'
						/>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Payment Mode</Form.Label>
						<Form.Select
							value={paymentMode}
							onChange={(e) => setpaymentMode(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{PAYMENT_MODE.map((item, index) => {
								return (
									<option key={`${index}`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Annual Increase</Form.Label>
						<Form.Select
							value={annualIncrease}
							onChange={(e) => setannualIncrease(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{PERCENTAGE_STEP_UP.map((item, index) => {
								return (
									<option key={`${index}`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-2'>
					<Alert className='text-center' variant='success'>
						<h3>Basic Health Questionnaire (BHQ) </h3>
					</Alert>
				</Row>
				<Row className='mt-2'>
					<Alert className='text-center' variant='info'>
						<h6>Medical Profile </h6>
					</Alert>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any history of HIV or AIDS?
						</Form.Label>
						<Form.Select
							value={hiv}
							onChange={(e) => setHiv(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}HIV`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Have you ever been diagnosed with Cancer?
						</Form.Label>
						<Form.Select value={cancer} onChange={(e) => CancerHandler(e)}>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}cancer`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showCancer && (
							<Form.Group className='mt-3' as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={cancerlevel}
									onChange={(e) => setCancerlevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Do you seek medical check-up annually?
						</Form.Label>
						<Form.Select
							value={anualcheckup}
							onChange={(e) => setAnnualCheckUp(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}checkup`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Any major medical history?
						</Form.Label>
						<Form.Select
							value={medicalHis}
							onChange={(e) => setMedicalHistory(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}checkup`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any history of high blood pressure or hypertension issue?
						</Form.Label>
						<Form.Select
							value={bp}
							onChange={(e) => BpHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}HISTORY`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showBP && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={bplevel}
									onChange={(e) => setBPlevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Any history of High Cholesterol?
						</Form.Label>
						<Form.Select
							value={cholestoral}
							onChange={(e) => CholestrolHander(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Open this select menu
							</option>
							{HEALTH_CONDITION.map((item, index) => {
								return (
									<option key={`${index}`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showcholestorallevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={cholestorallevel}
									onChange={(e) => setCholestorallevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any history of Asthma?
						</Form.Label>
						<Form.Select
							value={asthma}
							onChange={(e) => AsthmaHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}checkup`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showasthmalevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={asthmalevel}
									onChange={(e) => setAsthmalevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Any history of Diabetes Type 1 or Type 2
						</Form.Label>
						<Form.Select
							value={diabetes}
							onChange={(e) => DiabetesHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}checkup`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showdiabeteslevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>If Yes, classify?</Form.Label>
								<Form.Select
									value={diabeteslevel}
									onChange={(e) => setDiabeteslevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{DIABETES.map((item, index) => {
										return (
											<option key={`${index}checkup`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any Liver issue(s) currently of in past?
						</Form.Label>
						<Form.Select
							value={liver}
							onChange={(e) => LiverHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}LIVER`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showliverlevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={liverlevel}
									onChange={(e) => setLiverlevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any Kidney Issue(s) currently or in the past?
						</Form.Label>
						<Form.Select
							value={kidney}
							onChange={(e) => KidneyHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}LIVER`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showkidneylevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={kidneylevel}
									onChange={(e) => setKidneylevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Are you suffering from sleep apnea?
						</Form.Label>
						<Form.Select
							value={apnea}
							onChange={(e) => ApneaHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}LIVER`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showapnealevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={apnealevel}
									onChange={(e) => setApnealevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Have you ever been diagnosed with depression or bipolar disorder?
						</Form.Label>
						<Form.Select
							value={bipolar}
							onChange={(e) => BipolarHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}LIVER`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showbipolarlevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={bipolarlevel}
									onChange={(e) => setBipolarlevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any history of Neurological Disorder?
						</Form.Label>
						<Form.Select
							value={neurological}
							onChange={(e) => NueroHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}LIVER`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showneurologicallevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={neurologicallevel}
									onChange={(e) => setNeurologicallevel(e)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any history of Psychiatric Disorder?
						</Form.Label>
						<Form.Select
							value={psychiatric}
							onChange={(e) => PsychiatricHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}LIVER`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showpsychiatriclevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={psychiatriclevel}
									onChange={(e) => setPsychiatriclevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>
				</Row>

				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any history of Anxiety?
						</Form.Label>
						<Form.Select
							value={anxiety}
							onChange={(e) => AnxietyHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}LIVER`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showanxietylevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={anxietylevel}
									onChange={(e) => setAnxietylevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Have you ever had or currently have a Heart Issues?
						</Form.Label>
						<Form.Select
							value={heart}
							onChange={(e) => HeartHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}Heart`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showheartlevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={heartlevel}
									onChange={(e) => setHeartlevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Have you ever gone through angioplasty or angiography?
						</Form.Label>
						<Form.Select
							value={Angio}
							onChange={(e) => AngioHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}LIVER`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showAngiolevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>
									If Yes, in how many years?
								</Form.Label>
								<Form.Select
									value={Angiolevel}
									onChange={(e) => setAngiolevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>
				</Row>
				<Row className='mt-2'>
					<Alert className='text-center' variant='info'>
						<h6>Lifestyle / Physical Profile</h6>
					</Alert>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Are you physically active?
						</Form.Label>
						<Form.Select
							value={physicallyActive}
							onChange={(e) => setphysicallyActive(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}phyA`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							What is the pattern of your exercise or physical activities?
						</Form.Label>
						<Form.Select
							value={physicalActivities}
							onChange={(e) => setphysicalActivities(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{EXERCISE.map((item, index) => {
								return (
									<option key={`${index}EXERCISE`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Do you maintain healthy portion of fruits and green vegetables?
						</Form.Label>
						<Form.Select
							value={vegies}
							onChange={(e) => setVegies(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}VEGies`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							What portions of Fruits or vegetables do you intake?
						</Form.Label>
						<Form.Select
							value={vegiesIntake}
							onChange={(e) => setvegiesIntake(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{VEG_FRUIT.map((item, index) => {
								return (
									<option key={`${index}LIVER`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any physical disabilities?
						</Form.Label>
						<Form.Select
							value={disabilities}
							onChange={(e) => setDisabilities(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Do you Smoke including Marijuana or any other tobacco
						</Form.Label>
						<Form.Select
							value={tabacco}
							onChange={(e) => setTabacco(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Do you consume Alcohol?
						</Form.Label>
						<Form.Select
							value={alchohol}
							onChange={(e) => setAlchohol(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{ALCHOHOL.map((item, index) => {
								return (
									<option key={`${index}AL`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Any history of drug abuse now or in the past?
						</Form.Label>
						<Form.Select
							value={drugs}
							onChange={(e) => setDrugs(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}DRUG`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mt-2'>
					<Alert className='text-center' variant='info'>
						<h6>Legal Risk History Profile</h6>
					</Alert>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Number of driving Infractions in the last three (03) years?
						</Form.Label>
						<Form.Select
							value={infractions}
							onChange={(e) => setInfractions(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{INFRACTIONS.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Have you ever had or currently have any Criminal charges?
						</Form.Label>
						<Form.Select
							value={criminalCharges}
							onChange={(e) => setCriminalCharges(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Have you ever been convicted of a DUI/DWI?
						</Form.Label>
						<Form.Select
							value={DUI}
							onChange={(e) => DUIHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showDUI && (
							<Form.Group as={Col} controlId='formGridPassword'>
								<Form.Label className='fw-bolder'>
									If Yes, how many in the last 2 Years?
								</Form.Label>
								<Form.Select
									value={DUIllevel}
									onChange={(e) => setDUIlevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{NUMBER_LIST.map((item, index) => {
										return (
											<option key={`${index}`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>
				</Row>
				<Row className='mt-2'>
					<Alert className='text-center' variant='info'>
						<h6>Finacial Risk History Profile</h6>
					</Alert>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Have you ever been declared Bankrupt?
						</Form.Label>
						<Form.Select
							value={bankcrupt}
							onChange={(e) => bankCoruptHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showbankcruptlevel && (
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label className='fw-bolder'>If Yes, it is</Form.Label>
								<Form.Select
									value={bankcruptllevel}
									onChange={(e) => setbankcruptlevel(e.target.value)}
									aria-label='Default select example'>
									<option selected disabled>
										Select an Option
									</option>
									{BANK_CUR.map((item, index) => {
										return (
											<option key={`${index}BCt`} value={item}>
												{item}
											</option>
										);
									})}
								</Form.Select>
							</Form.Group>
						)}
					</Form.Group>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							How good is your credit rating?
						</Form.Label>
						<Form.Select
							value={creditRating}
							onChange={(e) => setcreditRating(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{CREDIT_CARD.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>

				<Row className='mt-2'>
					<Alert className='text-center' variant='info'>
						<h6>Insurance Rating</h6>
					</Alert>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Do you have Current Life Insurance Coverage?
						</Form.Label>
						<Form.Select
							value={insuranceCoverage}
							onChange={(e) => setInsuranceCoverage(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Have you ever been declined for life coverage?
						</Form.Label>
						<Form.Select
							value={declinedCoverage}
							onChange={(e) => setDeclinedCoverage(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='mt-2'>
					<Alert className='text-center' variant='info'>
						<h6>More Details</h6>
					</Alert>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Do you owe child support?
						</Form.Label>
						<Form.Select
							value={childSupport}
							onChange={(e) => ChildSupportHandler(e)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
						{showchildSupportAmount && (
							<Form.Group as={Col} controlId='formGridPassword'>
								<Form.Label className='fw-bolder'>If yes, how much?</Form.Label>
								<Form.Control
									value={childSupportAmount}
									onChange={(e) => setchildSupportAmount(e.target.value)}
									type='number'
									placeholder='$ 25,00,00'></Form.Control>
							</Form.Group>
						)}
					</Form.Group>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Are you married?</Form.Label>
						<Form.Select
							value={merriage}
							onChange={(e) => setmerriage(e.target.value)}
							aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{MERRIAGE.map((item, index) => {
								return (
									<option key={`${index}DIS`} value={item}>
										{item}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Row>
			</Form>
		</Container>
	);
};

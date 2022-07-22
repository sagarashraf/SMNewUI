import React from "react";
import { Form, Row, Col, Alert, Container } from "react-bootstrap";
import {
	ALCHOHOL,
	BANK_CUR,
	CREDIT_CARD,
	EXERCISE,
	INFRACTIONS,
	MERRIAGE,
	NUMBER_LIST,
	VEG_FRUIT,
	YES_NO,
} from "../../utils/AppConstant";

/**
 * @author
 * @function Calculator
 **/

export const Calculator = (props) => {
	return (
		<Container className='mt-3'>
			<Row>
				<Alert className='text-center' variant='success'>
					<h3>Personal Information </h3>
				</Alert>
			</Row>

			<Form>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Date</Form.Label>
						<Form.Control type='date' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>First Name</Form.Label>
						<Form.Control type='text' placeholder='Oscar' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Last Name</Form.Label>
						<Form.Control type='text' placeholder='Francis' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Payment Type</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Label className='fw-bolder'>Address</Form.Label>
					<Form.Group as={Col} sm={4} xs={12} controlId='formGridCity'>
						<Form.Label className='fw-bolder'>City</Form.Label>
						<Form.Control />
					</Form.Group>

					<Form.Group as={Col} sm={4} xs={6} controlId='formGridState'>
						<Form.Label className='fw-bolder'>State</Form.Label>
						<Form.Select defaultValue='Choose...'>
							<option>Choose...</option>
							<option>...</option>
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} sm={4} xs={6} controlId='formGridZip'>
						<Form.Label className='fw-bolder'>Zip</Form.Label>
						<Form.Control />
					</Form.Group>
				</Row>

				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Gender</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Date of Birth</Form.Label>
						<Form.Control type='date' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Age</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Contact</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Height</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Weight (LBS)</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Weight (BMI)</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Insurance Company Name
						</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Insurance Company Rating: (Auto Generated)
						</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
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
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Payment End Date</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Calculated End Date (Auto Generated: Hedge)
						</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Calculated End Date (Auto Generated: unhedge)
						</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Payment Amount</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>At %:</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Payment Amount at 100%
						</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Payment Mode</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Annual Increase</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Do you seek medical check-up annually?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Any major medical history?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Any history of High Cholesterol?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
							<option selected disabled>
								Open this select menu
							</option>
							<option value='1'>Normal</option>
							<option value='2'>Medcated</option>
							<option value='1'>High</option>
							<option value='2'>Not sure</option>
						</Form.Select>
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any history of Asthma?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>
							Any history of Diabetes Type 1 or Type 2
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>If Yes, classify?</Form.Label>
							<Form.Select aria-label='Default select example'>
								<option selected disabled>
									Select an Option
								</option>
								<option value=''>Diabetes Type 1</option>
								<option value=''>Diabetes Type 2</option>
							</Form.Select>
						</Form.Group>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any Liver issue(s) currently of in past?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any Kidney Issue(s) currently or in the past?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any Liver issue(s) currently of in past?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any Kidney Issue(s) currently or in the past?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Are you suffering from sleep apnea?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Have you ever been diagnosed with depression or bipolar disorder?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any history of Neurological Disorder?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any history of Psychiatric Disorder?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>
				</Row>

				<Row className='mb-3'>
					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Any history of Anxiety?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Have you ever had or currently have a Heart Issues?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
					</Form.Group>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							Have you ever gone through angioplasty or angiography?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>
								If Yes, in how many years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
					</Form.Group>

					<Form.Group as={Col} sm={6} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							What is the pattern of your exercise or physical activities?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
							<option selected disabled>
								Select an Option
							</option>
							{YES_NO.map((item, index) => {
								return (
									<option key={`${index}VEG`} value={item}>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridPassword'>
							<Form.Label className='fw-bolder'>
								If Yes, how many in the last 2 Years?
							</Form.Label>
							<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label className='fw-bolder'>If Yes, it is</Form.Label>
							<Form.Select aria-label='Default select example'>
								<option selected disabled>
									Select an Option
								</option>
								{BANK_CUR.map((item, index) => {
									return (
										<option key={`${index}DIS`} value={item}>
											{item}
										</option>
									);
								})}
							</Form.Select>
						</Form.Group>
					</Form.Group>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>
							How good is your credit rating?
						</Form.Label>
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Select aria-label='Default select example'>
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
						<Form.Group as={Col} controlId='formGridPassword'>
							<Form.Label className='fw-bolder'>If yes, how much?</Form.Label>
							<Form.Control
								type='number'
								placeholder='$ 25,00,00'></Form.Control>
						</Form.Group>
					</Form.Group>
				</Row>
				<Row className='mb-3 justify-content-center'>
					<Form.Group as={Col} sm={8} xs={12} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Are you married?</Form.Label>
						<Form.Select aria-label='Default select example'>
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

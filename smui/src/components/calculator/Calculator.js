import React from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";

/**
 * @author
 * @function Calculator
 **/

export const Calculator = (props) => {
	return (
		<div className='mt-3'>
			<Row>
				<Alert className='text-center' variant='success'>
					<h3>Personal Information </h3>
				</Alert>
			</Row>

			<Form>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Date</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>First Name</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Last Name</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Payment Type</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Label className='fw-bolder'>Address</Form.Label>
					<Form.Group as={Col} controlId='formGridCity'>
						<Form.Label className='fw-bolder'>City</Form.Label>
						<Form.Control />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridState'>
						<Form.Label className='fw-bolder'>State</Form.Label>
						<Form.Select defaultValue='Choose...'>
							<option>Choose...</option>
							<option>...</option>
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} controlId='formGridZip'>
						<Form.Label className='fw-bolder'>Zip</Form.Label>
						<Form.Control />
					</Form.Group>
				</Row>

				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Gender</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Date of Birth</Form.Label>
						<Form.Control type='date' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Age</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Contact</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Height</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Weight (LBS)</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Weight (BMI)</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
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
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Height</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Weight (LBS)</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Height</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Weight (LBS)</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Height</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Weight (LBS)</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Height</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Weight (LBS)</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Height</Form.Label>
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
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mt-2'>
					<Alert className='text-center' variant='info'>
						<h6>Medical Profile </h6>
					</Alert>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mt-2'>
					<Alert className='text-center' variant='info'>
						<h6>Medical Profile </h6>
					</Alert>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridPassword'>
						<Form.Label className='fw-bolder'>Email</Form.Label>
						<Form.Control type='text' placeholder='Password' />
					</Form.Group>
				</Row>
				<Row className='mt-2'>
					<Alert className='text-center' variant='info'>
						<h6>Medical Profile </h6>
					</Alert>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>
				</Row>
				<Row className='mt-2'>
					<Alert className='text-center' variant='info'>
						<h6>Medical Profile </h6>
					</Alert>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='formGridEmail'>
						<Form.Label className='fw-bolder'>Social Security</Form.Label>
						<Form.Control type='text' placeholder='ABC' />
					</Form.Group>
				</Row>
			</Form>
		</div>
	);
};

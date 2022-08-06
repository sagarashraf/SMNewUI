export const BMI = (gen, height, MenuallWeight) => {
	console.log("==", gen, height, MenuallWeight);
	let decimalpart = (height % 1).toFixed(1);
	let heightInInches = Math.trunc(height) * 12 + decimalpart * 10;
	console.log("===?", heightInInches);
	let Dem = parseFloat(heightInInches) * parseFloat(heightInInches);
	let bmi = parseFloat(MenuallWeight * 703) / Dem;
	console.log("BMI POINTS", bmi);
	let weight;
	if (gen == "Male") {
		if (bmi <= 17.5) {
			weight = "Underweight";
		} else if (bmi > 17.5 && bmi <= 21.0) {
			weight = "Ideal Weight";
		} else if (bmi > 21.0 && bmi <= 26.0) {
			weight = "Average Weight";
		} else if (bmi > 26.0 && bmi <= 31.0) {
			weight = "Overweight";
		} else if (bmi > 31.0) {
			weight = "Obese";
		}
		return weight;
	} else if (gen == "Female") {
		if (bmi <= 16.6) {
			weight = "Underweight";
		} else if (bmi > 16.6 && bmi <= 19.9) {
			weight = "Ideal Weight";
		} else if (bmi > 19.9 && bmi <= 24.7) {
			weight = "Average Weight";
		} else if (bmi > 24.7 && bmi <= 29.4) {
			weight = "Overweight";
		} else if (bmi > 29.4) {
			weight = "Obese";
		}
		return weight;
	}
};

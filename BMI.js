export const BMI = (gen, height, MenuallWeight) => {
	let bmi =
		parseFloat(MenuallWeight) / (parseFloat(height) * parseFloat(height));
	let weight;
	if (gen == "M") {
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
	} else if (gen == "F") {
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

const Dummydata = require("../helperFuntions/Dummydata");
const Alchohol = require("../helperFuntions/LifeStyleUnhedge/Alchohol");
const DrugAbuse = require("../helperFuntions/LifeStyleUnhedge/DrugAbuse");
const FruitVeg = require("../helperFuntions/LifeStyleUnhedge/FruitVeg");
const FruitVegPattern = require("../helperFuntions/LifeStyleUnhedge/FruitVegPattern");
const PhysicalActivities = require("../helperFuntions/LifeStyleUnhedge/PhysicalActivities");
const PhysicalDisability = require("../helperFuntions/LifeStyleUnhedge/PhysicalDisability");
const PhysicallyActive = require("../helperFuntions/LifeStyleUnhedge/PhysicallyActive");
const Tobacco = require("../helperFuntions/LifeStyleUnhedge/Tobacco");

module.exports = async function LifeStyleUnhedge(
	sectionBaseWeightage,
	data,
	sex
) {
	var valueList = [];
	var LifeExpectancy = [];
	const physicallyActive = await PhysicallyActive(data.phyActive, sex);
	console.log("physicallyActive", physicallyActive);
	const fruitVegies = await FruitVeg(data.fruitVeg, sex);
	console.log("fruitVegies", fruitVegies);
	const physicalDisabilities = await PhysicalDisability(data.disabilities, sex);
	console.log("physicalDisabilities", physicalDisabilities);
	const tobacco = await Tobacco(data.smoke, sex);
	console.log("tobacco", tobacco);
	const drugAbused = await DrugAbuse(data.drugabuse, sex);
	console.log("drugAbused", drugAbused);
	const physicalActivities = await PhysicalActivities(data.phyActivities, sex);
	console.log("physicalActivities", physicalActivities);
	const fruitvegPattern = await FruitVegPattern(data.fruitvegportion, sex);
	console.log("fruitvegPattern", fruitvegPattern);
	const alchoholintake = await Alchohol(data.alchohol, sex);
	console.log("alchoholintake", alchoholintake);
	valueList.push(
		alchoholintake[0]?.impact,
		fruitvegPattern[0]?.impact,
		physicalActivities[0]?.impact,
		drugAbused[0]?.impact,
		tobacco[0]?.impact,
		physicalDisabilities[0]?.impact,
		fruitVegies[0]?.impact,
		physicallyActive[0]?.impact
	);

	console.log(valueList);
	LifeExpectancy.push(
		alchoholintake[0]?.life_exp_val,
		fruitvegPattern[0]?.life_exp_val,
		physicalActivities[0]?.life_exp_val,
		drugAbused[0]?.life_exp_val,
		tobacco[0]?.life_exp_val,
		physicalDisabilities[0]?.life_exp_val,
		fruitVegies[0]?.life_exp_val,
		physicallyActive[0]?.life_exp_val
	);
	console.log("LifeExpectancy life style", LifeExpectancy);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[1]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return [me];
};

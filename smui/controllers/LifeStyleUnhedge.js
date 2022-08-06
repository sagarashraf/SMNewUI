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
	const physicallyActive = await PhysicallyActive(data.phyActive, sex);
	const fruitVegies = await FruitVeg(data.fruitVeg, sex);
	const physicalDisabilities = await PhysicalDisability(data.disabilities, sex);
	const tobacco = await Tobacco(data.tobacco, sex);
	const drugAbused = await DrugAbuse(data.drugabuse, sex);
	const physicalActivities = await PhysicalActivities(data.phyActivities, sex);
	const fruitvegPattern = await FruitVegPattern(data.fruitvegportion, sex);
	const alchoholintake = await Alchohol(data.alchohol, sex);
	valueList.push(
		alchoholintake,
		fruitvegPattern,
		physicalActivities,
		drugAbused,
		tobacco,
		physicalDisabilities,
		fruitVegies,
		physicallyActive
	);
	console.log(valueList);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[1]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return [me];
};

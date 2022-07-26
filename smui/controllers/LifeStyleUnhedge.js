const Dummydata = require("../helperFuntions/Dummydata");
const Alchohol = require("../helperFuntions/LifeStyleUnhedge/Alchohol");
const DrugAbuse = require("../helperFuntions/LifeStyleUnhedge/DrugAbuse");
const FruitVeg = require("../helperFuntions/LifeStyleUnhedge/FruitVeg");
const FruitVegPattern = require("../helperFuntions/LifeStyleUnhedge/FruitVegPattern");
const PhysicalActivities = require("../helperFuntions/LifeStyleUnhedge/PhysicalActivities");
const PhysicalDisability = require("../helperFuntions/LifeStyleUnhedge/PhysicalDisability");
const PhysicallyActive = require("../helperFuntions/LifeStyleUnhedge/PhysicallyActive");
const Tobacco = require("../helperFuntions/LifeStyleUnhedge/Tobacco");

module.exports = async function LifeStyleUnhedge(sectionBaseWeightage) {
	var valueList = [];
	let sex = Dummydata.lifeStyle.gender;
	const physicallyActive = await PhysicallyActive(
		Dummydata.lifeStyle.phyActive,
		sex
	);
	const fruitVegies = await FruitVeg(Dummydata.lifeStyle.fruitVeg, sex);
	const physicalDisabilities = await PhysicalDisability(
		Dummydata.lifeStyle.disabilities,
		sex
	);
	const tobacco = await Tobacco(Dummydata.lifeStyle.tobacco, sex);
	const drugAbused = await DrugAbuse(Dummydata.lifeStyle.drugabuse, sex);
	const physicalActivities = await PhysicalActivities(
		Dummydata.lifeStyle.phyActivities,
		sex
	);
	const fruitvegPattern = await FruitVegPattern(
		Dummydata.lifeStyle.fruitvegportion,
		sex
	);
	const alchoholintake = await Alchohol(Dummydata.lifeStyle.alchohol, sex);
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

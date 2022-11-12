module.exports = async function ValidatorMedicalForm(objectType) {
	for (var key in objectType) {
		if (objectType["checkUp"] != 0 && objectType["checkUp"] != 1) {
			return `Annual check-Up selected option is invalid`;
		} else if (objectType["medHistory"] != 0 && objectType["medHistory"] != 1) {
			return `Medical History selected option is invalid`;
		} else if (objectType.hasOwnProperty(key)) {
			if (
				objectType[key].state &&
				objectType[key].state != 0 &&
				objectType[key].state != 1
			) {
				return `${key} selected option is invalid`;
			} else if (objectType[key].state == 1) {
				if (objectType[key].level < 0 || objectType[key].level > 10) {
					return `${key} selected years count is invalid`;
				} else if (objectType[key]?.type?.length === 0) {
					return `Selected type for ${key} is invalid`;
				}
			}
		}
	}

	return true;
};

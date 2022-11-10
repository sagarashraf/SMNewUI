// 	const insert = `INSERT INTO bhq_form_data 
// 	( first_name ,
// 	 last_name ,
// 	 pmnt_type ,
// 	 address ,
// 	 gender ,
// 	 date_of_birth ,
// 	 age ,
// 	 contact ,
// 	 social_security ,
// 	 email ,
// 	 height ,
// 	 weight_lbs ,
// 	 bmi ,
// 	 ins_name ,
// 	 ins_rating ,
// 	 pmnt_start_date ,
// 	 pmnt_end_date ,
// 	 hedge_date ,
// 	 unhedge_date ,
// 	 pmnt_amount ,
// 	 at_ ,
// 	 pmnt_mode ,
// 	 annual_increase ,
// 	 hiv ,
// 	 cancer ,
// 	 cancer_years ,
// 	 cancer_type ,
// 	 annual_checkup ,
// 	 medical_history ,
// 	 blood_pressure ,
// 	 blood_pressure_years ,
// 	 cholestrol ,
// 	 cholestrol_years ,
// 	 lung ,
// 	 lung_years ,
// 	 lung_type ,
// 	 diabetes ,
// 	 diabetes_type ,
// 	 liver_issue ,
// 	 liver_issue_years ,
// 	 liver_issue_type ,
// 	 kidney_issue ,
// 	 kidney_issue_years ,
// 	 kidney_issue_type ,
// 	 suicide ,
// 	 suicide_years ,
// 	 suicide_type ,
// 	 mental_health ,
// 	 mental_health_years ,
// 	 mental_health_type ,
// 	 nuero_disorder ,
// 	 nuero_disorder_years ,
// 	 nuero_disorder_type ,
// 	 pain_management ,
// 	 pain_management_years ,
// 	 pain_management_type ,
// 	 lead_poisioning ,
// 	 lead_posioning_years ,
// 	 lead_posioning_type ,
// 	 heart_issues ,
// 	 heart_issues_years ,
// 	 heart_issues_type ,
// 	 physical_active ,
// 	 physical_active_type ,
// 	 vegies ,
// 	 vegies_servings ,
// 	 disabilities ,
// 	 disabilities_type ,
// 	 smoke ,
// 	 smoke_type ,
// 	 alcohol ,
// 	 drug_abuse ,
// 	 drug_abuse_type ,
// 	 dui_dwi ,
// 	 dui_dwi_type ,
// 	 criminal ,
// 	 criminal_type ,
// 	 assault ,
// 	 assault_years ,
// 	 assault_type ,
// 	 bankrupt ,
// 	 bankrupt_type ,
// 	 credit_rating ,
// 	 life_ins_cov ,
// 	 declined_life_cov ,
// 	 child_support ,
// 	 child_support_value ,
// 	 marital_status ,
// 	 submitted_date ,
// 	 drug ,
// 	 drug_years ,
// 	 drug_type )
// 	VALUES
// 	('${req.body.personalInformation.firstName}',
// 	 '${req.body.personalInformation.lastName}',
// 	 '${req.body.personalInformation.paymentType}', 
// 	 '${req.body.personalInformation.address}',
// 	 '${req.body.gender}', 
// 	 ' ${req.body.personalInformation.dateBirth}',
// 	 '${req.body.personalInformation.ageAuto}',
// 	 '${req.body.personalInformation.contact}',
// 	 '${req.body.personalInformation.SSN}',
// 	 '${req.body.personalInformation.email}',
// 	 '${req.body.personalInformation.height}', 
// 	 '${req.body.personalInformation.weightLBS}', 
// 	 '${req.body.personalInformation.weightBMI}', 
// 	 '${req.body.personalInformation.insuranceCompany}',
// 	 '${req.body.personalInformation.insuranceCompanyRating}',
// 	 '${req.body.paymentInfo.startDate}', 
// 	 '${req.body.paymentInfo.endDate}',
// 	 '${req.body.paymentInfo.calEndDateHedge}', 
// 	 '${req.body.paymentInfo.calEndDateUnhedge}', 
// 	 '${req.body.paymentInfo.paymentAmount}', 
// 	 '${req.body.paymentInfo.atPercent}', 
// 	 '${req.body.paymentInfo.paymentMode}', 
// 	 '${req.body.paymentInfo.annualIncrese}', 
// 	 '${req.body.medicalData.hiv}', 
// 	 '${req.body.medicalData.cancer.state}', 
// 	 '${req.body.medicalData.cancer.level}', 
// 	 '${req.body.medicalData.cancer.type}',
// 	 '${req.body.medicalData.checkUp}', 
// 	 '${req.body.medicalData.medHistory}', 
// 	 '${req.body.medicalData.hypertension.state}', 
// 	 '${req.body.medicalData.hypertension.level}', 
// 	 '${req.body.medicalData.cholesterol.state}',
// 	 '${req.body.medicalData.cholesterol.level}',
// 	 '${req.body.medicalData.lung.state}', 
// 	 '${req.body.medicalData.lung.level}', 
// 	 '${req.body.medicalData.lung.type}',
// 	 '${req.body.medicalData.diabetes.state}',
// 	 '${req.body.medicalData.diabetes.type}',
// 	 '${req.body.medicalData.liver.state}',
// 	 '${req.body.medicalData.liver.level}', 
// 	 '${req.body.medicalData.liver.type}',
// 	 '${req.body.medicalData.kidney.state}', 
// 	 '${req.body.medicalData.kidney.level}', 
// 	 '${req.body.medicalData.kidney.type}', 
// 	 '${req.body.medicalData.suicide.state}',
// 	 '${req.body.medicalData.suicide.level}', 
// 	 '${req.body.medicalData.suicide.type}', 
// 	 '${req.body.medicalData.mentalHealth.state}', 
// 	 '${req.body.medicalData.mentalHealth.level}', 
// 	 '${req.body.medicalData.mentalHealth.type}', 
// 	 '${req.body.medicalData.neuroDisorder.state}', 
// 	 '${req.body.medicalData.neuroDisorder.level}',
// 	 '${req.body.medicalData.neuroDisorder.type}',
// 	 '${req.body.medicalData.pain.state}', 
// 	 '${req.body.medicalData.pain.level}',
// 	 '${req.body.medicalData.pain.type}', 
// 	 '${req.body.medicalData.lead.state}', 
// 	 '${req.body.medicalData.lead.level}', 
// 	 '${req.body.medicalData.lead.type}', 
// 	 '${req.body.medicalData.heartIssue.state}',
// 	 '${req.body.medicalData.heartIssue.level}',
// 	 '${req.body.medicalData.heartIssue.type}', 
// 	 '${req.body.lifeStyle.phyActive}', 
// 	 '${req.body.lifeStyle.phyActivities}', 
// 	 '${req.body.lifeStyle.fruitVeg}', 
// 	 '${req.body.lifeStyle.fruitvegportion}', 
// 	 '${req.body.lifeStyle.disabilities.state}', 
// 	 '${req.body.lifeStyle.disabilities.type}', 
// 	 '${req.body.lifeStyle.smoke.state}', 
// 	 '${req.body.lifeStyle.smoke.type}', 
// 	 '${req.body.lifeStyle.alchohol}', 
// 	 '${req.body.lifeStyle.drugabuse.state}',
// 	 '${req.body.lifeStyle.drugabuse.type}', 
// 	 '${req.body.legalRisk.drivingHistory.state}',
// 	 '${req.body.legalRisk.drivingHistory.type}',
// 	 '${req.body.legalRisk.criminal.state}', 
// 	 '${req.body.legalRisk.criminal.type}',
// 	 '${req.body.legalRisk.assault.state}', 
// 	 '${req.body.legalRisk.assault.level}',
// 	 '${req.body.legalRisk.assault.type}',
// 	 '${req.body.financialRisk.bankcrupt.state}',
// 	 '${req.body.financialRisk.bankcrupt.type}', 
// 	 '${req.body.financialRisk.creditrating}', 
// 	 '${req.body.insurance.lifeCoverage}',
// 	 '${req.body.insurance.decline}', 
// 	 '${req.body.moreDetails.childSupport.state}',
// 	 '${req.body.moreDetails.childSupport.level}', 
// 	 '${req.body.moreDetails.married}', 
// 	 '${new Date().toString()}', 
// 	 '${req.body.medicalData.drug.state}',
// 	 '${req.body.medicalData.drug.level}',
// 	 '${req.body.medicalData.drug.type}')`;


	


// let ins_result = await SqlQueryHandler(insert);

// // IF INSERTION SUCCESSFUL.
// const select = `SELECT  ID FROM bhq_form_data ORDER BY ID DESC LIMIT 1`;
// let selresult =  await JsonConverter(await SqlQueryHandler(select));
// console.log("selresult",selresult[0]?.ID)



// if(req.body.paymentInfo.annualIncrese <= 0){
// 	const LCP_Without_AI_Inst = `INSERT INTO bhq_unhedge_quotes
// (id,
// base_rate,
// min_rate,
// max_rate,
// base_quote,
// min_quote,
// max_quote,
// fam_pro,
// fam_pro_rate,
// ins_term)
// VALUES
// ('${selresult[0]?.ID}',
// '${totalBase.originalBaseRate}',
// '${totalBase.minBaseRate}',
// '${totalBase.maxBaseRate}',
// '${base_rate_quote.LCPSingleQuoteWithoutAI}',
// '${LCPWithoutAIUnhedge.LCPMinQuotesWithoutAI}',
// '${LCPWithoutAIUnhedge.LCPMaxQuotesWithoutAI}',
// '${LCPWithoutAIUnhedge.LCPBEN}',
// '0.0',
// '30 YEAR TERM');` 
// 	let lcpwoai =  await JsonConverter(await SqlQueryHandler(LCP_Without_AI_Inst));

// 	const LCP_Without_AI_Inst_hedge = `INSERT INTO bhq_hedge_quotes
// (id,
// base_rate,
// min_rate,
// max_rate,
// base_quote,
// min_quote,
// max_quote,
// fam_pro,
// fam_pro_rate,
// ins_term)
// VALUES
// ('${selresult[0]?.ID}',
// '${totalBase.originalBaseRate}',
// '${totalBase.minBaseRate}',
// '${totalBase.maxBaseRate}',
// '${base_rate_quote.LCPSingleQuoteWithoutAI}',
// '${LCPWithoutAIhedge.LCPMinQuotesWithoutAI}',
// '${LCPWithoutAIhedge.LCPMaxQuotesWithoutAI}',
// '${LCPWithoutAIhedge.LCPBEN}',
// '0.0',
// '30 YEAR TERM');` 
// 	let lcpwoaih =  await JsonConverter(await SqlQueryHandler(LCP_Without_AI_Inst_hedge));

// 	//console.log("bitch",CommStructureLevelUnhedge)

// let unhedge_comm_struct  = `INSERT INTO bhq_unhedge_comm_struct
// (id,
// cost_of_deal,
// comm_l1_r5_min,
// comm_l1_r5_max,
// comm_l1_cr5_min,
// comm_l1_cr5_max,
// comm_l2_r10_min,
// comm_l2_r10_max,
// comm_l2_cr10_min,
// comm_l2_cr10_max,
// comm_l3_r15_min,
// comm_l3_r15_max,
// comm_l3_cr15_min,
// comm_l3_cr15_max)
// VALUES
// ('${selresult[0]?.ID}',
// '7500',
// '${CommStructureLevelUnhedge.levelFiveMinSimple}',
// '${CommStructureLevelUnhedge.levelFiveMaxSimple}',
// '${CommStructureLevelUnhedge.levelFiveMinCompany}',
// '${CommStructureLevelUnhedge.levelFiveMaxCompany}',
// '${CommStructureLevelUnhedge.levelTenMinSimple}',
// '${CommStructureLevelUnhedge.levelFiveMaxSimple}',
// '${CommStructureLevelUnhedge.levelTenMinCompany}',
// '${CommStructureLevelUnhedge.levelTenMaxCompany}',
// '${CommStructureLevelUnhedge.levelTewMinSimple}',
// '${CommStructureLevelUnhedge.levelTewMaxSimple}',
// '${CommStructureLevelUnhedge.levelTewMinCompany}',
// '${CommStructureLevelUnhedge.levelTewMaxCompany}');`

// let unhed_comm =  await JsonConverter(await SqlQueryHandler(unhedge_comm_struct));





// }





// else{
// 	const LCP_With_AI_Inst = `INSERT INTO bhq_unhedge_quotes
// (id,
// base_rate,
// min_rate,
// max_rate,
// base_quote,
// min_quote,
// max_quote,
// fam_pro,
// fam_pro_rate,
// ins_term)
// VALUES
// ('${selresult[0]?.ID}',
// '${totalBase.originalBaseRate}',
// '${totalBase.minBaseRate}',
// '${totalBase.maxBaseRate}',
// '${base_rate_quote.LCPSingleQuoteWithAI}',
// '${LCPWithAIUnhedge.LCPMinQuotesWithAI}',
// '${LCPWithAIUnhedge.LCPMaxQuotesWithAI}',
// '${LCPWithAIUnhedge.LCPBEN}',
// '0.05',
// '30 YEAR TERM');` 
// let lcpwoai =  await JsonConverter(await SqlQueryHandler(LCP_With_AI_Inst));

// const LCP_With_AI_Inst_hedge = `INSERT INTO bhq_hedge_quotes
// (id,
// base_rate,
// min_rate,
// max_rate,
// base_quote,
// min_quote,
// max_quote,
// fam_pro,
// fam_pro_rate,
// ins_term)
// VALUES
// ('${selresult[0]?.ID}',
// '${totalBase.originalBaseRate}',
// '${totalBase.minBaseRate}',
// '${totalBase.maxBaseRate}',
// '${base_rate_quote.LCPSingleQuoteWithAI}',
// '${LCPWithAIhedge.LCPMinQuotesWithAI}',
// '${LCPWithAIhedge.LCPMaxQuotesWithAI}',
// '${LCPWithAIhedge.LCPBEN}',
// '0.05',
// '30 YEAR TERM');` 
// let lcpwoaih =  await JsonConverter(await SqlQueryHandler(LCP_With_AI_Inst_hedge));

// let unhedge_comm_struct  = `INSERT INTO bhq_unhedge_comm_struct
// (id,
// cost_of_deal,
// comm_l1_r5_min,
// comm_l1_r5_max,
// comm_l1_cr5_min,
// comm_l1_cr5_max,
// comm_l2_r10_min,
// comm_l2_r10_max,
// comm_l2_cr10_min,
// comm_l2_cr10_max,
// comm_l3_r15_min,
// comm_l3_r15_max,
// comm_l3_cr15_min,
// comm_l3_cr15_max)
// VALUES
// ('${selresult[0]?.ID}',
// '7500',
// '${CommStructureLevelUnhedge.levelFiveMinSimple}',
// '${CommStructureLevelUnhedge.levelFiveMaxSimple}',
// '${CommStructureLevelUnhedge.levelFiveMinCompany}',
// '${CommStructureLevelUnhedge.levelFiveMaxCompany}',
// '${CommStructureLevelUnhedge.levelTenMinSimple}',
// '${CommStructureLevelUnhedge.levelFiveMaxSimple}',
// '${CommStructureLevelUnhedge.levelTenMinCompany}',
// '${CommStructureLevelUnhedge.levelTenMaxCompany}',
// '${CommStructureLevelUnhedge.levelTewMinSimple}',
// '${CommStructureLevelUnhedge.levelTewMaxSimple}',
// '${CommStructureLevelUnhedge.levelTewMinCompany}',
// '${CommStructureLevelUnhedge.levelTewMaxCompany}');`

// let unhed_comm =  await JsonConverter(await SqlQueryHandler(unhedge_comm_struct));






// }

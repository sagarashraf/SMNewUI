module.exports = async function COI_PAYMENT(
	smoke,
    weight,
    const_factor,
    factor_male,
    factor_female,
    death_benefit,
    standard_tob,
    standard_plus,
    pref_tab,
    underweight,
    overweight,
    obese


)
{
   
    let st_non_tab = const_factor*death_benefit*factor_male*factor_female;
    let st_tab = standard_tob * st_non_tab;
    let st_plus = standard_plus * st_non_tab;
    let preff_tab = standard_plus * st_non_tab * pref_tab;
    let uw_st_tob = standard_tob * underweight * st_non_tab;
    let ow_st_tob = standard_tob * overweight * st_non_tab;
    let ob_st_tob = standard_tob * obese * st_non_tab;
    let uw_st_non_tob = underweight * st_non_tab;
    let ow_st_non_tob = overweight * st_non_tab;
    let ob_st_non_tob =  obese * st_non_tab;

    if(smoke = "yes" && weight == "over weight"){
        return ow_st_tob;
    }
    if(smoke = "yes" && weight == "average weight"){
        return st_tab;
    }
    if(smoke = "yes" && weight == "obese"){
        return ob_st_tob;
    }
    if(smoke = "yes" && weight == "under weight"){
        return uw_st_tob;
    }
    if(smoke = "yes" && weight == "ideal weight"){
        return preff_tab;
    }

    if(smoke = "no" && weight == "over weight"){
        return ow_st_non_tob;
    }
    if(smoke = "no" && weight == "average weight"){
        return st_non_tab;
    }
    if(smoke = "no" && weight == "obese"){
        return ob_st_non_tob;
    }
    if(smoke = "no" && weight == "under weight"){
        return uw_st_non_tob;
    }
    if(smoke = "no" && weight == "ideal weight"){
        return st_plus;
    }


    

    

}
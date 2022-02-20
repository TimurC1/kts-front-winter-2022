export const getCountryStatistics = async () => {
    const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
    const countriesRawData = await response.json();

    const countriesDataMap = countriesRawData.countryitems[0];
    delete countriesDataMap.stat;

    return Object.values(countriesDataMap);
};

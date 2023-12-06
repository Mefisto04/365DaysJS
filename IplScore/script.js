async function getMatchData(){
    return await fetch('https://api.cricapi.com/v1/currentMatches?apikey=8cc7c8e7-eff5-4a81-ba54-e9486394fadc')
    .then((response) => response.json())
    // .then((data) => {
    //     console.log(data);
    //     var matches = data.matches;
    //     var match = matches[0];
    //     var unique_id = match.unique_id;
    //     console.log(unique_id);
    //     return fetch(`https://api.cricapi.com/v1/scorecard?apikey=8cc7c8e7-eff5-4a81-ba54-e9486394fadc&unique_id=${unique_id}`)
    // })
    .then(data=>{
        if(data.status!="success") return ;
        const matchList = data.data;
        if(!matchList) return [];
        const relevantData = matchList.map(match => `Matches : ${match.name}<br> Status : ${match.status}`);
        console.log({relevantData});
        document.getElementById("matches").innerHTML=relevantData.map(match => `<li style="color: white; font-weight: 500;">${match}</li>`).join('');
        return relevantData;
    })
}
getMatchData();
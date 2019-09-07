import React from 'react'



const CityList = [{ label: "Aberdeen" }, { label: "Abilene" }, { label: "Akron" }, { label: "Albany" }, { label: "Albuquerque" }, { label: "Alexandria" }, { label: "Allentown" }, { label: "Amarillo" }, { label: "Anaheim" }, {
    label:
        "Anchorage"
}, { label: "Ann Arbor" }, { label: "Antioch" }, { label: "Apple Valley" }, { label: "Appleton" }, { label: "Arlington" }, { label: "Arvada" }, { label: "Asheville" }, { label: "Athens" }, { label: "Atlanta" }, { label: "Atlantic City" }, {
    label:
        "Augusta"
}, { label: "Aurora" }, { label: "Austin" }, { label: "Bakersfield" }, { label: "Baltimore" }, { label: "Barnstable" }, { label: "Baton Rouge" }, { label: "Beaumont" }, { label: "Bel Air" }, { label: "Bellevue" }, { label: "Berkeley" }, { label: "Bethlehem" }, {
    label:
        "Billings"
}, { label: "Birmingham" }, { label: "Bloomington" }, { label: "Boise" }, { label: "Boise City" }, { label: "Bonita Springs" }, { label: "Boston" }, { label: "Boulder" }, { label: "Bradenton" }, { label: "Bremerton" }, { label: "Bridgeport" }, { label: "Brighton" }, {
    label:
        "Brownsville"
}, { label: "Bryan" }, { label: "Buffalo" }, { label: "Burbank" }, { label: "Burlington" }, { label: "Cambridge" }, { label: "Canton" }, { label: "Cape Coral" }, { label: "Carrollton" }, { label: "Cary" }, { label: "Cathedral City" }, { label: "Cedar Rapids" }, {
    label:
        "Champaign"
}, { label: "Chandler" }, { label: "Charleston" }, { label: "Charlotte" }, { label: "Chattanooga" }, { label: "Chesapeake" }, { label: "Chicago" }, { label: "Chula Vista" }, { label: "Cincinnati" }, { label: "Clarke County" }, { label: "Clarksville" }, {
    label:
        "Clearwater"
}, { label: "Cleveland" }, { label: "College Station" }, { label: "Colorado Springs" }, { label: "Columbia" }, { label: "Columbus" }, { label: "Concord" }, { label: "Coral Springs" }, { label: "Corona" }, { label: "Corpus Christi" }, { label: "Costa Mesa" }, {
    label:
        "Dallas"
}, { label: "Daly City" }, { label: "Danbury" }, { label: "Davenport" }, { label: "Davidson County" }, { label: "Dayton" }, { label: "Daytona Beach" }, { label: "Deltona" }, { label: "Denton" }, { label: "Denver" }, { label: "Des Moines" }, { label: "Detroit" }, { label: "Downey" }, {
    label:
        "Duluth"
}, { label: "Durham" }, { label: "El Monte" }, { label: "El Paso" }, { label: "Elizabeth" }, { label: "Elk Grove" }, { label: "Elkhart" }, { label: "Erie" }, { label: "Escondido" }, { label: "Eugene" }, { label: "Evansville" }, { label: "Fairfield" }, { label: "Fargo" }, { label: "Fayetteville" }, {
    label:
        "Fitchburg"
}, { label: "Flint" }, { label: "Fontana" }, { label: "Fort Collins" }, { label: "Fort Lauderdale" }, { label: "Fort Smith" }, { label: "Fort Walton Beach" }, { label: "Fort Wayne" }, { label: "Fort Worth" }, { label: "Frederick" }, { label: "Fremont" }, {
    label:
        "Fresno"
}, { label: "Fullerton" }, { label: "Gainesville" }, { label: "Garden Grove" }, { label: "Garland" }, { label: "Gastonia" }, { label: "Gilbert" }, { label: "Glendale" }, { label: "Grand Prairie" }, { label: "Grand Rapids" }, { label: "Grayslake" }, { label: "Green Bay" }, {
    label:
        "GreenBay"
}, { label: "Greensboro" }, { label: "Greenville" }, { label: "Gulfport-Biloxi" }, { label: "Hagerstown" }, { label: "Hampton" }, { label: "Harlingen" }, { label: "Harrisburg" }, { label: "Hartford" }, { label: "Havre de Grace" }, { label: "Hayward" }, { label: "Hemet" }, {
    label:
        "Henderson"
}, { label: "Hesperia" }, { label: "Hialeah" }, { label: "Hickory" }, { label: "High Point" }, { label: "Hollywood" }, { label: "Honolulu" }, { label: "Houma" }, { label: "Houston" }, { label: "Howell" }, { label: "Huntington" }, { label: "Huntington Beach" }, { label: "Huntsville" }, {
    label:
        "Independence"
}, { label: "Indianapolis" }, { label: "Inglewood" }, { label: "Irvine" }, { label: "Irving" }, { label: "Jackson" }, { label: "Jacksonville" }, { label: "Jefferson" }, { label: "Jersey City" }, { label: "Johnson City" }, { label: "Joliet" }, { label: "Kailua" }, {
    label:
        "Kalamazoo"
}, { label: "Kaneohe" }, { label: "Kansas City" }, { label: "Kennewick" }, { label: "Kenosha" }, { label: "Killeen" }, { label: "Kissimmee" }, { label: "Knoxville" }, { label: "Lacey" }, { label: "Lafayette" }, { label: "Lake Charles" }, { label: "Lakeland" }, { label: "Lakewood" }, {
    label:
        "Lancaster"
}, { label: "Lansing" }, { label: "Laredo" }, { label: "Las Cruces" }, { label: "Las Vegas" }, { label: "Layton" }, { label: "Leominster" }, { label: "Lewisville" }, { label: "Lexington" }, { label: "Lincoln" }, { label: "Little Rock" }, { label: "Long Beach" }, { label: "Lorain" }, {
    label:
        "Los Angeles"
}, { label: "Louisville" }, { label: "Lowell" }, { label: "Lubbock" }, { label: "Macon" }, { label: "Madison" }, { label: "Manchester" }, { label: "Marina" }, { label: "Marysville" }, { label: "McAllen" }, { label: "McHenry" }, { label: "Medford" }, { label: "Melbourne" }, {
    label:
        "Memphis"
}, { label: "Merced" }, { label: "Mesa" }, { label: "Mesquite" }, { label: "Miami" }, { label: "Milwaukee" }, { label: "Minneapolis" }, { label: "Miramar" }, { label: "Mission Viejo" }, { label: "Mobile" }, { label: "Modesto" }, { label: "Monroe" }, { label: "Monterey" }, { label: "Montgomery" }, {
    label:
        "Moreno Valley"
}, { label: "Murfreesboro" }, { label: "Murrieta" }, { label: "Muskegon" }, { label: "Myrtle Beach" }, { label: "Naperville" }, { label: "Naples" }, { label: "Nashua" }, { label: "Nashville" }, { label: "New Bedford" }, { label: "New Haven" }, { label: "New London" }, {
    label:
        "New Orleans"
}, { label: "New York" }, { label: "New York City" }, { label: "Newark" }, { label: "Newburgh" }, { label: "Newport News" }, { label: "Norfolk" }, { label: "Normal" }, { label: "Norman" }, { label: "North Charleston" }, { label: "North Las Vegas" }, {
    label:
        "North Port"
}, { label: "Norwalk" }, { label: "Norwich" }, { label: "Oakland" }, { label: "Ocala" }, { label: "Oceanside" }, { label: "Odessa" }, { label: "Ogden" }, { label: "Oklahoma City" }, { label: "Olathe" }, { label: "Olympia" }, { label: "Omaha" }, { label: "Ontario" }, { label: "Orange" }, {
    label:
        "Orem"
}, { label: "Orlando" }, { label: "Overland Park" }, { label: "Oxnard" }, { label: "Palm Bay" }, { label: "Palm Springs" }, { label: "Palmdale" }, { label: "Panama City" }, { label: "Pasadena" }, { label: "Paterson" }, { label: "Pembroke Pines" }, { label: "Pensacola" }, {
    label:
        "Peoria"
}, { label: "Philadelphia" }, { label: "Phoenix" }, { label: "Pittsburgh" }, { label: "Plano" }, { label: "Pomona" }, { label: "Pompano Beach" }, { label: "Port Arthur" }, { label: "Port Orange" }, { label: "Port Saint Lucie" }, { label: "Port St. Lucie" }, {
    label:
        "Portland"
}, { label: "Portsmouth" }, { label: "Poughkeepsie" }, { label: "Providence" }, { label: "Provo" }, { label: "Pueblo" }, { label: "Punta Gorda" }, { label: "Racine" }, { label: "Raleigh" }, { label: "Rancho Cucamonga" }, { label: "Reading" }, { label: "Redding" }, {
    label:
        "Reno"
}, { label: "Richland" }, { label: "Richmond" }, { label: "Richmond County" }, { label: "Riverside" }, { label: "Roanoke" }, { label: "Rochester" }, { label: "Rockford" }, { label: "Roseville" }, { label: "Round Lake Beach" }, { label: "Sacramento" }, { label: "Saginaw" }, {
    label:
        "Saint Louis"
}, { label: "Saint Paul" }, { label: "Saint Petersburg" }, { label: "Salem" }, { label: "Salinas" }, { label: "Salt Lake City" }, { label: "San Antonio" }, { label: "San Bernardino" }, { label: "San Buenaventura" }, { label: "San Diego" }, {
    label:
        "San Francisco"
}, { label: "San Jose" }, { label: "Santa Ana" }, { label: "Santa Barbara" }, { label: "Santa Clara" }, { label: "Santa Clarita" }, { label: "Santa Cruz" }, { label: "Santa Maria" }, { label: "Santa Rosa" }, { label: "Sarasota" }, { label: "Savannah" }, {
    label:
        "Scottsdale"
}, { label: "Scranton" }, { label: "Seaside" }, { label: "Seattle" }, { label: "Sebastian" }, { label: "Shreveport" }, { label: "Simi Valley" }, { label: "Sioux City" }, { label: "Sioux Falls" }, { label: "South Bend" }, { label: "South Lyon" }, {
    label:
        "Spartanburg"
}, { label: "Spokane" }, { label: "Springdale" }, { label: "Springfield" }, { label: "St. Louis" }, { label: "St. Paul" }, { label: "St. Petersburg" }, { label: "Stamford" }, { label: "Sterling Heights" }, { label: "Stockton" }, { label: "Sunnyvale" }, {
    label:
        "Syracuse"
}, { label: "Tacoma" }, { label: "Tallahassee" }, { label: "Tampa" }, { label: "Temecula" }, { label: "Tempe" }, { label: "Thornton" }, { label: "Thousand Oaks" }, { label: "Toledo" }, { label: "Topeka" }, { label: "Torrance" }, { label: "Trenton" }, { label: "Tucson" }, {
    label:
        "Tulsa"
}, { label: "Tuscaloosa" }, { label: "Tyler" }, { label: "Utica" }, { label: "Vallejo" }, { label: "Vancouver" }, { label: "Vero Beach" }, { label: "Victorville" }, { label: "Virginia Beach" }, { label: "Visalia" }, { label: "Waco" }, { label: "Warren" }, { label: "Washington" }, {
    label:
        "Waterbury"
}, { label: "Waterloo" }, { label: "West Covina" }, { label: "West Valley City" }, { label: "Westminster" }, { label: "Wichita" }, { label: "Wilmington" }, { label: "Winston" }, { label: "Winter Haven" }, { label: "Worcester" }, { label: "Yakima" }, {
    label:
        "Yonkers"
}, { label: "York" }, { label: "Youngstown" }];

// function renderSuggestion(suggestion, { query, isHighlighted }) {
//     const matches = match(suggestion.label, query);
//     const parts = parse(suggestion.label, matches);

//     return (
//         <MenuItem selected={isHighlighted} component="div">
//             <div>
//                 {parts.map(part => (
//                     <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
//                         {part.text}
//                     </span>
//                 ))}
//             </div>
//         </MenuItem>
//     );
// }

// function getSuggestions(value) {
//     const inputValue = deburr(value.trim()).toLowerCase();
//     const inputLength = inputValue.length;
//     let count = 0;

//     return inputLength === 0
//         ? []
//         : suggestions.filter(suggestion => {
//             const keep =
//                 count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

//             if (keep) {
//                 count += 1;
//             }

//             return keep;
//         });
// }

// function getSuggestionValue(suggestion) {
//     return suggestion.label;
// }


export default { CityList }
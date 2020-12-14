/*
Original version by SplenectomY
*/
var SplenectomY = SplenectomY || {};

SplenectomY.planets = SplenectomY.planets || {};

var objArray = [];

/*
HERES THE CONFIG. SAVE AND RESTART UPON CHANGING.
When false, this makes the planets rotate counterclockwise.
When true, they will rotate clockwise.
*/
SplenectomY.planets.clockwise = false;

/*
Here you can place any number of planets in your system. 
The syntax is as follows:
["Planet name", Number of days in that planet's year]
*/
var planetsAndYearLengths = [
    ["Anadia", 30],
    ["Coliar", 240],
    ["Toril", 365],
    ["Karpri", 650],
    ["Chandos", 2010],
    ["Glyth", 10800],
    ["Garden", 30660],
    ["HCatha", 60120]
];


function createPlanetAndRotationTime(name, yearLength)
{
    var planetObj = new Object();
    planetObj.name = name;
    planetObj.multiplier = 360/yearLength;
    return planetObj;
}

setPlanetsAndOrbitalPeriods();

function setPlanetsAndOrbitalPeriods()
{
    let i = 0;
    
    while(i < planetsAndYearLengths.length)
    {
        objArray[i] = createPlanetAndRotationTime(planetsAndYearLengths[i][0], planetsAndYearLengths[i][1]);
        i++;
    }
}

function findMultiplierGivenPlanetName(target)
{
    for(let i = 0; i < objArray.length; i++)
    {
        if(objArray[i].name == target)
        {
            return objArray[i].multiplier;
        }
    }
    return -1;
}

on('ready',function() {

    SplenectomY.planets = findObjs({
        _type: "graphic",
    });
});

on("chat:message", function(msg) {

    if(msg.type == "api" && msg.content.indexOf("!protate ") !== -1) 
    {
        var days = (msg.content.replace("!protate ", ""));
        _.each(SplenectomY.planets, function(obj) 
        {
            var mult;
            
            mult = findMultiplierGivenPlanetName(obj.get("name"));
            
            if(mult > 0)
            {
                var angle = obj.get("rotation");
                if (SplenectomY.planets.clockwise == true) {
                    var newangle = angle + (days * mult);
                } else {
                    var newangle = angle - (days * mult);
                };
                obj.set("rotation", newangle);
            }
        });
    };
});

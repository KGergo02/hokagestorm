onload = clearInputs();

function clearInputs()
{
    Hide();
    document.getElementById("dailyQuests").checked = false;
    document.getElementById("worldBoss").checked = false;
    document.getElementById("bossesKilled").value = "0";
    document.getElementById("kills").setAttribute("hidden",true);
    document.getElementById("serverKills").value = "0";
    document.getElementById("arenaRewards").value = "0";
    document.getElementById("income").innerHTML = "0 diamonds";
    document.getElementById("login").checked = false;
    document.getElementById("dailyInstance").value = 0;
    document.getElementById("selectDays").value = "Number";
    setType();
    document.getElementById("days").value = null;
    document.getElementById("clanWars").value = 0;
    document.getElementById("clanRank").value = 0;
    document.getElementById("kageTrials").value = 0;
    document.getElementById("ninjaPursuit").value = 0;
}

function calculateIncome()
{
    var bool = checkValues();

    if(bool)
    {   
        var days = 0;

        Hide();

        if(document.getElementById("days").getAttribute("type") == "number")
        {
            days = Number(document.getElementById("days").value);
        }
        else
        {
            var dateString = String(document.getElementById("days").value);
    
            var chosenDate = new Date(dateString);

            days = Math.floor((chosenDate.getTime() - Date.now()) / 86400000) + 2;
        }
    
        var income = 0;
        
        var cost = 0;

        var amounts = [10,12,14,16,20];

        var loginBonuses = [100,100,100,100,100,150,150];

        var dailyInstances = [10,20,50,90,140];

        if(document.getElementById("dailyQuests").checked)
        {
            income += 70 * days;

            unHide("questsIncome", 70 * days);
        }
    
        if(document.getElementById("worldBoss").checked)
        {
            cost += Number(document.getElementById("worldBossTicket").value * 10) * days;

            unHide("worldCost",Number(document.getElementById("worldBossTicket").value * 10) * days);

            income += document.getElementById("bossesKilled").value * 100 * days;

            unHide("bossesIncome", document.getElementById("bossesKilled").value * 100 * days);
        }
            var serverIncome = 0;

            for(var i = 0; i < document.getElementById("serverKills").value; i++)
            {
                if(i < 4)
                {
                    income += amounts[i] * days;
                    serverIncome += amounts[i] * days;
                }
                else
                {
                    income += 20 * days;
                    serverIncome += 20 * days;
                }
            }

            unHide("serverKillIncome",serverIncome);
            
            var count = days;

            var date = new Date();

            var hv = date.getDay()-1;

            var counter = 0;

            var loginIncome = 0;

            var warIncome = 0;

            var rankIncome = 0;

            var kageIncome = 0;

            while(count != 0)
            {
                if(document.getElementById("login").checked)
                {
                    income += loginBonuses[hv];

                    loginIncome += loginBonuses[hv++];

                    if(hv != 0)
                    {
                        income += 60;

                        loginIncome += 60;
                    }

                    if((hv == 0 || hv == 1 || hv == 3 || hv == 4) && document.getElementById("dailyQuests").checked)
                    {
                        income += 50;

                        loginIncome += 50;
                    }
                }
                else
                {
                    hv++;
                }

                count--;

                if(hv == 7)
                {
                    
                    income += Number(document.getElementById("clanWars").value) + Number(document.getElementById("clanRank").value);

                    warIncome += Number(document.getElementById("clanWars").value);

                    rankIncome += Number(document.getElementById("clanRank").value);
                    
                    hv = 0;
                }

                counter++;
                
                if(counter == 12)
                {
                    income += Number(document.getElementById("kageTrials").value);

                    kageIncome += Number(document.getElementById("kageTrials").value);

                    counter = 0;
                }
            }

        unHide("loginIncome",loginIncome);

        unHide("warIncome",warIncome);

        unHide("clanIncome",rankIncome);

        unHide("kageIncome",kageIncome);

        income += Number(document.getElementById("arenaRewards").value) * days;

        unHide("arenaIncome",Number(document.getElementById("arenaRewards").value) * days);

        var dailyCost = 0;

        if(Number(document.getElementById("dailyInstance").value > 3))
        {
            var count = Number(document.getElementById("dailyInstance").value - 3);

            var di = 0;

            while(count != 0)
            {
                cost += dailyInstances[di] * days;

                dailyCost += dailyInstances[di] * days;

                if(di != 4)
                {
                    di++;
                }

                count--;
            }
        }

        unHide("instanceCost",dailyCost);

        income += Number(document.getElementById("dailyInstance").value) * 50 * days;

        unHide("instanceIncome",Number(document.getElementById("dailyInstance").value) * 50 * days);

        income += Number(document.getElementById("ninjaPursuit").value) * 15 * days;

        unHide("pursuitIncome",Number(document.getElementById("ninjaPursuit").value) * 15 * days);
        
        income -= cost;
    
        if(income >= 1000)
        {
            income = income / 1000;
    
            document.getElementById("income").innerHTML = income + "K diamonds";
        }
        else
        {
            document.getElementById("income").innerHTML = income + " diamonds";
        }
    }
}

function checkValues()
{
    var errors = 0;

    var message = "";

    var numbers = new RegExp("^[0-9]+$");

    if(document.getElementById("days").getAttribute("type") == "number" && (document.getElementById("days").value <= 0 || !numbers.test(document.getElementById("days").value)))
    {
        errors++;

        message += "Days can't be lower than 1\n";
    }

    if(document.getElementById("bossesKilled").value < 0 || document.getElementById("bossesKilled").value > 10 || !numbers.test(document.getElementById("bossesKilled").value))
    {
        errors++;

        if(document.getElementById("bossesKilled").value < 0)
        {
            message += "World boss kills can't be lower than 0\n";
        }
        else
        {
            message += "World boss kills can't be higher than 10\n";
        }
    }

    if(document.getElementById("serverKills").value < 0 || !numbers.test(document.getElementById("serverKills").value))
    {
        errors++;
        
        message += "World boss server kills can't be lower than 0\n";
    }

    if(document.getElementById("arenaRewards").value < 0 || !numbers.test(document.getElementById("arenaRewards").value))
    {
        errors++;

        message += "Arena rewards can't be lower than 0\n";
    }

    if(document.getElementById("dailyInstance").value < 0 || !numbers.test(document.getElementById("dailyInstance").value))
    {
        errors++;

        message += "Daily Instance kills can't be lower than 0";
    }

    if(document.getElementById("ninjaPursuit").value < 0 || document.getElementById("ninjaPursuit").value > 10 || !numbers.test(document.getElementById("ninjaPursuit").value))
    {
        errors++;
        
        if(document.getElementById("ninjaPursuit").value > 10)
        {
            message += "Ninja Pursuit kills can't be higher than 10";
        }
        else
        {
            message += "Ninja Pursuit kills can't be lower than 0";
        }
    }

    if(errors == 0)
    {
        return true;
    }
    else
    {
        alert(message);
        return false;
    }
}

function reveal()
{
    if(document.getElementById("worldBoss").checked)
    {
        document.getElementById("kills").removeAttribute("hidden");
    }
    else
    {
        document.getElementById("kills").setAttribute("hidden",true);
    }
}

function setType()
{
    if(document.getElementById("selectDays").value == "Number")
    {
        document.getElementById("days").setAttribute("type","number");
    }
    else
    {
        var today = new Date();
        today = today.getFullYear() +'-' + ((today.getMonth()+1) < 10 ? ("0" + (today.getMonth()+1)) : today.getMonth()+1) +'-' + today.getDate();
        document.getElementById("days").setAttribute("type","date");
        document.getElementById("days").setAttribute("min",today);
        document.getElementById("days").value = today;
    }
}

function Hide()
{
    document.getElementById("questsIncome").setAttribute("hidden", true);
    document.getElementById("worldCost").setAttribute("hidden", true);
    document.getElementById("bossesIncome").setAttribute("hidden", true);
    document.getElementById("serverKillIncome").setAttribute("hidden", true);
    document.getElementById("arenaIncome").setAttribute("hidden", true);
    document.getElementById("loginIncome").setAttribute("hidden", true);
    document.getElementById("instanceIncome").setAttribute("hidden", true);
    document.getElementById("instanceCost").setAttribute("hidden", true);
    document.getElementById("pursuitIncome").setAttribute("hidden", true);
    document.getElementById("warIncome").setAttribute("hidden", true);
    document.getElementById("clanIncome").setAttribute("hidden", true);
    document.getElementById("kageIncome").setAttribute("hidden", true);
}

function unHide(name,amount)
{
    document.getElementById(name).innerHTML = amount >= 1000 ? amount / 1000 + "K diamonds" : amount +  " diamonds";
    
    if(amount > 0 || name == "warIncome" || name == "clanIncome" || name == "kageIncome")
    {
        document.getElementById(name).removeAttribute("hidden",false);
    }
}

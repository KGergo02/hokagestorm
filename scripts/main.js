onload = clearInputs();

function clearInputs()
{
    document.getElementById("dailyQuests").checked = false;
    document.getElementById("worldBoss").checked = false;
    document.getElementById("days").value = "0";
    document.getElementById("bossesKilled").value = "0";
    document.getElementById("kills").setAttribute("hidden",true);
    document.getElementById("serverKills").value = "0";
    document.getElementById("arenaRewards").value = "0";
    document.getElementById("income").innerHTML = "0 diamonds";
    document.getElementById("login").checked = false;
}

function calculateIncome()
{
    var bool = checkValues();

    if(bool)
    {   
        var days = document.getElementById("days").value;
    
        var income = 0;
        
        var cost = 0;

        var amounts = [10,12,14,16,20];

        var loginBonuses = [100,100,100,100,100,150,150];

        if(document.getElementById("dailyQuests").checked)
        {
            income += 70 * days;
        }
    
        if(document.getElementById("worldBoss").checked)
        {
            cost += 100 * days;

            income += document.getElementById("bossesKilled").value * 100 * days;
        }


            for(var i = 0; i < document.getElementById("serverKills").value; i++)
            {
                if(i < 4)
                {
                    income += amounts[i] * days;
                }
                else
                {
                    income += 20 * days;
                }
            }

            if(document.getElementById("login").checked)
            {
                var count = days;

                var hv = 0;

                while(count != 0)
                {
                    income += loginBonuses[hv++];

                    count--;

                    if(hv == 3 || hv == 6)
                    {
                        income += 100;
                    }

                    if(hv == 7)
                    {
                        hv = 0;
                    }
                }
            }

        income += Number(document.getElementById("arenaRewards").value) * days;
        
        income -= cost;
    
        if(income > 1000)
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

    if(document.getElementById("days").value <= 0)
    {
        errors++;

        message += "Days can't be lower than 1\n";
    }

    if(document.getElementById("bossesKilled").value < 0 || document.getElementById("bossesKilled").value > 10)
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

    if(document.getElementById("serverKills").value == null)
    {
        errors++;
        
        message += "World boss server kills can't be lower than 0\n";
    }

    if(document.getElementById("arenaRewards").value < 0)
    {
        errors++;

        message += "Arena rewards can't be lower than 0\n";
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

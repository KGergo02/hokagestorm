onload = clearInputs();

function clearInputs()
{
    document.getElementById("dailyQuests").checked = false;
    document.getElementById("worldBoss").checked = false;
    document.getElementById("days").value = "0";
    document.getElementById("bossesKilled").value = "0";
    document.getElementById("serverKills").value = "0"; 
}

function calculateIncome()
{
    var bool = checkValues();

    if(bool)
    {   
        var days = document.getElementById("days").value;
    
        var income = 0;
        
        var cost = 0;

        if(document.getElementById("dailyQuests").checked)
        {
            income += 70;
        }
    
        if(document.getElementById("worldBoss").checked)
        {
            cost += 100 * days;

            income += document.getElementById("bossesKilled").value * 100;
        }

        var amounts = [10,12,14,16,20];

            for(var i = 0; i < document.getElementById("serverKills").value; i++)
            {
                if(i < 4)
                {
                    income += amounts[i];
                }
                else
                {
                    income += 20;
                }
            }


        income *= days;
        
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

    if(document.getElementById("days").value <= 0)
    {
        errors++;

        alert("Days can't be lower than 1");
    }

    if(document.getElementById("bossesKilled").value < 0 || document.getElementById("bossesKilled").value > 10)
    {
        errors++;

        if(document.getElementById("bossesKilled").value < 0)
        {
            alert("World boss kills can't be lower than 0");
        }
        else
        {
            alert("World boss kills can't be higher than 10");
        }
    }

    if(document.getElementById("serverKills").value == null)
    {
        errors++;
        
        alert("World boss server kills can't be lower than 0");
    }

    if(errors == 0)
    {
        return true;
    }
    else
    {
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

function calculateIncome()
{
    var income = 0;

    if(document.getElementById("dailyQuests").checked == true)
    {
        income += 70;
    }

    if(document.getElementById("worldBoss").checked == true)
    {
        document.getElementById("kills").removeAttribute("hidden");
    }

    document.getElementById("income").innerHTML = income + " diamonds";
}
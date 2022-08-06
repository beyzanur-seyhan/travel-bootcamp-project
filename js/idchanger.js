function ChangeId() {
    var StandartId = document.getElementById("sign-in-dialog");
    StandartId.id = "NonVis";
}

function ChangeIdBackToNormal() {
    var StandartId = document.getElementById("NonVis");
    StandartId.id = "sign-in-dialog";
}
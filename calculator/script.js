function display(val){
    // document.getElementById('result').value += val;
    const prev_val = $("#result").val();
    $("#result").val(prev_val+val);
    return val;
}

function clearResult(){
    // document.getElementById('result').value = "";
    $("#result").val("");
    return;
}

function solve(){
    // let x = document.getElementById('result').value;
    let x = $("#result").val();
    let y = eval(x);
    document.getElementById('result').value = y;
    return y;
}
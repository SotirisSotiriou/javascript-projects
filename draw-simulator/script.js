let num_of_groups = 2;
let num_of_members = 3;

window.addEventListener('load',initialize);

function initialize(){
    //for group delete buttons
    const allDeleteButtons = document.getElementsByClassName("delete-button");
    for(let i=0; i<allDeleteButtons.length; i++){
        allDeleteButtons[i].addEventListener('click', deleteGroup);
    }

    //for add member button
    const addMemberButton = document.getElementById('add-member-button');
    addMemberButton.addEventListener('click',addMember);

    //for remove member button
    const removeMemberButton = document.getElementById('remove-member-button');
    removeMemberButton.addEventListener('click', removeMember);

    //for add group button
    const addGroupButton = document.getElementById('add-group-btn');
    addGroupButton.addEventListener('click', addGroup);
    
    //for make draw button
    const drawButton = document.getElementById('draw-button');
    drawButton.addEventListener('click', makeDraw);

    //for clear results button
    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', clearResults);

    //for clear input button
    const clearInputsButton = document.getElementById('clear-input-button');
    clearInputsButton.addEventListener('click', clearInput);

    //for autofill button
    const autofillButton = document.getElementById('autofill-button');
    autofillButton.addEventListener('click', autoFill);
}

function addGroup(){
    const drawTablesContainer = document.getElementById("container");
    const addGrouBtn = document.getElementById("add-group-btn");

    num_of_groups++;

    const newGroup = document.createElement('span');

    const drawGroup = document.createElement('div');
    drawGroup.classList.add('draw-group');
    
    const groupHeader = document.createElement('div');
    groupHeader.classList.add('group-header');
    const groupHeaderInput = document.createElement('input');
    groupHeaderInput.classList.add('group-header-input');
    groupHeaderInput.type = 'text';
    groupHeaderInput.value = 'Pot '.concat(num_of_groups);
    groupHeaderInput.placeholder = 'Group Name...';
    groupHeader.appendChild(groupHeaderInput);
    drawGroup.appendChild(groupHeader);

    const deleteGroupButtonContainer = document.createElement('div');
    deleteGroupButtonContainer.classList.add('delete-button-container');
    const deleteGroupButton = document.createElement('button');
    deleteGroupButton.classList.add('delete-button');
    deleteGroupButton.ariaLabel = 'Close alert';
    deleteGroupButton.type = 'button';
    const deleteGroupButtonText = document.createElement('span');
    deleteGroupButtonText.ariaHidden = true;
    deleteGroupButtonText.innerHTML = 'Delete Group';
    deleteGroupButton.appendChild(deleteGroupButtonText);
    deleteGroupButtonContainer.appendChild(deleteGroupButton);
    drawGroup.appendChild(deleteGroupButtonContainer);
    deleteGroupButton.addEventListener('click',deleteGroup);

    for(let i=1; i<=num_of_members; i++){
        const membercontainer = document.createElement('div');
        const memberinput = document.createElement('input');
        membercontainer.classList.add('member-cell');
        memberinput.classList.add('member-input');
        memberinput.type = 'text';
        memberinput.placeholder = 'Member '.concat(i).concat('...');
        membercontainer.appendChild(memberinput);
        drawGroup.appendChild(membercontainer);
    }

    newGroup.appendChild(drawGroup);

    drawTablesContainer.insertBefore(newGroup, addGrouBtn);
}

function deleteGroup(evt){
    if(num_of_groups>2){
        num_of_groups--;
        const deleteGroupButton = evt.currentTarget;
        const deleteButtonContainer = deleteGroupButton.parentElement;
        const groupToDelete = deleteButtonContainer.parentElement;
        groupToDelete.remove();
    }
}


function addMember(){
    num_of_members++;
    const allGroups = document.getElementsByClassName("draw-group");
    for(let i=0; i<allGroups.length; i++){
        const memberCell = document.createElement('div');
        memberCell.classList.add('member-cell');
        const memberInput = document.createElement('input');
        memberInput.type = 'text';
        memberInput.classList.add('member-input');
        memberInput.placeholder = 'Member '.concat(num_of_members).concat('...');
        memberCell.appendChild(memberInput);
        allGroups[i].appendChild(memberCell);
    }
}

function removeMember(){
    if(num_of_members>2){
        num_of_members--;
        const allGroups = document.getElementsByClassName("draw-group");
        for(let i=0; i<allGroups.length; i++){
            const cells = allGroups[i].getElementsByClassName('member-cell');
            cells[cells.length-1].remove();
        }
    }
}


function makeDraw(){
    let ok = checkInput();
    if(ok){
        //read groups
        let groups = [];

        const allGroupElements = document.getElementsByClassName('draw-group');
        for(let i=0; i<allGroupElements.length; i++){
            const memberCells = allGroupElements[i].getElementsByClassName('member-cell');
            groups.push([]);
            for(let j=0; j<memberCells.length; j++){
                const memberInput = memberCells[j].getElementsByClassName('member-input');
                let value = memberInput[0].value;
                groups[i].push(value);
            }
        }
        let results = getDrawResults(groups);
        const oldResults = document.getElementById('result-container');
        if(oldResults != null){
            oldResults.remove();
        }    
        showResults(results);
    }
    else{
        alert('All member inputs must not be empty');
    }
}

function getDrawResults(groups){
    let groupsCopy = [].concat(groups);
    let results = [];
    for(let i=0; i<num_of_members; i++){
        results.push([]);
    }

    for(let j=0; j<num_of_members; j++){
        for(let z=0; z<num_of_groups; z++){
            let index = Math.floor(Math.random() * groupsCopy[z].length);
            results[j].push(groupsCopy[z][index]);
            groupsCopy[z].splice(index,1);
        }
    }

    return results;
}

function showResults(results){
    const pageBody = document.getElementById('page-body');
    const resultDiv = document.createElement('div');
    resultDiv.id = 'result-container';
    for(let i=0; i<results.length; i++){
        const groupTable = document.createElement('table');
        groupTable.classList.add('result-table');
        const headerRow = document.createElement('tr');
        const headerCell = document.createElement('th')
        headerCell.classList.add('group-header');
        headerCell.innerHTML = 'Group '.concat(i+1);
        headerRow.appendChild(headerCell);
        groupTable.appendChild(headerRow);

        for(let j=0; j<results[i].length; j++){
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.innerHTML = results[i][j];
            row.appendChild(cell);
            groupTable.appendChild(row);
        }
        resultDiv.appendChild(groupTable);
    }

    pageBody.appendChild(resultDiv);
}

function checkInput(){
    const allGroupElements = document.getElementsByClassName('draw-group');
    for(let i=0; i<allGroupElements.length; i++){
        const memberCells = allGroupElements[i].getElementsByClassName('member-cell');
        for(let j=0; j<memberCells.length; j++){
            const memberInput = memberCells[j].getElementsByClassName('member-input');
            if(memberInput[0].value == '') return false;
        }
    }
    return true;
}

function clearResults(){
    const results = document.getElementById('result-container');
    if(results != null) results.remove();
}

function clearInput(){
    const inputs = document.getElementsByClassName('member-input');
    for(let i=0; i<inputs.length; i++){
        inputs[i].value = '';
    }
}

function autoFill(){
    const groups = document.getElementsByClassName('draw-group');
    for(let i=0; i<groups.length; i++){
        const members = groups[i].getElementsByClassName('member-input');
        for(let j=0; j<members.length; j++){
            members[j].value = 'Group '.concat(i+1).concat(' Member ').concat(j+1);
        }
    }
}
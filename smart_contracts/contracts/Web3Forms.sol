// SPDX-License-Identifier:MIT

pragma solidity ^0.8.4;

contract Web3Forms {

    uint formsCount;
    address public s_owner;

    modifier onlyOwner{
        require(msg.sender == s_owner);
        _;
    }

    constructor(){
        s_owner= msg.sender;
    }

    struct Form{
        uint formId;
        address creator;
        uint publishedTime;
        string formData;
        uint numberOfResponses;
    }

    Form[] forms;
    mapping(address => Form[]) public numberOfFormsFilled;
    mapping(uint => Form) public formIdentifier;

    function createTheForm(string memory _formData) external onlyOwner{
        Form memory form = Form(
           formsCount ,msg.sender, block.timestamp,_formData,0
        );
        forms.push(form);
        formIdentifier[formsCount] = form;
        formsCount++;
    }


    function fillTheForm(string memory _formData, uint _formId) external {
        Form memory formToFill = formIdentifier[_formId];
        formToFill.formData = _formData;
        formToFill.numberOfResponses += 1;
        numberOfFormsFilled[msg.sender].push(formToFill); 
    }


    function isTheFormFilled(uint _formId) public view returns(bool){
        bool isFormFilled = false;
        Form[] memory formsAlreadyFilled = numberOfFormsFilled[msg.sender];

        for(uint i = 0; i < formsAlreadyFilled.length;i++){
            if(formsAlreadyFilled[i].formId == _formId){
                isFormFilled = true;
            }
        }
        return isFormFilled;
    }


    function myResponses(uint _formId) external view returns(Form memory){
        bool isValidFormId = isTheFormFilled(_formId);
        require(isValidFormId,"You haven't filled this form");
        Form memory requiredResponse;
        Form[] memory formsAlreadyFilled = numberOfFormsFilled[msg.sender];
        formsAlreadyFilled[0].creator;
        for(uint i = 0; i < formsAlreadyFilled.length;i++){
            if(formsAlreadyFilled[i].formId == _formId){
                requiredResponse = formsAlreadyFilled[i];
                break;
            }
        }
        return requiredResponse;
    }

}
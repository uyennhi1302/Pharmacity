*** Settings ***

Resource
...    ../resources/common_keywords.resource

Resource
...    ../resources/page_objects/LoginPage.resource

Variables
...    ../resources/environment.variables.yml

Test Setup
...    Open Browser To Application

Test Teardown
...    Close Browser Session

*** Test Cases ***

Login Success

    Go To
    ...    ${BASE_URL}/login

    Login To System
    ...    ${EMAIL}
    ...    ${PASSWORD}

    Wait Until Page Contains
    ...    Sản phẩm
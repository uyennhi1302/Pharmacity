*** Settings ***

Resource
...    ../resources/common_keywords.resource

Resource
...    ../resources/page_objects/RegisterPage.resource

Variables
...    ../resources/environment.variables.yml

Test Setup
...    Open Browser To Application

Test Teardown
...    Close Browser Session

*** Test Cases ***

Register Success

    Go To
    ...    ${BASE_URL}/register

    Register New User
    ...    Test User
    ...    test123@gmail.com
    ...    123456
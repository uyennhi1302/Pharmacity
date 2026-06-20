*** Settings ***
Library    SeleniumLibrary

Variables    ../locators/RegisterPageLocators.py

*** Keywords ***

Register New User

    [Arguments]
    ...    ${name}
    ...    ${email}
    ...    ${password}

    Input Text
    ...    ${NAME_INPUT}
    ...    ${name}

    Input Text
    ...    ${EMAIL_INPUT}
    ...    ${email}

    Input Text
    ...    ${PASSWORD_INPUT}
    ...    ${password}

    Click Button
    ...    ${REGISTER_BUTTON}
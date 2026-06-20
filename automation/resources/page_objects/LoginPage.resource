*** Settings ***
Library    SeleniumLibrary

Variables    ../locators/LoginPageLocators.py

*** Keywords ***

Input Email
    [Arguments]    ${email}
    Input Text    ${EMAIL_INPUT}    ${email}

Input Password
    [Arguments]    ${password}
    Input Text    ${PASSWORD_INPUT}    ${password}

Click Login
    Click Button    ${LOGIN_BUTTON}

Login To System
    [Arguments]    ${email}    ${password}

    Input Email    ${email}

    Input Password    ${password}

    Click Login
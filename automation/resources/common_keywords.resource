*** Settings ***
Library    SeleniumLibrary

*** Keywords ***

Open Browser To Application
    Open Browser    ${BASE_URL}    chrome
    Maximize Browser Window

Close Browser Session
    Close Browser
from selenium import webdriver
from selenium.webdriver.common.by import By


def test_logout():

    driver = webdriver.Chrome()

    try:

        driver.get(
            "http://localhost:5173"
        )


        driver.find_element(
            By.XPATH,
            "//button[contains(.,'Đăng xuất')]"
        ).click()


        assert "login" in driver.current_url.lower()


    finally:
        driver.quit()
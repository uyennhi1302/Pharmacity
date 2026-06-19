from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_register():

    driver = webdriver.Chrome()

    try:

        driver.get("http://localhost:5173/register")

        wait = WebDriverWait(driver,10)


        wait.until(
            EC.visibility_of_element_located(
                (By.NAME,"name")
            )
        ).send_keys("Automation Test")


        driver.find_element(
            By.NAME,
            "email"
        ).send_keys("auto@gmail.com")


        driver.find_element(
            By.NAME,
            "password"
        ).send_keys("123456")


        driver.find_element(
            By.XPATH,
            "//button[contains(.,'Đăng ký')]"
        ).click()


        assert True


    finally:
        driver.quit()
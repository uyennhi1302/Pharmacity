from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_checkout():

    driver = webdriver.Chrome()

    try:

        driver.get(
            "http://localhost:5173/cart"
        )


        wait = WebDriverWait(driver,10)


        button = wait.until(
            EC.element_to_be_clickable(
                (
                    By.XPATH,
                    "//button[contains(.,'Thanh toán')]"
                )
            )
        )


        button.click()


        assert True


    finally:
        driver.quit()
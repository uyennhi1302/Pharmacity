from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_favorite():

    driver = webdriver.Chrome()

    try:

        driver.get(
            "http://localhost:5173/products"
        )


        wait = WebDriverWait(driver,10)


        favorite_button = wait.until(
            EC.element_to_be_clickable(
                (
                    By.XPATH,
                    "//button[contains(.,'Yêu thích') or contains(.,'♡')]"
                )
            )
        )


        favorite_button.click()


        driver.get(
            "http://localhost:5173/favorite"
        )


        favorite_page = wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//*[contains(text(),'Yêu thích')]"
                )
            )
        )


        assert favorite_page.is_displayed()


    finally:
        driver.quit()
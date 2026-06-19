from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_search():

    driver = webdriver.Chrome()

    try:

        driver.get("http://localhost:5173")

        wait = WebDriverWait(driver,10)


        search = wait.until(
            EC.visibility_of_element_located(
                (By.XPATH,"//input")
            )
        )

        search.send_keys("iphone")


        driver.find_element(
            By.XPATH,
            "//button[contains(.,'Tìm kiếm')]"
        ).click()


        assert "iphone" in driver.page_source.lower()


    finally:
        driver.quit()
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_product():

    driver = webdriver.Chrome()

    try:
        driver.get("http://localhost:5173/products")

        wait = WebDriverWait(driver, 10)

        # chờ danh sách sản phẩm hiển thị
        product = wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//*[contains(text(),'Sản phẩm')]"
                )
            )
        )

        assert product.is_displayed()

    finally:
        driver.quit()
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_cart_add_product():

    driver = webdriver.Chrome()

    try:

        driver.get(
            "http://localhost:5173/products"
        )

        wait = WebDriverWait(driver,10)


        # nút thêm giỏ hàng
        add_cart = wait.until(
            EC.element_to_be_clickable(
                (
                    By.XPATH,
                    "//button[contains(.,'Thêm vào giỏ')]"
                )
            )
        )

        add_cart.click()


        # vào cart
        driver.get(
            "http://localhost:5173/cart"
        )


        cart_item = wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//*[contains(text(),'Giỏ hàng')]"
                )
            )
        )


        assert cart_item.is_displayed()


    finally:
        driver.quit()
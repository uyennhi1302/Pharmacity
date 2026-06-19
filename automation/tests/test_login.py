from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_login():

    driver = webdriver.Chrome()

    try:
        driver.get("http://localhost:5173/login")

        wait = WebDriverWait(driver, 10)

        # Email
        wait.until(
            EC.visibility_of_element_located(
                (By.XPATH, "//input[@type='email']")
            )
        ).send_keys("test@gmail.com")

        # Password
        driver.find_element(
            By.XPATH,
            "//input[@type='password']"
        ).send_keys("123456")

        # Login button
        driver.find_element(
            By.XPATH,
            "//button[contains(.,'Đăng nhập')]"
        ).click()


        assert "login" not in driver.current_url.lower()

    finally:
        driver.quit()
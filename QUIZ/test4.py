from selenium import webdriver

driver = webdriver.Chrome()
driver.get("http://127.0.0.1:3000/q.html")



submit_button = driver.find_element(By.ID, "submitButton")
submit_button.click()

# Verify results page
result_text = driver.find_element(By.ID, "resultText")
assert "Your Score:" in result_text.text, "Result page not displayed correctly!"

print("Quiz Submission Successful!")
driver.quit()

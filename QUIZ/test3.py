from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import time

driver = webdriver.Chrome()
driver.get("http://127.0.0.1:3000/q.html")

# Start Quiz
driver.find_element(By.ID, "startButton").click()
time.sleep(1)  


for i in range(5): 
    options = driver.find_elements(By.CLASS_NAME, "option")
    options[0].click()  
    
    next_button = driver.find_element(By.ID, "nextButton")
    next_button.click()
    time.sleep(1)  

print("All Questions Answered!")
driver.quit()

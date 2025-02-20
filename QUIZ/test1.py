from selenium import webdriver

driver = webdriver.Chrome()  
driver.get("http://127.0.0.1:3000/q.html") 

# Verify the title
expected_title = "Quiz Application"
assert expected_title in driver.title, "Title does not match!"

print("Landing Page Verified!")
driver.quit() 

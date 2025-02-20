from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


driver = webdriver.Chrome()

try:
  
    quiz_url = "http://127.0.0.1:3000/q.html"  
    driver.get(quiz_url)

   
    print("Page Title:", driver.title)
    print("Page URL:", driver.current_url)

    driver.save_screenshot("step1_landing_page.png")


    wait = WebDriverWait(driver, 10)  
    start_button = wait.until(EC.element_to_be_clickable((By.ID, "startQuiz")))  
    start_button.click()
    print("Quiz Started!")

 
    question_count = 5 
    for i in range(1, question_count + 1):
        print(f"Answering Question {i}...")

      
        wait.until(EC.presence_of_element_located((By.ID, f"question-{i}")))  

       
        answer_option = driver.find_element(By.CLASS_NAME, "answer-option")
        answer_option.click()

      
        driver.save_screenshot(f"step{i+1}_answered_q{i}.png")

  
    submit_button = wait.until(EC.element_to_be_clickable((By.ID, "submitQuiz")))  # Adjust ID if needed
    submit_button.click()
    print("Quiz Submitted!")

    wait.until(EC.presence_of_element_located((By.ID, "quizResult")))  # Adjust ID if needed
    print("Results Displayed!")
    driver.save_screenshot("step_final_results.png")

except Exception as e:
    print("Error:", str(e))

finally:
    # Close the browser window
    driver.quit()

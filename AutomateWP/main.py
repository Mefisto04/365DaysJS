from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from datetime import datetime
import schedule

group_name = 'Your Group Name'
message = 'Hello, this is an automated message!'

def send_whatsapp_message():
    driver_path = '/path/to/your/chromedriver'
    driver = webdriver.Chrome(executable_path=driver_path)

    driver.get('https://web.whatsapp.com/')
    time.sleep(10) 

    search_box = driver.find_element('xpath', '//div[@contenteditable="true"][@data-tab="3"]')
    search_box.send_keys(group_name)
    time.sleep(2)
    search_box.send_keys(Keys.RETURN)

    time.sleep(2)

    input_box = driver.find_element('xpath', '//div[@contenteditable="true"][@data-tab="1"]')
    input_box.send_keys(message)
    input_box.send_keys(Keys.RETURN)

    driver.quit()

schedule.every().day.at("15:30").do(send_whatsapp_message)

while True:
    schedule.run_pending()
    time.sleep(1)

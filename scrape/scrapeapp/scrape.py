from selenium import webdriver
import pandas as pd
from selenium.webdriver.common.by import By
import mysql.connector
from . models import Plans
import copy
def main():
    mydb = mysql.connector.connect(
    host="localhost",
    user="abhishek",
    password="db9martin",
    database="scrape"
    )
    mycursor = mydb.cursor()

    driver = webdriver.Chrome('C:\\Users\msi_g\\Downloads\\chromedriver_win32\\chromedriver.exe')

    driver.get('https://www.airtel.in/myplan-infinity/')

    Plan_prices = driver.find_elements(By.CLASS_NAME, 'price')

    # print(Plan_prices.text)

    priceslist=[]

    for prices in range(len(Plan_prices)):
        priceslist.append(Plan_prices[prices].text)

    # print(priceslist)

    Benefits = driver.find_elements(By.CLASS_NAME, 'border-bottom')

    benefitlist=[]

    for benefit in range(len(Benefits)):
        benefitlist.append(Benefits[benefit].text)

    plan_dict={}

    count=0
    temp_list=[]
    temp_list2=""
    for i in range(len(benefitlist)): 
        if count!=4:
            # temp_list2.append(benefitlist[i])
            temp_list2=temp_list2+str(benefitlist[i])+' '
            count+=1
        else:
            temp_list.append(temp_list2)
            temp_list2=""
            # temp_list2.append(benefitlist[i])
            temp_list2=temp_list2+str(benefitlist[i])+' '
            count=1
    temp_list.append(temp_list2)

    for i in range(len(priceslist)):
        plan_dict[priceslist[i]]=temp_list[i]
    
    columns = "plan_name,plan_benefits"
    temp_list1=[]
    temp_list3=[]
    for x in plan_dict.keys():
        temp_list1.append(x)
    for x in plan_dict.values():
        temp_list3.append(x)
    for i in range(len(temp_list1)):
        string1= f"'{str(temp_list1[i])}'"
        string2=f"'{str(temp_list3[i])}'"
        string= string1+','+string2
        sql = "INSERT INTO %s ( %s ) VALUES ( %s );" % ('plans', columns, string)
        mycursor.execute(sql)
        mydb.commit()
    plans=[]
    all_data = Plans.objects.values()
    print(len(all_data))
    for i in range(len(all_data)):
        if i!=5:
            plans.append(all_data[i])
            continue
        break
    sql="TRUNCATE plans;" 
    mycursor.execute(sql)
    mydb.commit()
    return plans
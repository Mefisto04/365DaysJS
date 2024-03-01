# import requests
# def sendWSP(message, apikey,gid=0):
#     url = "https://whin2.p.rapidapi.com/send"
#     headers = {
# 	"content-type": "application/json",
# 	"X-RapidAPI-Key": apikey,
# 	"X-RapidAPI-Host": "whin2.p.rapidapi.com"}

#     try:
#         if gid==0:
#             return requests.request("POST", url, json=message, headers=headers)
#         else: 
#             url = "https://whin2.p.rapidapi.com/send2group"
#             querystring = {"gid":gid}
#             return requests.request("POST", url, json=message, headers=headers, params=querystring) 
#     except requests.ConnectionError:
#         return("Error: Connection Error")

# # Testing Section
# msg1 = {"text":"hello there"}
# # msg2 = {"text":"this is a group message"}

# myapikey = "e426f5927fmsh681a6c957344a19p1e3d39jsn986d8a953f67"
# # mygroup = "your_wsp_group_id"

# sendWSP(msg1,myapikey)
# # sendWSP(msg2, myapikey,mygroup)

import requests

def sendWSP(message, apikey, gid=0):
    url = "https://whin2.p.rapidapi.com/send"
    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": apikey,
        "X-RapidAPI-Host": "whin2.p.rapidapi.com"
    }
    
    try:
        if gid == 0:
            response = requests.post(url, json=message, headers=headers)
        else:
            url = "https://whin2.p.rapidapi.com/send2group"
            querystring = {"gid": gid}
            response = requests.post(url, json=message, headers=headers, params=querystring)

        # Print or log the response
        print(response.text)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            return "Message sent successfully"
        else:
            return f"Error: {response.status_code}, {response.text}"
    
    except requests.ConnectionError as e:
        return f"Error: Connection Error - {e}"

# Testing Section
msg1 = {"text": "hello there"}
msg2 = {"text": "this is a group message"}

myapikey = "e426f5927fmsh681a6c957344a19p1e3d39jsn986d8a953f67"
mygroup = "120363180920711590"

result = sendWSP(msg1, myapikey)
print(result)
sendWSP(msg2, myapikey, mygroup)

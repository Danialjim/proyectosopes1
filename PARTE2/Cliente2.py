import requests

url = 'http://127.0.0.1:8080/'

correct_payload = {'username': 'hello', 'password': 'p4$$w0rd!'}
wrong_payload = {'username': 'hello'}

# Output => OK
r = requests.post(url, data=correct_payload)
print(r.text)

# Output => You need to provide Username & password
r = requests.post(url, data=wrong_payload)
print(r.text)

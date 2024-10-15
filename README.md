Here are sample API calls for testing the system:
Make sure to generate an new bearer token first.

ADD OFFICE
curl -X POST http://localhost:5000/api/offices \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInJvbGUiOiJDZW50cmFsIE9mZmljZSBBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNzIzOTYzODMzLCJleHAiOjE3MjM5Njc0MzN9.iEt0qOzpCbGwpRJX8EcDNuYP4HQ5UsgRiZ0_IZFiHl0" \
-d '{
  "region": "Region IV-B",
  "province": "Palawan",
  "officeType": "Provincial",
  "address": "123 Dagat St, Puerto Princesa City",
  "contactPerson": "Mang Boy",
  "contactNumber": "0917-456-4567",
  "email": "palawan.office@dar.ph"
}'

GET ALL OFFICES
curl -X GET http://localhost:5000/api/offices \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInJvbGUiOiJDZW50cmFsIE9mZmljZSBBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNzIzOTYzODMzLCJleHAiOjE3MjM5Njc0MzN9.iEt0qOzpCbGwpRJX8EcDNuYP4HQ5UsgRiZ0_IZFiHl0"

curl -X GET http://localhost:5000/api/offices/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInJvbGUiOiJDZW50cmFsIE9mZmljZSBBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNzIzOTYzODMzLCJleHAiOjE3MjM5Njc0MzN9.iEt0qOzpCbGwpRJX8EcDNuYP4HQ5UsgRiZ0_IZFiHl0"

curl -X PUT http://localhost:5000/api/offices/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInJvbGUiOiJDZW50cmFsIE9mZmljZSBBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNzIzOTYzODMzLCJleHAiOjE3MjM5Njc0MzN9.iEt0qOzpCbGwpRJX8EcDNuYP4HQ5UsgRiZ0_IZFiHl0" \
-d '{
  "region": "NCR",
  "province": "Metro Manila",
  "officeType": "Central",
  "address": "Updated Address, Quezon City",
  "contactPerson": "Jane Smith",
  "contactNumber": "0917-987-6543",
  "email": "updated.central.office@ncr.ph"
}'

DELETE OFFICE
curl -X DELETE http://localhost:5000/api/offices/12 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInJvbGUiOiJDZW50cmFsIE9mZmljZSBBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNzIzOTYzODMzLCJleHAiOjE3MjM5Njc0MzN9.iEt0qOzpCbGwpRJX8EcDNuYP4HQ5UsgRiZ0_IZFiHl0"


REGISTER
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Smith",
  "username": "johnsmith_admin",
  "email": "admin.central@example.com",
  "password": "password123",
  "userRole": "Central Office Administrator",
  "officeID": 1
}'

LOGIN
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "admin.central@example.com",
  "password": "password123"
}'

curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "janedoe@example.com",
  "password": "password123"
}'
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyMzk2Njk3NSwiZXhwIjoxNzIzOTcwNTc1fQ.Peh4P3XNqATiRFMnYmDkqVv5BJGVqu3j1njDDSjqvjg

CREATE EQUIPMENT
curl -X POST http://localhost:5000/api/equipment \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyMzk2NzE3MywiZXhwIjoxNzIzOTcwNzczfQ.__bltzYQH1n064SEpuLSUGt87hYxhzS13oNaNdteELI" \
-d '{
  "equipment": "Laptop",
  "equipmentDescription": "Dell Inspiron 15",
  "category": "Computers",
  "serialNumber": "SN123456789",
  "propertyNumber": "PN123456",
  "parPtrIcsNumber": "ICS123456",
  "dateReceived": "2024-08-15",
  "currentStatus": "Received",
  "remarks": "New unit received in good condition",
  "maintenanceID": null,
  "issuedTo": null,
  "locationID": 1,
  "purchaseOrderID": "PO123456"
}'

curl -X GET http://localhost:5000/api/equipment \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyNDA4NzYwNywiZXhwIjoxNzI0MDkxMjA3fQ.r8XQ4Ri-_CHyJT3rELPF3Ycv80wJR4ev3qJ1IZY0MLc" \

curl -X GET http://localhost:5000/api/equipment/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyMzk2NzE3MywiZXhwIjoxNzIzOTcwNzczfQ.__bltzYQH1n064SEpuLSUGt87hYxhzS13oNaNdteELI" \

curl -X PUT http://localhost:5000/api/equipment/2 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyNDA4NzYwNywiZXhwIjoxNzI0MDkxMjA3fQ.r8XQ4Ri-_CHyJT3rELPF3Ycv80wJR4ev3qJ1IZY0MLc" \
-d '{
  "equipment": "Updated Laptop",
  "equipmentDescription": "Updated Description",
  "category": "Computers",
  "serialNumber": "SN987654321",
  "propertyNumber": "PN987654",
  "parPtrIcsNumber": "ICS987654",
  "dateReceived": "2024-08-16",
  "currentStatus": "Assigned",
  "remarks": "Assigned to IT department",
  "maintenanceID": null,
  "issuedTo": 9,
  "locationID": 2,
  "purchaseOrderID": "PO987654"
}'

curl -X DELETE http://localhost:5000/api/equipment/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyMzk2NzE3MywiZXhwIjoxNzIzOTcwNzczfQ.__bltzYQH1n064SEpuLSUGt87hYxhzS13oNaNdteELI"


CREATE REQUESTS
curl -X POST http://localhost:5000/api/requests \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyNDA0MjAwOSwiZXhwIjoxNzI0MDQ1NjA5fQ.tzPS5RWG9s_C4BOhLbkwWA6Ipj7hrdQHvrFC3xDJZmc" \
-d '{
  "equipmentID": 2,
  "requestType": "Transfer",
  "fromOfficeID": 1,
  "toOfficeID": 2,
  "requestedFor": null,
  "remarks": "Transfer equipment to regional office"
}'

curl -X GET http://localhost:5000/api/requests \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyNDA0MjAwOSwiZXhwIjoxNzI0MDQ1NjA5fQ.tzPS5RWG9s_C4BOhLbkwWA6Ipj7hrdQHvrFC3xDJZmc"

curl -X GET http://localhost:5000/api/requests/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyNDA0MjAwOSwiZXhwIjoxNzI0MDQ1NjA5fQ.tzPS5RWG9s_C4BOhLbkwWA6Ipj7hrdQHvrFC3xDJZmc"


curl -X PUT http://localhost:5000/api/requests/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyNDA0MjAwOSwiZXhwIjoxNzI0MDQ1NjA5fQ.tzPS5RWG9s_C4BOhLbkwWA6Ipj7hrdQHvrFC3xDJZmc" \
-d '{
  "status": "Approved"
}'

curl -X DELETE http://localhost:5000/api/requests/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInJvbGUiOiJJbnZlbnRvcnkgTWFuYWdlciIsImlhdCI6MTcyNDA0MjAwOSwiZXhwIjoxNzI0MDQ1NjA5fQ.tzPS5RWG9s_C4BOhLbkwWA6Ipj7hrdQHvrFC3xDJZmc"



























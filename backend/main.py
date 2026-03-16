from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()


users = [
    {
        "id": 1,
        "name": "Ali Valiyev",
        "phone": "+998901234567",
        "password": "123456",
        "role": "sender",
        "token": "token_sender_1"
    },
    {
        "id": 2,
        "name": "Bek Olimov",
        "phone": "+998907654321",
        "password": "123456",
        "role": "carrier",
        "token": "token_carrier_2"
    },
    {
        "id": 3,
        "name": "Admin Moderator",
        "phone": "+998339721212",
        "password": "admin123",
        "role": "moderator",
        "token": "token_moderator_3"
    }
]


orders = [
    {
        "id": 1,
        "from": "Tashkent",
        "to": "Samarkand",
        "weight": 1200,
        "price": 1500000,
        "status": "NEW",
        "senderId": 1,
        "createdAt": "2026-03-01"
    },
    {
        "id": 2,
        "from": "Bukhara",
        "to": "Navoi",
        "weight": 800,
        "price": 900000,
        "status": "MODERATION",
        "senderId": 1,
        "createdAt": "2026-03-02"
    },
    {
        "id": 3,
        "from": "Fergana",
        "to": "Tashkent",
        "weight": 500,
        "price": 700000,
        "status": "ACTIVE",
        "senderId": 2,
        "createdAt": "2026-03-03"
    }
]


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    for user in users:
        if user["token"] == token:
            return user

    raise HTTPException(status_code=401, detail="Invalid token")



@app.post("/api/auth/login")
def login(data: dict):

    phone = data.get("phone")
    password = data.get("password")

    for user in users:
        if user["phone"] == phone and user["password"] == password:
            return {
                "token": user["token"],
                "user": {
                    "id": user["id"],
                    "name": user["name"],
                    "role": user["role"]
                }
            }

    raise HTTPException(status_code=401, detail="Invalid credentials")



@app.post("/api/auth/logout")
def logout(user = Depends(get_current_user)):
    return {"message": "Logged out"}



@app.get("/api/orders")
def get_orders(
    page: int = 1,
    limit: int = 10,
    status: str | None = None,
    search: str | None = None,
    user = Depends(get_current_user)
):

    filtered = orders

    if status:
        filtered = [o for o in filtered if o["status"] == status]

    if search:
        filtered = [
            o for o in filtered
            if search.lower() in o["from"].lower()
            or search.lower() in o["to"].lower()
        ]

    start = (page - 1) * limit
    end = start + limit

    return {
        "data": filtered[start:end],
        "total": len(filtered),
        "page": page,
        "limit": limit
    }



@app.get("/api/orders/{id}")
def get_order(id: int, user = Depends(get_current_user)):

    for order in orders:
        if order["id"] == id:
            return order

    raise HTTPException(status_code=404, detail="Order not found")



@app.post("/api/orders")
def create_order(data: dict, user = Depends(get_current_user)):

    new_id = len(orders) + 1

    order = {
        "id": new_id,
        "from": data["from"],
        "to": data["to"],
        "weight": data["weight"],
        "price": data["price"],
        "status": "NEW",
        "senderId": user["id"],
        "createdAt": str(date.today())
    }

    orders.append(order)

    return order



@app.patch("/api/orders/{id}/status")
def change_status(id: int, data: dict, user = Depends(get_current_user)):

    for order in orders:
        if order["id"] == id:
            order["status"] = data["status"]
            return order

    raise HTTPException(status_code=404, detail="Order not found")
## 🔍 Manual API Test Cases

You can test the backend manually using `curl` from terminal or Postman. Below are 14 test cases for key features.

---

### ✅ Test Case 1: Signup (Valid)

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com", "password":"123456"}'
```

✅ **Expected:** Returns a JWT token and user info.

---

### ❌ Test Case 2: Signup (Duplicate Email)

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com", "password":"123456"}'
```

❌ **Expected:** Returns error — `User already exists`.

---

### ✅ Test Case 3: Login (Correct Credentials)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com", "password":"123456"}'
```

✅ **Expected:** Returns a valid JWT token and user info.

---

### ❌ Test Case 4: Login (Wrong Password)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com", "password":"wrongpass"}'
```

❌ **Expected:** Error message — `Invalid credentials`.

---

### ✅ Test Case 5: Access Protected Route (Valid Token)

Replace `YOUR_TOKEN_HERE` with a valid JWT token.

```bash
curl -X GET http://localhost:5000/api/board \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

✅ **Expected:** Returns user's board data.

---

### ❌ Test Case 6: Access Protected Route (No Token)

```bash
curl -X GET http://localhost:5000/api/board
```

❌ **Expected:** `401 Unauthorized` — `Not authorized, no token`.

---

### ✅ Test Case 7: Create Column (Valid Token)

```bash
curl -X POST http://localhost:5000/api/board/column \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title": "To Do"}'
```

✅ **Expected:** Returns newly created column.

---

### ❌ Test Case 8: Create Column (No Token)

```bash
curl -X POST http://localhost:5000/api/board/column \
  -H "Content-Type: application/json" \
  -d '{"title": "To Do"}'
```

❌ **Expected:** `401 Unauthorized` — `Not authorized, no token`.

---

### ✅ Test Case 9: Create Task (Valid Column ID)

Replace `COLUMN_ID_HERE` with a real column ID.

```bash
curl -X POST http://localhost:5000/api/board/task \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title": "Setup MongoDB", "description": "Install and connect MongoDB", "columnId": "COLUMN_ID_HERE"}'
```

✅ **Expected:** Returns created task info.

---

### ❌ Test Case 10: Create Task (Missing `columnId`)

```bash
curl -X POST http://localhost:5000/api/board/task \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title": "Missing Column"}'
```

❌ **Expected:** `400 Bad Request` — missing required field.

---

### ✅ Test Case 11: Update Task (Valid)

Replace `TASK_ID_HERE` and `COLUMN_ID_HERE` with real IDs.

```bash
curl -X PATCH http://localhost:5000/api/board/task/TASK_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Task", "description": "Updated desc", "columnId": "COLUMN_ID_HERE", "order": 1}'
```

✅ **Expected:** Returns updated task info.

---

### ❌ Test Case 12: Update Task (Invalid Task ID)

```bash
curl -X PATCH http://localhost:5000/api/board/task/INVALID_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Task", "description": "Updated desc", "columnId": "COLUMN_ID_HERE", "order": 1}'
```

❌ **Expected:** `500` or `404` — `Cast to ObjectId failed` or not found.

---

### ✅ Test Case 13: Delete Task (Valid ID)

```bash
curl -X DELETE http://localhost:5000/api/board/task/TASK_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

✅ **Expected:** `204 No Content` — task successfully deleted.

---

### ❌ Test Case 14: Delete Task (Invalid ID)

```bash
curl -X DELETE http://localhost:5000/api/board/task/INVALID_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

❌ **Expected:** `500 Internal Server Error` — invalid ObjectId.

---

> 💡 **Pro Tip**: Save your `JWT token`, `columnId`, and `taskId` from earlier responses to test chained requests.

---
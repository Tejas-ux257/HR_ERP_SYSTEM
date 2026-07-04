# Authentication Module

Complete authentication flow for the Smart HR ERP Management System.

## Flows

| Flow | Endpoint | Method | Auth Required |
|------|----------|--------|---------------|
| Register | `/register` | POST | No |
| Login | `/login` | POST | No |
| Logout | `/logout` | POST | Yes (Bearer JWT) |
| Forgot Password | `/forgot-password` | POST | No |
| Reset Password | `/reset-password` | POST | No |

---

## 1. Register

Creates a user account linked to an existing employee.

**Request Body**

```json
{
  "employee_id": 1,
  "username": "john_doe",
  "password": "Secure@123",
  "role": "Employee"
}
```

**Roles:** `Admin`, `HR`, `Employee`

**Success Response (201)**

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "employee_id": 1,
    "username": "john_doe",
    "role": "Employee"
  }
}
```

---

## 2. Login

Authenticates user credentials and returns a JWT token.

**Request Body**

```json
{
  "username": "john_doe",
  "password": "Secure@123"
}
```

**Success Response (200)**

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "employee_id": 1,
      "username": "john_doe",
      "role": "Employee"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 3. Logout

Revokes the active JWT by adding its `jti` to the token blacklist.

**Headers**

```
Authorization: Bearer <token>
```

**Success Response (200)**

```json
{
  "status": "success",
  "message": "Logout successful",
  "data": {
    "logged_out": true
  }
}
```

---

## 4. Forgot Password

Generates a secure reset token and sends it to the user's registered email.

**Request Body (username or email)**

```json
{
  "username": "john_doe"
}
```

```json
{
  "email": "john@example.com"
}
```

**Success Response (200)**

```json
{
  "status": "success",
  "message": "Password reset email sent",
  "data": {
    "message": "Password reset link sent to registered email",
    "username": "john_doe"
  }
}
```

---

## 5. Reset Password

Resets the password using a valid reset token from the email link.

**Request Body**

```json
{
  "token": "reset-token-from-email",
  "password": "NewSecure@456"
}
```

**Success Response (200)**

```json
{
  "status": "success",
  "message": "Password reset successful",
  "data": {
    "password_reset": true
  }
}
```

---

## Authentication Flow Diagram

```
Register → Login → Access Protected APIs
                ↓
              Logout (token blacklisted)

Forgot Password → Email with reset link → Reset Password → Login
```

---

## Security Features

- Passwords hashed with **bcrypt**
- JWT tokens with unique `jti` for revocation
- Token blacklist on logout
- Reset tokens expire after 30 minutes (configurable)
- Reset tokens are single-use
- Role-based payload in JWT (`Admin`, `HR`, `Employee`)

---

## Environment Variables

```env
JWT_SECRET_KEY=your-secret-key
JWT_EXPIRE_MINUTES=60
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=your-email@gmail.com
FRONTEND_RESET_URL=http://localhost:3000/reset-password
RESET_TOKEN_EXPIRE_MINUTES=30
```

---

## Database Tables

- `users` — user accounts
- `token_blacklist` — revoked JWT tokens
- `password_reset_tokens` — active password reset tokens

See `docs/database/schema.sql` for full schema.

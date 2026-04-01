# Vtube API Documentation

## Response Format
For CREATE APIs (status 201) / UPDATE APIs (status 200):
```json
{
  "success": true,
  "message": "string",
  "data": { ... }
}
```

## User / Auth APIs (Base Path: `/`)

### 1. `POST /register`
- **Body**: `{"name": "...", "email": "...", "password": "..."}`
- **Response**: Returns created user entity.

### 2. `POST /login`
- **Body**: `{"email": "...", "password": "..."}`
- **Response**: Returns user entity with JWT token.

### 3. `POST /forgot-password`
- **Body**: `{"email": "..."}`
### 4. `POST /verify-email`
- **Headers**: `Authorization: Bearer <token>`
### 5. `GET /user`
- **Headers**: `Authorization: Bearer <token>`
### 6. `PUT /user`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{"name": "New Name"}`

---

## Video APIs (Base Path: `/videos`)

### 1. `POST /videos/` *(Admin Only)*
- **Body**: `{"title": "...", "description": "...", "video_url": "...", "poster_url": "..."}`
- **Response**: Returns created video entity. Status 201.

### 2. `PUT /videos/{id}` *(Admin Only)*
- **Body**: Complete or partial fields to update video. 200 OK.

### 3. `PATCH /videos/{id}/title` *(Admin Only)*
- **Body**: `{"title": "New Title"}`. Returns updated video.

### 4. `PATCH /videos/{id}/availability` *(Admin Only)*
- **Body**: `{"is_available": false}`. Returns updated video.

### 5. `GET /videos/`
- **Response**: Array of video objects. Status 200.

### 6. `GET /videos/{id}`
- **Response**: Single video object. Status 200.

---

## Comment APIs

### 1. `POST /videos/{id}/comments`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{"content": "Great video!"}`. Status 201.

### 2. `GET /videos/{id}/comments`
- **Response**: Array of comment objects.

---

## Like APIs

### 1. `POST /videos/{id}/react`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{"type": "LIKE"}` (Or "DISLIKE"). Status 201.

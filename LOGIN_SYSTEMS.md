# BlackStone BD - Login Systems

## Two Separate Login Pages

### 1. Customer Login
- **URL:** `/login`
- **Access:** Click user icon in navbar
- **Purpose:** Customers login to track orders, save favorites, etc.

### 2. Admin/Inventory Login  
- **URL:** `/admin/login`
- **Access:** Direct link only (not visible to customers)
- **Purpose:** Admin and inventory management
- **Email:** `admin@blackstonebd.com`
- **Password:** `BlackStone2024!`

---

## How It Works

**Customers:**
1. Click user icon in top navbar
2. Redirected to `/login`
3. Sign in or sign up
4. Redirected to homepage

**Admin/Staff:**
1. Navigate directly to `/admin/login`
2. Enter admin credentials
3. Access admin dashboard at `/admin`

---

## Security Notes

- Admin login is **not linked** from customer-facing pages
- Admin must know the `/admin/login` URL directly
- Different credentials and authentication flow
- Admin password should be changed in production

---

*Both systems use NextAuth but are completely separated*

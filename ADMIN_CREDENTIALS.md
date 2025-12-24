# BlackStone BD - Admin Login Credentials

## Admin Access

**Email:** admin@blackstonebd.com  
**Password:** BlackStone2024!

---

## Important Notes

1. **Privacy & Security:** Admin login now uses email-based authentication instead of username for better privacy
2. **Production:** Change this password immediately in production environment
3. **Environment Variables:** Set admin credentials via environment variables in production
4. **Database:** This is a hardcoded fallback. For production, create admin users in the database

---

## How to Login

1. Go to: `http://localhost:3000/admin/login` (or your production URL + `/admin/login`)
2. Enter the email: `admin@blackstonebd.com`
3. Enter the password: `BlackStone2024!`
4. Click "Login to Admin Panel"

---

## Security Recommendations

- [ ] Change the default password before deploying to production
- [ ] Store admin credentials in environment variables
- [ ] Enable two-factor authentication (future enhancement)
- [ ] Use strong, unique passwords for each admin user
- [ ] Regularly rotate admin passwords
- [ ] Monitor admin login attempts and failures

---

*Last Updated: December 24, 2024*

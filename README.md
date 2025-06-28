# Choice Foods - Admin Approval System

A modern React + TypeScript web application with Supabase backend featuring a complete admin-approval signup flow (yönetici onaylı kayıt akışı) for wholesale customers.

## Features

- **Admin Approval Workflow** (Yönetici Onay İş Akışı)
  - User registration with pending approval status
  - Admin panel for reviewing and approving users
  - Role-based access control (RBAC)
  - Real-time updates with Supabase subscriptions

- **Authentication & Authorization** (Kimlik Doğrulama ve Yetkilendirme)
  - Supabase Auth integration
  - Row Level Security (RLS) policies
  - JWT token-based authentication
  - Admin role management

- **Modern UI/UX** (Modern Kullanıcı Arayüzü)
  - Responsive design with Tailwind CSS
  - shadcn/ui component library
  - Toast notifications
  - Loading states and error handling

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui, Lucide React
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **State Management**: TanStack Query
- **Routing**: React Router Dom

## Quick Start

### 1. Environment Setup (Ortam Kurulumu)

Create `.env.local` file in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://oshjfdiwrbhakvdzdubr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zaGpmZGl3cmJoYWt2ZHpkdWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg2NzEsImV4cCI6MjA2NjcwNDY3MX0.nrFRfxk-puBTUUzU_ij3yiuoKOHQGZHZ6-3Ao2qCsUs
VITE_SUPABASE_SERVICE_KEY=your_service_role_key_here
```

### 2. Database Migration (Veritabanı Migrasyonu)

Run the migration script in Supabase SQL Editor:

```sql
-- Run: supabase/migrations/001_create_profiles_table.sql
-- This creates the profiles table, RLS policies, and triggers
```

### 3. Deploy Edge Function (Edge Function Dağıtımı)

```bash
# Deploy the approve-user function
supabase functions deploy approve-user

# Or manually upload supabase/functions/approve-user/index.ts
```

### 4. Install Dependencies & Run (Bağımlılıkları Yükle ve Çalıştır)

```bash
npm install
npm run dev
```

## Usage Guide (Kullanım Kılavuzu)

### For End Users (Son Kullanıcılar İçin)

1. **Sign Up** (Kayıt Ol)
   - Visit `/login` and toggle to signup mode
   - Fill in full name, email, and password
   - Submit application for admin review

2. **Wait for Approval** (Onay Bekle)
   - Account will be in pending status
   - Admin will review and approve the application
   - You'll receive notification when approved

3. **Login** (Giriş Yap)
   - Once approved, use email/password to login
   - Access will be granted to the main application

### For Administrators (Yöneticiler İçin)

1. **Access Admin Panel** (Yönetici Paneline Erişim)
   - Login with admin credentials
   - Navigate to `/admin` (auto-redirected if admin)

2. **Review Pending Users** (Bekleyen Kullanıcıları İncele)
   - View list of users awaiting approval
   - See user details (name, email, registration date)

3. **Approve Users** (Kullanıcıları Onayla)
   - Click "✅ Onayla" button for each user
   - User will immediately gain access to the system

## Admin Role Setup (Yönetici Rolü Kurulumu)

### Method 1: Using Supabase Dashboard

1. Go to Authentication > Users in Supabase Dashboard
2. Find your user and click on them
3. In the "Raw User Meta Data" section, add:
```json
{
  "role": "admin"
}
```

### Method 2: Using SQL

```sql
-- Update user metadata to include admin role
UPDATE auth.users 
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb 
WHERE email = 'admin@yourcompany.com';
```

### Method 3: Email Domain Fallback

The system also checks for `@admin.com` email addresses as fallback admin detection.

## API Endpoints

### Edge Function: approve-user

**Endpoint**: `POST /functions/v1/approve-user`

**Headers**:
```
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Body**:
```json
{
  "uid": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Response** (Success):
```json
{
  "message": "User approved successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "full_name": "John Doe",
    "email": "john@example.com",
    "approved": true,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:35:15.123Z"
  }
}
```

## Testing (Test Etme)

### SQL Tests

```bash
# Run SQL tests in Supabase SQL Editor
cat tests/admin-approval.test.sql
```

### Edge Function Tests

```bash
# Make script executable
chmod +x tests/test-edge-function.sh

# Run tests with user ID and admin JWT token
./tests/test-edge-function.sh <user_id> <admin_jwt_token>
```

### CLI Tool Tests

```bash
# Build and run Go CLI tool
cd tools/
go build -o admin-cli admin-cli.go

# List pending users
./admin-cli -list

# Approve a user
./admin-cli -u 123e4567-e89b-12d3-a456-426614174000
```

## Security Features (Güvenlik Özellikleri)

1. **Row Level Security (RLS)**
   - Users can only access their own data when approved
   - Admins can access all user data
   - Unapproved users cannot read their own profiles

2. **JWT Authentication**
   - All API calls require valid JWT tokens
   - Admin operations require admin role verification

3. **Service Role Protection**
   - Edge Functions use service role key securely
   - Direct database access restricted by RLS

## Troubleshooting (Sorun Giderme)

### Common Issues

1. **"Connection string is missing" Error**
   - Ensure `.env.local` file exists with correct Supabase credentials
   - Restart development server after creating `.env.local`

2. **Admin Panel Access Denied**
   - Verify user has admin role in metadata
   - Check email domain fallback (@admin.com)

3. **Edge Function Not Working**
   - Ensure function is deployed to Supabase
   - Check function logs in Supabase Dashboard

4. **RLS Policy Errors**
   - Run migration script to create proper policies
   - Verify user authentication status

## Conventional Commits (Konvansiyonel Commit Mesajları)

```bash
feat(auth): add profiles table with approved flag
chore(rules): enable RLS policies for profiles  
feat(func): implement approve_user Edge Function
feat(ui): add /admin panel in React
test(ci): add tests for migration, function & CLI
docs(readme): add admin approval system documentation
```

## Contributing (Katkıda Bulunma)

1. Fork the repository
2. Create a feature branch
3. Follow conventional commit format
4. Add tests for new features
5. Submit pull request

## License

MIT License - see [LICENSE](LICENSE) file for details

---

## Contact

For support or questions about the admin approval system:
- Email: support@choicefoods.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

**Built with ❤️ for Choice Foods wholesale customers**

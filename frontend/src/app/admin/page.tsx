import { redirect } from 'next/navigation';

function AdminPage() {
  redirect('/admin/login');
}

export default AdminPage;
import type { APIRoute } from 'astro';

const ADMIN_PASSWORD = '1567676756'; // 你可以修改这个密码

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get('password');

  if (password === ADMIN_PASSWORD) {
    // 设置登录 cookie，有效期 7 天
    cookies.set('admin_token', 'authenticated', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    return redirect('/admin/dashboard');
  }

  return redirect('/admin/login?error=1');
};

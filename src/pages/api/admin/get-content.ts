import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async ({ cookies }) => {
  // 验证登录
  const adminToken = cookies.get('admin_token');
  if (!adminToken || adminToken.value !== 'authenticated') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const contentPath = path.join(process.cwd(), 'src', 'content.json');
    const content = await fs.readFile(contentPath, 'utf-8');
    return new Response(content, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Read error:', error);
    return new Response(JSON.stringify({ error: 'Read failed' }), { status: 500 });
  }
};

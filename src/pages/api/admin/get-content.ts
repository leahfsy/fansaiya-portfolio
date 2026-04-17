import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const GET: APIRoute = async ({ cookies }) => {
  // 验证登录
  const adminToken = cookies.get('admin_token');
  if (!adminToken || adminToken.value !== 'authenticated') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    // 尝试从 Netlify Blobs 读取
    const store = getStore('content');
    let content = await store.get('works', { type: 'json' });

    // 如果 Blobs 中没有数据，从本地 JSON 初始化
    if (!content) {
      const fs = await import('fs/promises');
      const path = await import('path');
      const contentPath = path.join(process.cwd(), 'src', 'content.json');
      const contentStr = await fs.readFile(contentPath, 'utf-8');
      content = JSON.parse(contentStr);

      // 保存到 Blobs
      await store.setJSON('works', content);
    }

    return new Response(JSON.stringify(content), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Read error:', error);
    return new Response(JSON.stringify({ error: 'Read failed' }), { status: 500 });
  }
};

import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const POST: APIRoute = async ({ request, cookies }) => {
  // 验证登录
  const adminToken = cookies.get('admin_token');
  if (!adminToken || adminToken.value !== 'authenticated') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { workIndex, type, imageIndex } = await request.json();

    // 从 Netlify Blobs 读取数据
    const store = getStore('content');
    const content = await store.get('works', { type: 'json' });

    if (!content || !content.works || !content.works[workIndex]) {
      return new Response(JSON.stringify({ error: 'Work not found' }), { status: 404 });
    }

    if (type === 'cover') {
      // 删除封面图（设置为默认图片）
      content.works[workIndex].coverImage = '/placeholder.jpg';
      content.works[workIndex].thumbnail = '/placeholder.jpg';
    } else if (type === 'image') {
      // 删除作品图
      if (content.works[workIndex].images && content.works[workIndex].images[imageIndex]) {
        content.works[workIndex].images.splice(imageIndex, 1);
      }
    }

    // 保存到 Netlify Blobs
    await store.setJSON('works', content);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return new Response(JSON.stringify({ error: 'Delete failed', message: error.message }), { status: 500 });
  }
};

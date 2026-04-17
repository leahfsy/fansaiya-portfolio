import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const POST: APIRoute = async ({ request, cookies }) => {
  // 验证登录
  const adminToken = cookies.get('admin_token');
  if (!adminToken || adminToken.value !== 'authenticated') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { workIndex, type, imageIndex } = await request.json();

    // 读取 content.json
    const contentPath = path.join(process.cwd(), 'src', 'content.json');
    const contentStr = await fs.readFile(contentPath, 'utf-8');
    const content = JSON.parse(contentStr);

    if (type === 'cover') {
      // 删除封面图（设置为默认图片）
      content.works[workIndex].coverImage = '/placeholder.jpg';
      content.works[workIndex].thumbnail = '/placeholder.jpg';
    } else if (type === 'image') {
      // 删除作品图
      content.works[workIndex].images.splice(imageIndex, 1);
    }

    // 保存
    await fs.writeFile(contentPath, JSON.stringify(content, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return new Response(JSON.stringify({ error: 'Delete failed' }), { status: 500 });
  }
};

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
    const { index, title, shortDescription } = await request.json();

    // 读取现有内容
    const contentPath = path.join(process.cwd(), 'src', 'content.json');
    const contentStr = await fs.readFile(contentPath, 'utf-8');
    const content = JSON.parse(contentStr);

    // 更新作品文字
    if (title) content.works[index].title = title;
    if (shortDescription) content.works[index].shortDescription = shortDescription;

    // 保存
    await fs.writeFile(contentPath, JSON.stringify(content, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Save error:', error);
    return new Response(JSON.stringify({ error: 'Save failed' }), { status: 500 });
  }
};

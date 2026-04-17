import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const POST: APIRoute = async ({ request, cookies }) => {
  // 验证登录
  const adminToken = cookies.get('admin_token');
  if (!adminToken || adminToken.value !== 'authenticated') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const workIndex = parseInt(formData.get('workIndex') as string);

    if (!files.length) {
      return new Response(JSON.stringify({ error: 'No files provided' }), { status: 400 });
    }

    // 从 Netlify Blobs 读取数据
    const store = getStore('content');
    const content = await store.get('works', { type: 'json' });

    if (!content || !content.works || !content.works[workIndex]) {
      return new Response(JSON.stringify({ error: 'Work not found' }), { status: 404 });
    }

    const imageUrls = [];

    // 将图片转换为 base64
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const imageUrl = `data:${file.type};base64,${base64}`;
      imageUrls.push(imageUrl);
    }

    // 添加到作品图片列表
    content.works[workIndex].images = content.works[workIndex].images || [];
    content.works[workIndex].images.push(...imageUrls);

    // 保存到 Netlify Blobs
    await store.setJSON('works', content);

    return new Response(JSON.stringify({ success: true, urls: imageUrls }), { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Upload failed', message: error.message }), { status: 500 });
  }
};

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
    const file = formData.get('file') as File;
    const workIndex = parseInt(formData.get('workIndex') as string);
    const type = formData.get('type') as string;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
    }

    // 将图片转换为 base64 或上传到图床
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const imageUrl = `data:${file.type};base64,${base64}`;

    // 从 Netlify Blobs 读取数据
    const store = getStore('content');
    const content = await store.get('works', { type: 'json' });

    if (!content || !content.works || !content.works[workIndex]) {
      return new Response(JSON.stringify({ error: 'Work not found' }), { status: 404 });
    }

    if (type === 'cover') {
      content.works[workIndex].coverImage = imageUrl;
      content.works[workIndex].thumbnail = imageUrl;
    }

    // 保存到 Netlify Blobs
    await store.setJSON('works', content);

    return new Response(JSON.stringify({ success: true, url: imageUrl }), { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Upload failed', message: error.message }), { status: 500 });
  }
};

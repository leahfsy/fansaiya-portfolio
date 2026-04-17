import type { APIRoute } from 'astro';

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

    const imageUrls = [];

    // 将图片转换为 base64
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const imageUrl = `data:${file.type};base64,${base64}`;
      imageUrls.push(imageUrl);
    }

    let content;

    // 生产环境：使用 Netlify Blobs
    if (import.meta.env.PROD) {
      try {
        const { getStore } = await import('@netlify/blobs');
        const store = getStore('content');
        content = await store.get('works', { type: 'json' });

        if (!content || !content.works || !content.works[workIndex]) {
          return new Response(JSON.stringify({ error: 'Work not found' }), { status: 404 });
        }

        content.works[workIndex].images = content.works[workIndex].images || [];
        content.works[workIndex].images.push(...imageUrls);

        await store.setJSON('works', content);
        return new Response(JSON.stringify({ success: true, urls: imageUrls }), { status: 200 });
      } catch (blobError) {
        console.error('Blobs error:', blobError);
        return new Response(JSON.stringify({ error: 'Blobs not available' }), { status: 500 });
      }
    }

    // 本地开发环境：直接修改文件
    const fs = await import('fs/promises');
    const path = await import('path');
    const contentPath = path.join(process.cwd(), 'src', 'content.json');
    const contentStr = await fs.readFile(contentPath, 'utf-8');
    content = JSON.parse(contentStr);

    if (!content.works || !content.works[workIndex]) {
      return new Response(JSON.stringify({ error: 'Work not found' }), { status: 404 });
    }

    content.works[workIndex].images = content.works[workIndex].images || [];
    content.works[workIndex].images.push(...imageUrls);

    await fs.writeFile(contentPath, JSON.stringify(content, null, 2));
    return new Response(JSON.stringify({ success: true, urls: imageUrls }), { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Upload failed', message: error.message }), { status: 500 });
  }
};

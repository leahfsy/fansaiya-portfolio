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
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const workIndex = parseInt(formData.get('workIndex') as string);

    if (!files.length) {
      return new Response(JSON.stringify({ error: 'No files provided' }), { status: 400 });
    }

    // 保存图片
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'works');
    await fs.mkdir(uploadDir, { recursive: true });

    const imageUrls = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `work-${workIndex}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}${path.extname(file.name)}`;
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);
      imageUrls.push(`/uploads/works/${filename}`);
    }

    // 更新 content.json
    const contentPath = path.join(process.cwd(), 'src', 'content.json');
    const contentStr = await fs.readFile(contentPath, 'utf-8');
    const content = JSON.parse(contentStr);

    // 添加到作品图片列表
    content.works[workIndex].images = content.works[workIndex].images || [];
    content.works[workIndex].images.push(...imageUrls);

    await fs.writeFile(contentPath, JSON.stringify(content, null, 2));

    return new Response(JSON.stringify({ success: true, urls: imageUrls }), { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 });
  }
};

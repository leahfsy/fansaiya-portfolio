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
    const file = formData.get('file') as File;
    const workIndex = parseInt(formData.get('workIndex') as string);
    const type = formData.get('type') as string;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
    }

    // 保存图片
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'works');
    await fs.mkdir(uploadDir, { recursive: true });

    const filename = `work-${workIndex}-${type}-${Date.now()}${path.extname(file.name)}`;
    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);

    // 更新 content.json
    const contentPath = path.join(process.cwd(), 'src', 'content.json');
    const contentStr = await fs.readFile(contentPath, 'utf-8');
    const content = JSON.parse(contentStr);

    const imageUrl = `/uploads/works/${filename}`;

    if (type === 'cover') {
      content.works[workIndex].coverImage = imageUrl;
      content.works[workIndex].thumbnail = imageUrl;
    }

    await fs.writeFile(contentPath, JSON.stringify(content, null, 2));

    return new Response(JSON.stringify({ success: true, url: imageUrl }), { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 });
  }
};

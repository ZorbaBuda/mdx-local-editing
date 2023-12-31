import { upsertPost, getPost } from '@/app/admin-backend';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const req = await request.json();
    console.log(req.post, '❤', req?.sha)
    const resp = await upsertPost(req.slug, req.post, req?.sha);
    // revalidatePath(`/edit_posts/${req.slug}`);
    // revalidatePath(`/edit_posts`);
    return NextResponse.json(resp.data);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const resp = await getPost(slug!);
    let buff = Buffer.from(resp.content, 'base64');
    let text = buff.toString('utf-8');

    revalidatePath(`/edit_posts/${slug}`);
    revalidatePath(`/edit_posts`);

    return NextResponse.json({
        content: text,
        path: resp.path,
        sha: resp.sha
    });
}
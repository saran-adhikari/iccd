import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const docs = await prisma.legalDocument.findMany({
            orderBy: { title: 'asc' }
        })
        return NextResponse.json(docs)
    } catch (error) {
        console.error('Error fetching legal documents:', error)
        return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
    }
}

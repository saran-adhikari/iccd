import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'admin@iccd.com' },
    })

    if (!user) {
        console.log('User not found')
        return
    }

    const isMatch = await compare('admin123', user.password)
    console.log('Password "admin123" matches:', isMatch)

    const isMatchAdmin = await compare('admin', user.password)
    console.log('Password "admin" matches:', isMatchAdmin)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())

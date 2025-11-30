'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getGalleryImages() {
    try {
        const images = await prisma.galleryImage.findMany({
            orderBy: {
                order: 'asc',
            },
        })
        return { success: true, data: images }
    } catch (error) {
        console.error("Error fetching gallery images:", error)
        return { success: false, error: "Failed to fetch images" }
    }
}

export async function addGalleryImage(data: { imageUrl: string; alt: string }) {
    try {
        // Get the current highest order to append to the end
        const lastImage = await prisma.galleryImage.findFirst({
            orderBy: { order: 'desc' },
        })
        const newOrder = (lastImage?.order ?? -1) + 1

        const image = await prisma.galleryImage.create({
            data: {
                imageUrl: data.imageUrl,
                alt: data.alt,
                order: newOrder,
            },
        })
        revalidatePath("/about")
        revalidatePath("/admin/gallery")
        return { success: true, data: image }
    } catch (error) {
        console.error("Error adding gallery image:", error)
        return { success: false, error: "Failed to add image" }
    }
}

export async function deleteGalleryImage(id: string) {
    try {
        await prisma.galleryImage.delete({
            where: { id },
        })
        revalidatePath("/about")
        revalidatePath("/admin/gallery")
        return { success: true }
    } catch (error) {
        console.error("Error deleting gallery image:", error)
        return { success: false, error: "Failed to delete image" }
    }
}

export async function updateGalleryOrder(items: { id: string; order: number }[]) {
    try {
        // Transaction to update all orders
        await prisma.$transaction(
            items.map((item) =>
                prisma.galleryImage.update({
                    where: { id: item.id },
                    data: { order: item.order },
                })
            )
        )
        revalidatePath("/about")
        revalidatePath("/admin/gallery")
        return { success: true }
    } catch (error) {
        console.error("Error updating gallery order:", error)
        return { success: false, error: "Failed to update order" }
    }
}

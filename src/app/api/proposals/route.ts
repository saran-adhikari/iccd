import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
    service: "gmail", // Or use host/port from env
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // 1. Save to Database
        const proposal = await prisma.proposalRequest.create({
            data: {
                institutionName: body.institutionName,
                size: body.size,
                department: body.department,
                location: body.location,
                country: body.country,
                programs: body.programs,
                programDetails: body.programDetails,
                timing: body.timing,
                format: body.format,
                duration: body.duration,
                goals: body.goals,
                budget: body.budget || 0,
                name: body.name,
                email: body.email,
                phone: body.phone,
                position: body.position,
                // proposalType removed from form, defaulting or leaving null
                status: "received", // Initial status
            },
        })

        // 2. Send Automated Email
        // Only attempt if credentials exist to avoid crashing in dev without env vars
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: body.email,
                    subject: "We received your training proposal request - ICCD",
                    html: `
                        <div style="font-family: sans-serif; color: #333;">
                            <h2>Thank you for your request, ${body.name}!</h2>
                            <p>We have received your proposal request for <strong>${body.institutionName}</strong>.</p>
                            <p>Our team will review your requirements and get back to you within <strong>2 business days</strong>.</p>
                            <br/>
                            <h3>Request Summary:</h3>
                            <ul>
                                <li><strong>Programs:</strong> ${body.programs.join(", ")}</li>
                                <li><strong>Timing:</strong> ${body.timing}</li>
                                <li><strong>Format:</strong> ${body.format}</li>
                            </ul>
                            <br/>
                            <p>Best regards,<br/>The ICCD Team</p>
                        </div>
                    `,
                })
            } catch (emailError) {
                console.error("Failed to send email:", emailError)
                // Don't fail the request if email fails, just log it
            }
        }

        return NextResponse.json(proposal)
    } catch (error) {
        console.error("Error processing proposal:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

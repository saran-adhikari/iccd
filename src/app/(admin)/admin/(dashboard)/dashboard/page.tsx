"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app-components/ui/card"
import { BookOpen, MessageSquare, FileText, Mail, Users, BarChart, FileCheck, TrendingUp, Image as ImageIcon } from "lucide-react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useEffect, useState } from "react"

interface DashboardStats {
    programCount: number
    testimonialCount: number
    proposalCount: number
    contactCount: number
    partnerCount: number
    impactMetricCount: number
    legalDocCount: number
    recentProposals: number
    recentContacts: number
    galleryCount: number
}

interface Activity {
    type: 'program' | 'testimonial' | 'partner' | 'impact' | 'legal' | 'gallery'
    action: 'created' | 'updated'
    title: string
    timestamp: string
}

interface ChartData {
    name: string
    value: number
    [key: string]: string | number   // add index signature
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6384']

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        programCount: 0,
        testimonialCount: 0,
        proposalCount: 0,
        contactCount: 0,
        partnerCount: 0,
        impactMetricCount: 0,
        legalDocCount: 0,
        recentProposals: 0,
        recentContacts: 0,
        galleryCount: 0
    })
    const [activities, setActivities] = useState<Activity[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            fetch('/api/dashboard/stats').then(res => res.json()),
            fetch('/api/dashboard/activities').then(res => res.json())
        ])
            .then(([statsData, activitiesData]) => {
                setStats(statsData)
                setActivities(activitiesData)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const getTimeAgo = (timestamp: string) => {
        const now = new Date()
        const past = new Date(timestamp)
        const diffMs = now.getTime() - past.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
        if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    }

    const getActivityIcon = (type: Activity['type']) => {
        switch (type) {
            case 'program': return { icon: BookOpen, color: 'primary' }
            case 'testimonial': return { icon: MessageSquare, color: 'secondary' }
            case 'partner': return { icon: Users, color: 'green-500' }
            case 'impact': return { icon: BarChart, color: 'orange-500' }
            case 'legal': return { icon: FileCheck, color: 'blue-500' }
            case 'gallery': return { icon: ImageIcon, color: 'pink-500' }
        }
    }

    const getActivityText = (activity: Activity) => {
        const actionText = activity.action === 'created' ? 'Created' : 'Updated'
        const typeText = activity.type === 'impact' ? 'impact metric' : activity.type === 'gallery' ? 'gallery image' : activity.type
        return {
            action: `${actionText} ${typeText}`,
            description: activity.title
        }
    }

    const contentDistribution: ChartData[] = [
        { name: 'Programs', value: stats.programCount },
        { name: 'Testimonials', value: stats.testimonialCount },
        { name: 'Partners', value: stats.partnerCount },
        { name: 'Impact Metrics', value: stats.impactMetricCount },
        { name: 'Legal Docs', value: stats.legalDocCount },
        { name: 'Gallery', value: stats.galleryCount },
    ]

    const submissionsData: ChartData[] = [
        { name: 'Proposals', value: stats.proposalCount },
        { name: 'Contact Messages', value: stats.contactCount },
    ]

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of contents and submissions.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:bg-secondary/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.programCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Active training programs</p>
                    </CardContent>
                </Card>
                <Card className="hover:bg-secondary/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.testimonialCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Client reviews</p>
                    </CardContent>
                </Card>
                <Card className="hover:bg-secondary/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Proposals</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.proposalCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Pending requests</p>
                    </CardContent>
                </Card>
                <Card className="hover:bg-secondary/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.contactCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Inquiries received</p>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="hover:bg-secondary/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Partners</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.partnerCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Trusted organizations</p>
                    </CardContent>
                </Card>
                <Card className="hover:bg-secondary/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Impact Metrics</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.impactMetricCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Performance indicators</p>
                    </CardContent>
                </Card>
                <Card className="hover:bg-secondary/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Legal Documents</CardTitle>
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.legalDocCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Policy documents</p>
                    </CardContent>
                </Card>
                <Card className="hover:bg-secondary/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.galleryCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Images in gallery</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Content Distribution Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Content Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={contentDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {contentDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Submissions Bar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            User Submissions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsBarChart data={submissionsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Admin Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Recent Admin Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activities.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>No recent activity</p>
                            </div>
                        ) : (
                            activities.map((activity, index) => {
                                const { icon: Icon, color } = getActivityIcon(activity.type)
                                const { action, description } = getActivityText(activity)

                                return (
                                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className={`p-2 rounded-full bg-${color}/10`}>
                                            <Icon className={`h-4 w-4 text-${color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{action}</p>
                                            <p className="text-xs text-muted-foreground">{description}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{getTimeAgo(activity.timestamp)}</p>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle2, Loader2, Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/app-components/ui/button"
import { Input } from "@/app-components/ui/input"
import { Textarea } from "@/app-components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app-components/ui/select"

// Keep the same exported name
export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [org, setOrg] = useState("")
  const [role, setRole] = useState<string | undefined>()
  const [interest, setInterest] = useState<string | undefined>()
  const [message, setMessage] = useState("")

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 1 &&
      /.+@.+\..+/.test(email) &&
      org.trim().length > 1 &&
      (role?.length ?? 0) > 0 &&
      (interest?.length ?? 0) > 0 &&
      message.trim().length >= 20
    )
  }, [name, email, org, role, interest, message])

  const validate = () => {
    const next: Record<string, string> = {}
    if (name.trim().length <= 1) next.name = "Please enter your full name."
    if (!/.+@.+\..+/.test(email)) next.email = "Enter a valid email address."
    if (org.trim().length <= 1) next.org = "Your organisation helps us tailor the reply."
    if (!role) next.role = "Select your role."
    if (!interest) next.interest = "Pick a training interest."
    if (message.trim().length < 20) next.message = "Message should be at least 20 characters."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsSubmitted(true)
    }, 1100)
  }

  return (
    <section className="relative py-14 md:py-20 bg-primary/5">
      <div className="max-w-6xl mx-auto w-[80%] px-4 sm:px-6 lg:px-6">
        {/* Outer white card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-background shadow-xl border border-border/40 p-6 sm:p-4 md:p-10 mx-auto"
        >
          {/* Two columns but with a NARROWER right side to make left pop */}
          <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
            {/* LEFT — popup-like info card */}
            <div className="relative">
              
              <div
                className={[
                  "relative rounded-2xl bg-primary text-primary-foreground",
                  "p-7 sm:p-8 md:p-10 shadow-2xl",
                  "lg:-ml-24 lg:mt-4 lg:mb-2 z-10"
                ].join(" ")}
              >
                {/* Flex to vertically justify content nicely */}
                <div className="flex  flex-col justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
                    <ul className="space-y-6 text-sm leading-6">
                      <li className="flex gap-3">
                        <MapPin className="h-5 w-5 mt-0.5 opacity-90" />
                        <div>
                          <p>123 Financial District</p>
                          <p>London, UK EC2V 8RF</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Mail className="h-5 w-5 mt-0.5 opacity-90" />
                        <div>
                          <p>iccdnepal@gmail.com</p>
                          {/* <p>training@iccd.org</p> */}
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Phone className="h-5 w-5 mt-0.5 opacity-90" />
                        <div>
                          <p>+1 (555) 123-4567</p>
                          <p>+44 20 7123 4567</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Clock className="h-5 w-5 mt-0.5 opacity-90" />
                        <div>
                          <p>Mon–Fri: 9:00–18:00 (NPT)</p>
                        </div>
                      </li>
                    </ul>
                    
                  </div>
                  

                  
                </div>
              </div>
            </div>

            {/* RIGHT — compact form so left looks like a popup */}
            <div className="pt-1">
              <div className="max-w-xl ">
                <h2 className="text-3xl font-semibold text-primary mb-2">Get in Touch</h2>
                <p className="text-sm text-muted-foreground mb-7">
                  Feel free to drop us a line below!
                </p>
              </div>

              {!isSubmitted ? (
                <form className="space-y-4 max-w-xl" onSubmit={handleSubmit} noValidate>
                  <Input
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11"
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}

                  <Input
                    type="email"
                    placeholder="Your Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}

                  <Input
                    placeholder="Organisation *"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    className="h-11"
                  />
                  {errors.org && <p className="text-xs text-destructive">{errors.org}</p>}

                  <div className="grid sm:grid-cols-4 gap-4">
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Your Role *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                        <SelectItem value="risk-manager">Risk Manager</SelectItem>
                        <SelectItem value="senior-management">Senior Management</SelectItem>
                        <SelectItem value="hr-learning">HR / L&D</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={interest} onValueChange={setInterest}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Training Interest *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aml">AML & Compliance</SelectItem>
                        <SelectItem value="esg">ESG & Sustainability</SelectItem>
                        <SelectItem value="risk">Risk Management</SelectItem>
                        <SelectItem value="service">Customer Service</SelectItem>
                        <SelectItem value="leadership">Leadership & Soft Skills</SelectItem>
                        <SelectItem value="custom">Custom Program</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
                  {errors.interest && <p className="text-xs text-destructive">{errors.interest}</p>}

                  <Textarea
                    rows={5}
                    placeholder="Type your message here… (min 20 chars) *"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[160px]"
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}

                  <div className="flex justify-center pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading || !canSubmit}
                      className="px-10 rounded-full bg-primary text-white hover:bg-primary/90 shadow-md cursor-pointer"
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="mr-0 h-5 w-5" />
                      )}
                      {loading ? "Sending…" : "SEND"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-6 py-8 max-w-xl">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary">Thanks, we got your message!</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Our team will get back to you within 1 business day. For urgent matters, email{" "}
                    <a href="mailto:training@iccd.org" className="underline underline-offset-4">
                      training@iccd.org
                    </a>.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Countdown timer - set to 30 days from now
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tight text-balance">
              GlobeTee Shop
              <span className="block text-primary">Is Coming</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              We're crafting an extraordinary collection of premium t-shirts that will transform your wardrobe. Get
              ready for unique designs and unmatched quality.
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="grid grid-cols-4 gap-6 md:gap-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-6xl font-black text-primary mb-2">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Email Subscription */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Be the First to Know</h2>
            <p className="text-muted-foreground text-lg">
              Join our exclusive list and get notified the moment we launch
            </p>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-base"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Stay Updated
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-primary text-lg font-semibold">✓ You're on the list!</div>
              <p className="text-muted-foreground">
                We'll send you an email as soon as we launch. Thanks for your interest!
              </p>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <p className="text-muted-foreground">Follow us for updates</p>
          <div className="flex justify-center gap-6">
            {[
              { name: "Twitter", href: "#" },
              { name: "LinkedIn", href: "#" },
              { name: "Instagram", href: "#" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-muted-foreground hover:text-accent transition-colors duration-200 text-lg font-medium"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-12 border-t border-border/50">
          <p className="text-sm text-muted-foreground">© 2024 GlobeTee shop. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAppForm } from '@/hooks/demo.form'
import { sendContactEmail } from '@/server/actions'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({ component: LandingPage })

function ContactForm({ type, onSuccess }: { type: 'join' | 'sponsor', onSuccess: () => void }) {
  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      description: '',
    },
    validators: {
      onBlur: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>
        }
        if (value.name.trim().length === 0) {
          errors.fields.name = 'Name is required'
        }
        if (value.email.trim().length === 0) {
          errors.fields.email = 'Email is required'
        }
        if (value.phoneNumber.trim().length === 0) {
          errors.fields.phoneNumber = 'Phone number is required'
        }
        if (value.description.trim().length === 0) {
          errors.fields.description = 'Description is required'
        }
        return errors
      },
    },
    onSubmit: async ({ value }) => {
      try {
        await sendContactEmail({
          data: {
            ...value,
            type,
          },
        } as any)
        alert('Request sent successfully!')
        onSuccess()
      } catch (error) {
        console.error('Failed to send request:', error)
        alert('Failed to send request. Please try again.')
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-5 py-4"
    >
      <form.Field name="name">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Full Name
            </Label>
            <Input
              id="name"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:ring-orange-500/20"
              placeholder="Enter your full name"
            />
            {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
              <p className="text-xs font-medium text-red-400">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:ring-orange-500/20"
              placeholder="name@example.com"
            />
            {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
              <p className="text-xs font-medium text-red-400">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="phoneNumber">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:ring-orange-500/20"
              placeholder="123-456-7890"
            />
            {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
              <p className="text-xs font-medium text-red-400">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              {type === 'join' ? 'Team Details / Experience' : 'Sponsorship Details'}
            </Label>
            <Textarea
              id="description"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="min-h-[120px] resize-none border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:ring-orange-500/20"
              placeholder={type === 'join' ? "Tell us about your team or basketball experience..." : "Tell us about your sponsorship interest..."}
            />
            {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
              <p className="text-xs font-medium text-red-400">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <div className="pt-2">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="h-12 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-bold tracking-wider text-white transition-all hover:from-orange-400 hover:to-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] disabled:opacity-50"
            >
              {isSubmitting ? 'SENDING REQUEST...' : 'SUBMIT REQUEST'}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}

const teams = [
  { name: 'BBB', logo: '/team_logos/bbb.png' },
  { name: 'Team Aegis', logo: '/team_logos/team-aegis.png' },
  { name: 'Calgary Brothers', logo: '/team_logos/calgary-brothers.png' },
  { name: 'Cash', logo: '/team_logos/cash.png' },
  { name: 'Pinoy Finest', logo: '/team_logos/pinoy-finest.png' },
  { name: 'South Pole', logo: '/team_logos/south-pole.png' },
  { name: 'Team Korea', logo: '/team_logos/team-korea.png' },
  { name: 'YYC Shooters', logo: '/team_logos/yyc-shooters.png' },
]

function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'join' | 'sponsor'>('join')

  function calculateTimeLeft() {
    const difference = +new Date('2026-02-06') - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  // Helper to pad numbers with leading zero
  const pad = (num: number) => (num < 10 ? `0${num}` : num)

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/background_img.png"
          alt="Basketball Court Background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#020617]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <img 
          src="/ccbc_logo.png" 
          alt="CCBC Logo" 
          className="h-16 w-auto sm:h-20"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">
            Calgary Chinese Basketball League Season Asian League Season 5
          </span>
        </div>

        {/* Main Heading */}
        <div className="mb-2 flex flex-col items-center leading-none">
          <h1 className="text-4xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
            COMING SOON
          </h1>
          
          <div className="mt-4 flex items-start justify-center gap-2 sm:gap-4 md:gap-6">
             {/* @ts-ignore */}
            {timeLeft.days !== undefined ? (
              <>
                {/* Days */}
                {/* Days */}
                <div className="flex flex-col items-center">
                  <span className="bg-gradient-to-b from-orange-500 to-orange-600 bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl tabular-nums leading-none">
                     {/* @ts-ignore */}
                    {pad(timeLeft.days)}
                  </span>
                  <span className="mt-2 text-xs font-bold tracking-widest text-white uppercase sm:text-sm">
                    Days
                  </span>
                </div>

                {/* Separator */}
                <div className="pt-0 bg-gradient-to-b from-orange-500 to-orange-600 bg-clip-text text-4xl font-black text-transparent sm:text-6xl md:text-7xl lg:text-8xl leading-none flex items-center pb-2 sm:pb-4">:</div>

                {/* Hours */}
                <div className="flex flex-col items-center">
                  <span className="bg-gradient-to-b from-orange-500 to-orange-600 bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl tabular-nums leading-none">
                     {/* @ts-ignore */}
                    {pad(timeLeft.hours)}
                  </span>
                  <span className="mt-2 text-xs font-bold tracking-widest text-white uppercase sm:text-sm">
                    Hours
                  </span>
                </div>

                {/* Separator */}
                <div className="pt-0 bg-gradient-to-b from-orange-500 to-orange-600 bg-clip-text text-4xl font-black text-transparent sm:text-6xl md:text-7xl lg:text-8xl leading-none flex items-center pb-2 sm:pb-4">:</div>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <span className="bg-gradient-to-b from-orange-500 to-orange-600 bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl tabular-nums leading-none">
                     {/* @ts-ignore */}
                    {pad(timeLeft.minutes)}
                  </span>
                  <span className="mt-2 text-xs font-bold tracking-widest text-white uppercase sm:text-sm">
                    Minutes
                  </span>
                </div>

                {/* Separator */}
                <div className="pt-0 bg-gradient-to-b from-orange-500 to-orange-600 bg-clip-text text-4xl font-black text-transparent sm:text-6xl md:text-7xl lg:text-8xl leading-none flex items-center pb-2 sm:pb-4">:</div>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <span className="bg-gradient-to-b from-orange-500 to-orange-600 bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl tabular-nums leading-none">
                     {/* @ts-ignore */}
                    {pad(timeLeft.seconds)}
                  </span>
                  <span className="mt-2 text-xs font-bold tracking-widest text-white uppercase sm:text-sm">
                    Seconds
                  </span>
                </div>
              </>
            ) : (
              <span className="text-4xl font-bold text-white">SEASON STARTED</span>
            )}
          </div>
        </div>


        {/* Action Buttons Container */}
        <div className="mt-4 flex w-full max-w-xl flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md sm:flex-row sm:p-3">
          <a 
            href="https://calgarycbclub.com/"
            target="_blank"
            className="hidden px-2 text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-white sm:block"
          >
            CCBC home
          </a>
          <div className="hidden h-8 w-px bg-white/10 sm:block" />
          
          <Button 
            onClick={() => {
              setModalType('join')
              setIsModalOpen(true)
            }}
            className="h-12 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-bold tracking-wider text-white hover:from-orange-400 hover:to-orange-500 sm:flex-1"
          >
            MAKE OR JOIN TEAM
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => {
              setModalType('sponsor')
              setIsModalOpen(true)
            }}
            className="h-12 w-full border border-white/10 bg-white/5 text-sm font-bold tracking-wider text-white hover:bg-white/10 sm:flex-1"
          >
            SPONSOR LEAGUE
          </Button>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="border-white/10 bg-zinc-950/80 text-white backdrop-blur-xl sm:max-w-[500px] sm:rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                {modalType === 'join' ? 'MAKE OR JOIN A TEAM' : 'SPONSOR THE LEAGUE'}
              </DialogTitle>
              <DialogDescription className="text-base text-zinc-400">
                {modalType === 'join' 
                  ? 'Enter your details below to get started with a team.' 
                  : 'Interested in sponsoring? Let us know!'}
              </DialogDescription>
            </DialogHeader>
            <ContactForm 
              type={modalType} 
              onSuccess={() => setIsModalOpen(false)} 
            />
          </DialogContent>
        </Dialog>

        {/* Team Logos Carousel */}
        <div className="mt-8 w-full max-w-5xl overflow-hidden pause-on-hover">
          <div className="flex w-max animate-marquee gap-16">
            {[...teams, ...teams].map((team, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-white/10 bg-white/5 p-2 backdrop-blur-sm transition-transform hover:scale-110 sm:h-24 sm:w-24">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-xs font-bold tracking-wider text-white uppercase sm:text-sm">
                  {team.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

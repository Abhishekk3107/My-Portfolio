import React from 'react'

export default function Contact({ data }) {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' })

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all fields')
      return
    }
    if (!isValidEmail(form.email)) {
      alert('Please enter a valid email address')
      return
    }
    alert("Message sent successfully! I'll get back to you soon.")
    setForm({ name: '', email: '', message: '' })
  }

  React.useEffect(() => {
    const saved = localStorage.getItem('formData')
    if (saved) setForm(JSON.parse(saved))
  }, [])

  React.useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(form))
  }, [form])

  return (
    <section id="contact" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Get In Touch</h2>
          <p className="text-lg text-muted leading-relaxed text-center mb-12">I'm always interested in hearing about new projects, so if you'd like to chat, please get in touch.</p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto contact-form">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-lg text-text" />
              <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" name="email" placeholder="your.email@example.com" required className="w-full px-4 py-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-lg text-text" />
            </div>
            <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} name="message" rows="6" placeholder="Your Message" required className="w-full px-4 py-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-lg text-text mb-6"></textarea>
            <button type="submit" className="w-full bg-accent text-primary py-3 rounded-lg font-semibold">Send Message</button>
          </form>

        </div>
      </div>
    </section>
  )
}

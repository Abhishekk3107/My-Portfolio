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
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Get In Touch</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">I'm always interested in hearing about new projects. Send a message or reach me through the channels below.</p>

            <div className="mb-4">
              <p className="text-muted">Email</p>
              <a className="block text-accent font-medium" href={`mailto:${data.personal.email || 'abhishekk@example.com'}`}>{data.personal.email || 'abhishekk@example.com'}</a>
            </div>

            <div className="mb-4">
              <p className="text-muted">Location</p>
              <p className="text-muted">{data.personal.location}</p>
            </div>

            <div className="mt-6 flex gap-4">
              <a href={data.personal.social.linkedin} target="_blank" rel="noreferrer" className="text-muted">LinkedIn</a>
              <a href={data.personal.social.github} target="_blank" rel="noreferrer" className="text-muted">GitHub</a>
              <a href={data.personal.social.instagram} target="_blank" rel="noreferrer" className="text-muted">Instagram</a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="contact-form bg-[rgba(255,255,255,0.02)] p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 bg-transparent border border-[rgba(255,255,255,0.04)] rounded-lg text-text" />
                <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" name="email" placeholder="your.email@example.com" required className="w-full px-4 py-3 bg-transparent border border-[rgba(255,255,255,0.04)] rounded-lg text-text" />
              </div>
              <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} name="message" rows="6" placeholder="Your Message" required className="w-full px-4 py-3 bg-transparent border border-[rgba(255,255,255,0.04)] rounded-lg text-text mb-6"></textarea>
              <button type="submit" className="w-full bg-accent text-black py-3 rounded-lg font-semibold">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

const BRAND = {
  navy: '#0A1A2F',
  teal: '#00A9A5',
  gold: '#D4A72C',
  bg: '#F7F9FC'
}

const apiBase = import.meta.env.VITE_BACKEND_URL || ''

function Shell({ children }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND.bg }}>
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b" style={{borderColor: 'rgba(10,26,47,0.08)'}}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl grid place-items-center font-bold" style={{background: BRAND.navy, color: 'white'}}>F</div>
            <div className="leading-tight">
              <div className="font-semibold" style={{color: BRAND.navy}}>Frontier Academy</div>
              <div className="text-xs" style={{color: '#5B6B85'}}>Communication. Confidence. Career.</div>
            </div>
          </button>
          <nav className="hidden sm:flex items-center gap-6">
            <Link to="/courses" className="text-sm font-medium hover:opacity-80" style={{color: BRAND.navy}}>Courses</Link>
            <Link to="/profile" className="text-sm font-medium hover:opacity-80" style={{color: BRAND.navy}}>Profile</Link>
            <Link to="/admin" className="text-sm font-medium hover:opacity-80" style={{color: BRAND.navy}}>Admin</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/enroll" className="px-4 py-2 rounded-xl text-sm font-semibold shadow" style={{background: BRAND.gold, color: BRAND.navy}}>Enroll Now</Link>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      <footer className="py-10 text-center text-sm" style={{color: '#5B6B85'}}>© {new Date().getFullYear()} Frontier Online Training Academy</footer>
    </div>
  )
}

function Onboarding() {
  const slides = [
    {title: 'Master Communication', desc: 'Professional training for IELTS, British Accent, Soft Skills and Leadership.', badge: 'Premium & Trustworthy'},
    {title: 'Healthcare Quality (CPHQ)', desc: 'Specialized CPHQ prep for healthcare professionals and leaders.', badge: 'New Program'},
    {title: 'Learn Anywhere', desc: 'Watch lessons, take quizzes, earn certificates and track progress.', badge: 'Mobile Friendly'},
  ]
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(()=> setI(p => (p+1)%slides.length), 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="rounded-2xl p-6 sm:p-8 shadow relative overflow-hidden" style={{background: BRAND.navy, color: 'white'}}>
      <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full opacity-20" style={{background: BRAND.teal}} />
      <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full opacity-10" style={{background: BRAND.gold}} />
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="inline-block text-xs px-2 py-1 rounded-full mb-3" style={{background: 'rgba(255,255,255,0.1)'}}>{slides[i].badge}</div>
          <h1 className="text-2xl sm:text-3xl font-semibold leading-snug">{slides[i].title}</h1>
          <p className="opacity-90 mt-2 max-w-2xl">{slides[i].desc}</p>
          <div className="mt-4 flex gap-3">
            <Link to="/courses" className="px-4 py-2 rounded-xl text-sm font-semibold" style={{background: BRAND.teal, color: 'white'}}>Browse Courses</Link>
            <a href="#categories" className="px-4 py-2 rounded-xl text-sm font-semibold border" style={{borderColor: 'rgba(255,255,255,0.2)'}}>Explore</a>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <div className="text-6xl font-black" style={{color: '#DDE4EE'}}>FO</div>
          <div className="text-xs opacity-70">Frontier Academy</div>
        </div>
      </div>
    </div>
  )
}

function Categories({ onPick }) {
  const cats = [
    {name:'IELTS', desc:'Score high with structured practice', key:'IELTS'},
    {name:'Accent & Spoken English', desc:'British accent and fluency', key:'Accent & Spoken English'},
    {name:'Personality Development', desc:'Confidence and soft skills', key:'Personality Development'},
    {name:'Leadership & Corporate Communication', desc:'Lead and influence at work', key:'Leadership & Corporate Communication'},
    {name:'CPHQ & Healthcare Quality', desc:'For healthcare professionals', key:'CPHQ & Healthcare Quality'},
  ]
  return (
    <section id="categories" className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cats.map(c => (
        <button key={c.key} onClick={()=>onPick && onPick(c.key)} className="group rounded-2xl p-5 text-left border bg-white hover:shadow-md transition">
          <div className="text-sm font-semibold" style={{color: BRAND.navy}}>{c.name}</div>
          <div className="text-xs mt-1" style={{color: '#5B6B85'}}>{c.desc}</div>
          <div className="mt-3 text-xs font-medium group-hover:translate-x-1 transition" style={{color: BRAND.teal}}>Explore →</div>
        </button>
      ))}
    </section>
  )
}

function CourseCard({ c }){
  return (
    <Link to={`/courses/${c._id}`} className="rounded-2xl overflow-hidden border bg-white hover:shadow-md transition">
      <div className="aspect-video bg-slate-100" style={{backgroundImage: `url(${c.thumbnail_url||''})`, backgroundSize:'cover', backgroundPosition:'center'}} />
      <div className="p-4">
        <div className="text-xs font-semibold mb-1" style={{color: BRAND.teal}}>{c.category}</div>
        <div className="font-semibold" style={{color: BRAND.navy}}>{c.title}</div>
        <div className="text-xs mt-1" style={{color: '#5B6B85'}}>{c.instructor}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-semibold" style={{color: BRAND.navy}}>${c.price}</div>
          <div className="text-xs px-2 py-1 rounded-full" style={{background: BRAND.gold, color: BRAND.navy}}>Premium</div>
        </div>
      </div>
    </Link>
  )
}

function Courses(){
  const [courses, setCourses] = useState([])
  const [cat, setCat] = useState('')
  const [q, setQ] = useState('')
  useEffect(()=>{
    const url = new URL(apiBase + '/api/courses', window.location.origin)
    if(cat) url.searchParams.set('category', cat)
    if(q) url.searchParams.set('q', q)
    fetch(url.toString().replace(window.location.origin,''))
      .then(r=>r.json()).then(setCourses).catch(()=>setCourses([]))
  }, [cat, q])
  return (
    <Shell>
      <Onboarding />
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="text-lg font-semibold" style={{color: BRAND.navy}}>Explore Courses</div>
        <div className="flex gap-2">
          <select value={cat} onChange={e=>setCat(e.target.value)} className="px-3 py-2 rounded-xl border bg-white text-sm">
            <option value="">All Categories</option>
            <option>IELTS</option>
            <option>Accent & Spoken English</option>
            <option>Personality Development</option>
            <option>Leadership & Corporate Communication</option>
            <option>CPHQ & Healthcare Quality</option>
          </select>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" className="px-3 py-2 rounded-xl border bg-white text-sm" />
        </div>
      </div>
      <Categories onPick={setCat} />
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(c=> <CourseCard key={c._id} c={c} />)}
      </div>
    </Shell>
  )
}

function useParamsId(){
  const id = window.location.pathname.split('/').pop()
  return id
}

function CourseDetail(){
  const id = useParamsId()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  useEffect(()=>{
    fetch((apiBase+`/api/courses`).replace(window.location.origin,''))
      .then(r=>r.json()).then(list=>{
        const found = list.find(x=> String(x._id)===id)
        setCourse(found)
      })
    fetch((apiBase+`/api/lessons/${id}`).replace(window.location.origin,''))
      .then(r=>r.json()).then(setLessons)
  }, [id])
  if(!course) return <Shell><div className="text-sm">Loading...</div></Shell>
  return (
    <Shell>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden border bg-white">
            <div className="aspect-video bg-slate-100" style={{backgroundImage: `url(${course.thumbnail_url||''})`, backgroundSize:'cover'}} />
            <div className="p-4">
              <div className="text-xs font-semibold mb-1" style={{color: BRAND.teal}}>{course.category}</div>
              <h1 className="text-xl font-semibold" style={{color: BRAND.navy}}>{course.title}</h1>
              <p className="text-sm mt-2" style={{color: '#5B6B85'}}>{course.description}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-semibold mb-2" style={{color: BRAND.navy}}>Curriculum</div>
            <div className="space-y-2">
              {lessons.length? lessons.sort((a,b)=> (a.order||0)-(b.order||0)).map(l=> (
                <LessonRow key={l._id} l={l} courseId={id} />
              )) : <div className="text-sm" style={{color:'#5B6B85'}}>Lessons will appear here.</div>}
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-2xl p-4 border bg-white">
            <div className="text-2xl font-bold" style={{color: BRAND.navy}}>${course.price}</div>
            <button className="w-full mt-3 px-4 py-2 rounded-xl font-semibold" style={{background: BRAND.gold, color: BRAND.navy}}>Enroll & Pay</button>
            <div className="text-xs mt-3" style={{color:'#5B6B85'}}>Certificate included • Lifetime access</div>
          </div>
          <div className="rounded-2xl p-4 border bg-white mt-4">
            <div className="font-semibold" style={{color: BRAND.navy}}>Instructor</div>
            <div className="text-sm" style={{color:'#5B6B85'}}>{course.instructor}</div>
          </div>
        </div>
      </div>
    </Shell>
  )
}

function LessonRow({ l, courseId }){
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border bg-white">
      <button onClick={()=>setOpen(o=>!o)} className="w-full px-4 py-3 flex items-center justify-between">
        <div className="text-sm font-medium" style={{color: BRAND.navy}}>{l.title}</div>
        <div className="text-xs" style={{color: BRAND.teal}}>{open? 'Hide' : 'View'}</div>
      </button>
      {open && <div className="px-4 pb-4 text-sm" style={{color:'#374250'}}>
        {l.content_type==='video' && (
          <video controls className="w-full rounded-lg">
            <source src={l.video_url||'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'} type="video/mp4" />
          </video>
        )}
        {l.content_type==='pdf' && (
          <iframe title="pdf" src={l.pdf_url||'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'} className="w-full h-64 rounded-lg" />
        )}
        {l.notes && <div className="mt-3 whitespace-pre-wrap text-sm">{l.notes}</div>}
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{background: BRAND.teal, color:'white'}}>Mark complete</button>
          <Link to={`/quiz/${courseId}`} className="px-3 py-1.5 rounded-lg text-xs font-semibold border" style={{borderColor:'#D0D8E6'}}>Take Quiz</Link>
        </div>
      </div>}
    </div>
  )
}

function Quiz(){
  const courseId = window.location.pathname.split('/').pop()
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(null)
  useEffect(()=>{
    fetch((apiBase+`/api/quizzes/${courseId}`).replace(window.location.origin,''))
      .then(r=>r.json()).then(setQuiz)
  }, [courseId])
  if(!quiz) return <Shell><div className="text-sm">Loading...</div></Shell>
  const submit = async () => {
    const res = await fetch((apiBase+`/api/quizzes/submit`).replace(window.location.origin,''), {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({quiz_id: quiz._id, answers})})
    const data = await res.json(); setScore(data.score)
  }
  return (
    <Shell>
      <div className="max-w-2xl mx-auto rounded-2xl border bg-white p-5">
        <div className="font-semibold" style={{color: BRAND.navy}}>{quiz.title}</div>
        <div className="mt-3 space-y-4">
          {quiz.questions?.map((q, qi)=> (
            <div key={qi}>
              <div className="text-sm font-medium" style={{color: BRAND.navy}}>{qi+1}. {q.question}</div>
              <div className="mt-2 grid sm:grid-cols-2 gap-2">
                {q.options.map((op, oi)=> (
                  <label key={oi} className="border rounded-lg p-2 text-sm flex items-center gap-2">
                    <input type="radio" name={`q${qi}`} onChange={()=> setAnswers(a=>{const n=[...a]; n[qi]=oi; return n})} />
                    {op}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={submit} className="mt-4 px-4 py-2 rounded-xl font-semibold" style={{background: BRAND.gold, color: BRAND.navy}}>Submit</button>
        {score!==null && <div className="mt-3 text-sm" style={{color: BRAND.navy}}>Your score: <span className="font-semibold">{score}%</span></div>}
      </div>
    </Shell>
  )
}

function Profile(){
  return (
    <Shell>
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="sm:col-span-1 rounded-2xl border bg-white p-5">
          <div className="w-20 h-20 rounded-2xl bg-slate-200" />
          <div className="mt-3 font-semibold" style={{color: BRAND.navy}}>Your Profile</div>
          <div className="text-sm" style={{color:'#5B6B85'}}>Track progress, certificates and enrollments.</div>
        </div>
        <div className="sm:col-span-2 space-y-4">
          <div className="rounded-2xl border bg-white p-5">
            <div className="font-semibold" style={{color: BRAND.navy}}>Progress</div>
            <div className="text-sm mt-2" style={{color:'#5B6B85'}}>Your courses and progress will appear here.</div>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <div className="font-semibold" style={{color: BRAND.navy}}>Certificates</div>
            <div className="text-sm mt-2" style={{color:'#5B6B85'}}>Earn certificates after completing courses and quizzes.</div>
          </div>
        </div>
      </div>
    </Shell>
  )
}

function Admin(){
  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-5">
        <div className="font-semibold" style={{color: BRAND.navy}}>Admin Dashboard</div>
        <div className="text-sm mt-2" style={{color:'#5B6B85'}}>Upload courses, lessons and manage students. (Demo UI)</div>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <button className="px-4 py-3 rounded-xl border bg-white text-left">
            <div className="font-medium" style={{color: BRAND.navy}}>Create Course</div>
            <div className="text-xs" style={{color:'#5B6B85'}}>Title, category, price</div>
          </button>
          <button className="px-4 py-3 rounded-xl border bg-white text-left">
            <div className="font-medium" style={{color: BRAND.navy}}>Add Lesson</div>
            <div className="text-xs" style={{color:'#5B6B85'}}>Video, PDF, notes</div>
          </button>
          <button className="px-4 py-3 rounded-xl border bg-white text-left">
            <div className="font-medium" style={{color: BRAND.navy}}>Create Quiz</div>
            <div className="text-xs" style={{color:'#5B6B85'}}>Questions & answers</div>
          </button>
        </div>
      </div>
    </Shell>
  )
}

function Home(){
  return (
    <Shell>
      <Onboarding />
      <Categories />
      <div className="mt-6 rounded-2xl border bg-white p-5">
        <div className="font-semibold" style={{color: BRAND.navy}}>Why Frontier?</div>
        <ul className="mt-2 grid sm:grid-cols-2 gap-2 text-sm" style={{color:'#374250'}}>
          <li>Expert trainers for IELTS, accent and leadership</li>
          <li>Healthcare-focused CPHQ training</li>
          <li>Premium curriculum, clear outcomes</li>
          <li>Certificates to showcase your growth</li>
        </ul>
      </div>
    </Shell>
  )
}

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

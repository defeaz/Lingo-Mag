npm create vite@latest . -- --template react-ts   # or react (JS)
npm i
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Globe2, Sparkles, ShoppingCart, CheckCircle2, Star, Filter, Languages, ArrowRight, Mail, Shield, HeartHandshake, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// --- Sample catalogue (extendable / replace with API later) ---
const CATALOGUE = [
  {
    id: "fr-01",
    title: "Le Monde – Week-End",
    language: "French",
    level: "Upper-Intermediate",
    interests: ["World News", "Culture"],
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1600&auto=format&fit=crop",
    blurb: "Current affairs with long-reads and culture—perfect for ritual weekend reading.",
    price: 7.9,
    country: "France"
  },
  {
    id: "es-01",
    title: "El País Semanal",
    language: "Spanish",
    level: "Intermediate",
    interests: ["World News", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop",
    blurb: "Accessible journalism and human stories—great for building real-world vocab.",
    price: 6.5,
    country: "Spain"
  },
  {
    id: "de-01",
    title: "Der Spiegel Kompakt",
    language: "German",
    level: "Upper-Intermediate",
    interests: ["World News", "Tech"],
    image: "https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1600&auto=format&fit=crop",
    blurb: "Investigative reporting with crisp design; meaty but manageable features.",
    price: 8.2,
    country: "Germany"
  },
  {
    id: "it-01",
    title: "Internazionale Kids",
    language: "Italian",
    level: "Beginner",
    interests: ["Culture", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop",
    blurb: "Global stories simplified—ideal for gentle starts without feeling childish.",
    price: 5.3,
    country: "Italy"
  },
  {
    id: "jp-01",
    title: "BRUTUS",
    language: "Japanese",
    level: "Advanced",
    interests: ["Design", "Culture"],
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?q=80&w=1600&auto=format&fit=crop",
    blurb: "Design-forward culture mag; lush visuals carry you through tougher text.",
    price: 9.9,
    country: "Japan"
  },
  {
    id: "pt-01",
    title: "Público Ímpar",
    language: "Portuguese",
    level: "Intermediate",
    interests: ["Culture", "World News"],
    image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1600&auto=format&fit=crop",
    blurb: "Feature-led weekend supplement—rich in idioms you’ll actually use.",
    price: 6.9,
    country: "Portugal"
  },
  {
    id: "ar-01",
    title: "مجلة العربي العلمي (Al-Arabi Science)",
    language: "Arabic",
    level: "Upper-Intermediate",
    interests: ["Science", "Tech"],
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1600&auto=format&fit=crop",
    blurb: "Science & tech with approachable explanations and glossaries.",
    price: 7.2,
    country: "Kuwait"
  },
  {
    id: "zh-01",
    title: "南方人物周刊 (People Weekly)",
    language: "Chinese",
    level: "Advanced",
    interests: ["Culture", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=1600&auto=format&fit=crop",
    blurb: "Portraits & long-form profiles—perfect for sustaining native-style reading.",
    price: 8.5,
    country: "China"
  },
];

const LANGUAGES = ["French","Spanish","German","Italian","Japanese","Portuguese","Arabic","Chinese"]; 
const LEVELS = ["Beginner","Elementary","Pre-Intermediate","Intermediate","Upper-Intermediate","Advanced"]; 
const INTERESTS = ["World News","Culture","Lifestyle","Tech","Science","Design"]; 

// Lightweight global CSS to make the site feel more tactile / language-oriented (less "sleek")
const GlobalStyles = () => (
  <style>{`
    /* Typography: literary headings, humanist sans body */
    .lingomag { --ink:#1f2937; --paper:#faf7f2; --paper-2:#f4efe9; --accent:#3b82f6; --accent-soft:#e6f0ff; }
    .lingomag, .lingomag * { color: var(--ink); }

    /* Subtle paper texture background */
    .lingomag {
      background:
        radial-gradient(circle at 10% 10%, rgba(0,0,0,0.03), transparent 25%),
        radial-gradient(circle at 80% 0%, rgba(0,0,0,0.02), transparent 30%),
        linear-gradient(180deg, var(--paper), var(--paper-2));
    }

    /* Headlines feel printed */
    .lingomag h1, .lingomag h2, .lingomag h3, .lingomag .font-bold, .lingomag .font-semibold {
      font-family: Georgia, 'Times New Roman', Times, serif;
      letter-spacing: 0.1px;
    }
    /* Body text readable */
    .lingomag p, .lingomag li, .lingomag input, .lingomag button {
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif;
    }

    /* Cards: softer edges, faint borders, reduced shadow */
    .lingomag [class*="rounded-2xl"], .lingomag .rounded-2xl { border-radius: 14px !important; }
    .lingomag .card, .lingomag [class*="Card"] { box-shadow: none !important; border: 1px solid rgba(31,41,55,0.08); background: #fff; }

    /* Buttons: understated, like tabs in a mag */
    .lingomag button { border-radius: 9999px; border: 1px solid rgba(31,41,55,0.15); }
    .lingomag button:hover { background: rgba(31,41,55,0.03); }
    .lingomag a { text-underline-offset: 2px; }
    .lingomag a:hover { text-decoration: underline; }

    /* Badges: pill labels like section tags */
    .lingomag .badge, .lingomag [class*="Badge"] { border: 1px solid rgba(31,41,55,0.12); background: #fff; }

    /* Catalogue cover images: slight grain */
    .lingomag .mag-cover { filter: contrast(0.98) saturate(1.02); }

    /* Language flavour (applies when we annotate elements with lang attr) */
    .lingomag [lang="fr"] { font-feature-settings: "liga","clig","onum"; }
    .lingomag [lang="de"] { letter-spacing: 0.2px; }
    .lingomag [lang="ja"] { font-family: 'Noto Sans JP', system-ui, sans-serif; }
    .lingomag [lang="ar"] { font-family: 'Noto Naskh Arabic', serif; }
    .lingomag [lang="zh"] { font-family: 'Noto Sans SC', system-ui, sans-serif; }

    /* Section dividers like magazine rules */
    .lingomag section { position: relative; }
    .lingomag section::after { content: ""; display:block; height:1px; background: rgba(31,41,55,0.06); margin: 24px auto 0; max-width: 960px; }

    /* Header less glossy */
    .lingomag header { background: rgba(255,255,255,0.8); }

    /* Inputs: simple, print-like */
    .lingomag input { border-radius: 9999px; border:1px solid rgba(31,41,55,0.18); background:#fff; }
    .lingomag input:focus { outline: 2px solid var(--accent-soft); border-color: var(--accent); }
  `}</style>
);

export default function App() {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<string | undefined>(undefined);
  const [level, setLevel] = useState<string | undefined>(undefined);
  const [interest, setInterest] = useState<string | undefined>(undefined);
  const [cart, setCart] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return CATALOGUE.filter((m) =>
      (lang ? m.language === lang : true) &&
      (level ? m.level === level : true) &&
      (interest ? m.interests.includes(interest) : true) &&
      (query ? (m.title.toLowerCase().includes(query.toLowerCase()) || m.blurb.toLowerCase().includes(query.toLowerCase())) : true)
    );
  }, [lang, level, interest, query]);

  const addToCart = (id: string) => setCart((c) => (c.includes(id) ? c : [...c, id]));

  return (
    <div className="lingomag min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      {/* Header */}
      <GlobalStyles />
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe2 className="w-6 h-6" />
            <span className="font-bold tracking-tight">LingoMag</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:opacity-80">How it works</a>
            <a href="#catalogue" className="hover:opacity-80">Catalogue</a>
            <a href="#perks" className="hover:opacity-80">Why us</a>
            <a href="#faq" className="hover:opacity-80">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-2xl">Sign in</Button>
            <Button className="rounded-2xl"><ShoppingCart className="w-4 h-4 mr-2"/>Cart ({cart.length})</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-transparent"/>
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-5xl font-bold tracking-tight">
              Read your way fluent.
            </motion.h1>
            <p className="mt-4 text-lg text-slate-700">Real magazines from around the world, matched to your interests and level—so language practice feels like a treat, not homework.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="rounded-xl" variant="secondary"><Sparkles className="w-3.5 h-3.5 mr-1"/>Tailored to you</Badge>
              <Badge className="rounded-xl" variant="secondary"><BookOpen className="w-3.5 h-3.5 mr-1"/>Bite-size features</Badge>
              <Badge className="rounded-xl" variant="secondary"><Shield className="w-3.5 h-3.5 mr-1"/>Secure checkout</Badge>
            </div>
            <div className="mt-8 flex gap-3">
              <Button size="lg" className="rounded-2xl">Take the 60‑sec quiz <ArrowRight className="ml-2 w-4 h-4"/></Button>
              <Button size="lg" variant="outline" className="rounded-2xl" onClick={() => document.getElementById("catalogue")?.scrollIntoView({behavior: 'smooth'})}>Browse issues</Button>
            </div>
            <p className="mt-3 text-sm text-slate-500">No grammar drills. Just great reads—in your target language.</p>
          </div>
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1, duration:0.6}} className="relative">
            <div className="grid grid-cols-2 gap-4">
              {CATALOGUE.slice(0,4).map((m) => (
                <Card key={m.id} className="rounded-2xl overflow-hidden">
                  <div className="mag-cover aspect-[4/5] bg-slate-200" style={{backgroundImage:`url(${m.image})`, backgroundSize:'cover', backgroundPosition:'center'}}/>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm leading-tight">{m.title}</CardTitle>
                    <CardDescription className="text-xs">{m.language} • {m.level}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How it works</h2>
          <p className="text-slate-600 mt-2">Three easy steps from browse to brain boost.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {icon: <Languages className="w-5 h-5"/>, title: "Tell us your vibe", text: "Pick language, level, and interests—music, design, tech, news and more."},
            {icon: <Filter className="w-5 h-5"/>, title: "We curate magazines", text: "We handpick readable issues with helpful context and glossaries."},
            {icon: <Sparkles className="w-5 h-5"/>, title: "Read for fun", text: "Build real-world vocabulary and cultural feel—no worksheets in sight."},
          ].map((s, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100">{s.icon}</div>
                <CardTitle className="text-lg">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-slate-600">{s.text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Filters & Catalogue */}
      <section id="catalogue" className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Explore the catalogue</h2>
            <p className="text-slate-600 mt-1">Match by language, level, and interests. New titles added monthly.</p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
              <Input placeholder="Search titles or blurbs" className="pl-9 w-64 rounded-2xl" value={query} onChange={(e)=>setQuery(e.target.value)} />
            </div>
            <Select onValueChange={(v)=>setLang(v)}>
              <SelectTrigger className="w-40 rounded-2xl"><SelectValue placeholder="Language" /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(v)=>setLevel(v)}>
              <SelectTrigger className="w-52 rounded-2xl"><SelectValue placeholder="Level" /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Level</SelectLabel>
                  {LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(v)=>setInterest(v)}>
              <SelectTrigger className="w-48 rounded-2xl"><SelectValue placeholder="Interest" /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Interest</SelectLabel>
                  {INTERESTS.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
            {(lang || level || interest || query) && (
              <Button variant="ghost" className="rounded-2xl" onClick={()=>{setLang(undefined); setLevel(undefined); setInterest(undefined); setQuery("")}}>Clear</Button>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map((m) => (
            <Card key={m.id} className="rounded-2xl overflow-hidden flex flex-col">
              <div className="mag-cover aspect-[4/5] bg-slate-200" style={{backgroundImage:`url(${m.image})`, backgroundSize:'cover', backgroundPosition:'center'}}/>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg leading-tight">{m.title}</CardTitle>
                    <CardDescription className="text-sm">{m.country} • {m.language} • {m.level}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold">£{m.price.toFixed(2)}</div>
                    <div className="text-xs text-slate-500">single issue</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 text-slate-700">
                <p>{m.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.interests.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-xl">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex items-center justify-between gap-3">
                <Button className="rounded-2xl" variant="outline">Preview pages</Button>
                <Button className="rounded-2xl" onClick={()=>addToCart(m.id)}><ShoppingCart className="w-4 h-4 mr-2"/>Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-16 text-slate-500">
            <Loader2 className="w-4 h-4 mr-2 animate-spin"/> No matches—try relaxing your filters.
          </div>
        )}
      </section>

      {/* Perks */}
      <section id="perks" className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {title: "Feels like fun", text: "We pick visually engaging, story-led issues so you stay motivated.", icon: <Sparkles className="w-5 h-5"/>},
            {title: "Pedagogical nudge", text: "Light scaffolding only: topic glossaries, pronunciation tips, and bite-size notes.", icon: <BookOpen className="w-5 h-5"/>},
            {title: "Flexible plans", text: "Buy single issues or subscribe monthly—pause anytime.", icon: <CheckCircle2 className="w-5 h-5"/>},
          ].map((p, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100">{p.icon}</div>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-slate-600">{p.text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="rounded-3xl p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold tracking-tight">Readers love the vibe</h3>
              <p className="text-slate-600 mt-1">Not school. Not apps. Just real culture—delivered.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  {name:"Sam (French)", quote:"Swapping doomscrolling for a weekend Le Monde has levelled up my vocab without the grind.", stars:5},
                  {name:"Aisha (Spanish)", quote:"I actually look forward to practice now—features feel like Netflix for reading.", stars:5},
                  {name:"Jonas (German)", quote:"The curated issues hit the sweet spot of challenging but readable.", stars:4},
                  {name:"Mei (Japanese)", quote:"Beautiful layouts kept me going when the kanji got spicy.", stars:5},
                ].map((t, i)=> (
                  <Card key={i} className="rounded-2xl">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({length:t.stars}).map((_,i)=>(<Star key={i} className="w-4 h-4 fill-current"/>))}
                      </div>
                      <p className="mt-2 text-slate-700">“{t.quote}”</p>
                      <p className="mt-2 text-sm text-slate-500">— {t.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Join the club</CardTitle>
                  <CardDescription>Get monthly picks, discount drops, and mini reading tips.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-3">
                  <div className="relative w-full">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <Input placeholder="Email" className="pl-9 rounded-2xl"/>
                  </div>
                  <Button className="rounded-2xl">Subscribe</Button>
                </CardContent>
                <CardFooter className="text-xs text-slate-500">We’ll only send the good stuff. Unsubscribe any time.</CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-14">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-center">FAQ</h3>
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is this for beginners or advanced learners?</AccordionTrigger>
            <AccordionContent>
              We support all levels—from gentle intros to native-level long reads. Filters help you pick what feels comfy-but-stretchy.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What makes this different from a textbook?</AccordionTrigger>
            <AccordionContent>
              Real magazines are culturally rich, keep you motivated, and build intuition. We add light scaffolding so it stays fun.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
            <AccordionContent>
              Yes—global shipping, plus select digital previews. Shipping times vary by origin country.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I subscribe instead of buying single issues?</AccordionTrigger>
            <AccordionContent>
              Absolutely. Pick monthly or quarterly. You can pause or switch languages any time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2 font-semibold"><Globe2 className="w-4 h-4"/>LingoMag</div>
            <p className="mt-2 text-slate-600">Magazines from abroad for learners who’d rather read than revise.</p>
          </div>
          <div>
            <div className="font-semibold">Shop</div>
            <ul className="mt-2 space-y-1 text-slate-600">
              <li><a href="#catalogue" className="hover:underline">All titles</a></li>
              <li><a className="hover:underline">Subscriptions</a></li>
              <li><a className="hover:underline">Gift cards</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Learn</div>
            <ul className="mt-2 space-y-1 text-slate-600">
              <li><a className="hover:underline">Placement quiz</a></li>
              <li><a className="hover:underline">Reading tips</a></li>
              <li><a className="hover:underline">Teacher perks</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Company</div>
            <ul className="mt-2 space-y-1 text-slate-600">
              <li><a className="hover:underline">About</a></li>
              <li><a className="hover:underline">Shipping & returns</a></li>
              <li><a className="hover:underline">Privacy & terms</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} LingoMag. All rights reserved.</div>
      </footer>
    </div>
  );
}

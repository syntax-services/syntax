'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Project {
  id: number
  title: string
  slug: string
  category: string
  year: number | null
  image_url: string
  description: string
  impact_metrics?: string
  video_url?: string
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showVideo, setShowVideo] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', JSON.stringify(error, null, 2))
      } else {
        setProjects(data || [])
      }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(p => p.category === selectedCategory)

  const openVideo = (url: string, title: string) => {
    setSelectedVideo({ url, title })
    setShowVideo(true)
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Syntax Tech Portfolio',
    description:
      'A showcase of Syntax Tech web design, web development, branding and SEO projects in Nigeria.',
    url: 'https://syntax.com.ng/portfolio',
    mainEntity: filteredProjects.map(p => ({
      '@type': 'CreativeWork',
      name: p.title,
      url: `https://syntax.com.ng/portfolio/${p.slug}`,
      description: p.description,
      image: p.image_url,
    })),
  }

  return (
    <>
      <Head>
        <title>
          Portfolio | Web Design, Web Development & Branding Projects – Syntax Tech Nigeria
        </title>
        <meta
          name="description"
          content="Explore Syntax Tech's portfolio of web design, web development, SEO, branding and ecommerce projects for businesses and individuals in Nigeria."
        />
        <meta
          name="keywords"
          content="Syntax portfolio, web designer projects Nigeria, web developer portfolio, branding projects, SEO case studies, ecommerce development, website designer near me, website developer near me"
        />
        <link rel="canonical" href="https://syntax.com.ng/portfolio" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <main className="bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream min-h-screen px-4 py-14 relative text-xs sm:text-sm md:text-base">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
            Our Portfolio – Web Design & Development Projects
          </h1>
          <p className="text-xs sm:text-sm md:text-base mb-10 text-center max-w-2xl mx-auto">
            A showcase of our recent website design, web application development,
            ecommerce and branding projects. Discover why Syntax Tech is a leading
            web designer & developer in Nigeria.
          </p>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium 
        transition-colors transition-shadow duration-300 
        ${selectedCategory === cat
                    ? 'bg-syntaxBlue text-white shadow-lg shadow-syntaxBlue/30'
                    : 'bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream hover:bg-syntaxBlue/10 hover:text-syntaxBlue'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          {loading ? (
            <div className="text-center text-sm">Loading projects…</div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <div
                  key={project.id}
                  onClick={() =>
                    project.video_url
                      ? openVideo(project.video_url, project.title)
                      : (window.location.href = `/portfolio/${project.slug}`)
                  }
                  className="cursor-pointer bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl shadow-xl transform hover:-translate-y-1 hover:shadow-2xl transition block"
                >
                  <div className="h-40 overflow-hidden rounded-t-2xl relative">
                    <Image
                      src={project.image_url}
                      alt={`${project.title} – Syntax Tech web project`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1">{project.title}</h3>
                    {project.year && (
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                        {project.year}
                      </span>
                    )}
                    <p className="text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300 my-2 line-clamp-3">
                      {project.description}
                    </p>
                    {project.impact_metrics && (
                      <p className="text-[10px] font-semibold text-green-700 dark:text-green-400 mb-1">
                        {project.impact_metrics}
                      </p>
                    )}
                    <span className="inline-block bg-syntaxOrange/20 text-syntaxDark dark:text-syntaxCream text-[10px] font-semibold px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-10">
            <Link
              href="/book"
              className="
                bg-syntaxOrange hover:bg-orange-600 active:bg-orange-700
                text-black dark:text-white 
                font-semibold rounded-full px-6 py-3 transition 
                shadow-lg shadow-orange-300/30 inline-block text-xs sm:text-sm
              "
            >
              Let’s Build Yours
            </Link>
          </div>
        </div>

        {/* Video Overlay Modal */}
        {showVideo && selectedVideo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-3xl">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-syntaxOrange"
              >
                ×
              </button>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
                <video
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-white text-center mt-3 text-sm sm:text-base font-semibold">
                {selectedVideo.title}
              </h2>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

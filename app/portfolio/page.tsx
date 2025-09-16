'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  video_url?: string // ✅ added
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  // new state for video overlay
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

  // handle opening video overlay
  const openVideo = (url: string, title: string) => {
    setSelectedVideo({ url, title })
    setShowVideo(true)
  }

  return (
    <main className="bg-syntaxCream dark:bg-syntaxDark text-syntaxDark dark:text-syntaxCream min-h-screen px-6 py-20 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center">Our Portfolio</h1>
        <p className="text-lg mb-12 text-center max-w-2xl mx-auto">
          A showcase of our recent projects across web, branding and growth.
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-4xl transition shadow 
                ${
                  selectedCategory === cat
                    ? 'bg-syntaxBlue text-white dark:text-white'
                    : 'bg-white dark:bg-neutral-900 text-syntaxDark dark:text-syntaxCream hover:bg-syntaxBlue/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        {loading ? (
          <div className="text-center">Loading projects…</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                onClick={() =>
                  project.video_url
                    ? openVideo(project.video_url, project.title)
                    : (window.location.href = `/portfolio/${project.slug}`)
                }
                className="cursor-pointer bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-3xl shadow-2xl transform hover:-translate-y-1 hover:shadow-3xl transition block"
              >
                <div className="h-48 overflow-hidden rounded-t-3xl relative">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  {project.year && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {project.year}
                    </span>
                  )}
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 my-3 line-clamp-3">
                    {project.description}
                  </p>
                  {project.impact_metrics && (
                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">
                      {project.impact_metrics}
                    </p>
                  )}
                  <span className="inline-block bg-syntaxOrange/20 text-syntaxDark dark:text-syntaxCream text-xs font-semibold px-3 py-1 rounded-4xl">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/book"
            className="
              bg-syntaxOrange hover:bg-orange-600 active:bg-orange-700
              text-black dark:text-white 
              font-semibold rounded-4xl px-8 py-4 transition 
              shadow-lg shadow-orange-300/30 inline-block
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
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-syntaxOrange"
            >
              ×
            </button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              <video
                src={selectedVideo.url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-white text-center mt-4 text-xl font-semibold">{selectedVideo.title}</h2>
          </div>
        </div>
      )}
    </main>
  )
}

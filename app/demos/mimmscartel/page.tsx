'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { FiPhone, FiShoppingCart } from 'react-icons/fi'
import { SiWhatsapp, SiInstagram } from 'react-icons/si'
import Lenis from 'lenis'
import clsx from 'clsx'

// 🌈 Material UI + Chakra Imports
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { ChakraProvider, Badge } from '@chakra-ui/react'

const products = [
  {
    id: '1',
    title: 'The Fine Driver - Brown',
    price: '₦45,000',
    img: '/demos/mimmscartel/1.jpg',
    desc: 'Hand-finished leather driver — stylish & durable. Premium quality built to last.',
  },
  {
    id: '2',
    title: 'Classic Oxford - Black',
    price: '₦48,000',
    img: '/demos/mimmscartel/2.jpg',
    desc: 'Timeless silhouette for formal and smart-casual looks. A true gentleman’s piece.',
  },
  {
    id: '3',
    title: 'Casual Slip-on - Tan',
    price: '₦40,000',
    img: '/demos/mimmscartel/3.jpg',
    desc: 'Comfort-first everyday shoe, breathable and light for long wear.',
  },
  {
    id: '4',
    title: 'Handmade Loafer - Cognac',
    price: '₦52,000',
    img: '/demos/mimmscartel/4.jpg',
    desc: 'Premium stitchwork and leather — a luxury statement handcrafted with passion.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function MimmsCartelDemo() {
  const [selected, setSelected] = useState<string | null>(null)
  const isMobile = useMediaQuery('(max-width:768px)')

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 1.1 })
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  const whatsappNumber = '2349169381916'
  const whatsappText = encodeURIComponent(
    'Hi, I saw your shoes on this demo site and I want to order or ask a question.'
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (
    <ChakraProvider>
      <main className="min-h-screen bg-[#fffaf6] dark:bg-[#0b0b0b] text-[#0b0b0b] dark:text-[#fffaf6] selection:bg-black/80 selection:text-white">
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
          {/* 🦋 Hero Section */}
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Typography
                  variant={isMobile ? 'h4' : 'h3'}
                  fontWeight="bold"
                  gutterBottom
                  sx={{ lineHeight: 1.2 }}
                >
                  MimmsCartel —{' '}
                  <span className="text-amber-700">Handcrafted Shoes</span>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    fontSize: { xs: 14, md: 16 },
                  }}
                >
                  Every pair tells a story of craftsmanship and class. Hand-stitched,
                  bold, and made for confident Nigerian men.
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Button
                    href={whatsappLink}
                    target="_blank"
                    variant="contained"
                    startIcon={<SiWhatsapp />}
                    sx={{
                      bgcolor: '#25D366',
                      '&:hover': { bgcolor: '#1ebe5a' },
                      borderRadius: '9999px',
                      fontWeight: 600,
                      px: 3,
                    }}
                  >
                    Chat on WhatsApp
                  </Button>

                  <Button
                    href="#products"
                    variant="outlined"
                    startIcon={<FiShoppingCart />}
                    sx={{
                      borderRadius: '9999px',
                      borderColor: 'text.secondary',
                      fontWeight: 600,
                      px: 3,
                    }}
                  >
                    View Collection
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Link href="https://instagram.com/mimmscartel" target="_blank">
                    <SiInstagram
                      size={20}
                      className="opacity-70 hover:opacity-100 transition"
                    />
                  </Link>
                  <Link href={whatsappLink} target="_blank">
                    <SiWhatsapp
                      size={20}
                      className="opacity-70 hover:opacity-100 transition"
                    />
                  </Link>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
                  }}
                >
                  <Image
                    src="/demos/mimmscartel/hero.jpg"
                    alt="MimmsCartel Hero"
                    width={900}
                    height={700}
                    className="object-cover w-full h-auto hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* 🌟 Features Section */}
          <motion.div variants={container} initial="hidden" whileInView="show">
            <Grid container spacing={4} sx={{ mt: 10 }}>
              {[
                {
                  title: 'Premium Craftsmanship',
                  desc: 'Each shoe is handmade from the finest leathers for lasting comfort.',
                },
                {
                  title: 'Custom Fit',
                  desc: 'Choose your size, color, and finishing — made uniquely for you.',
                },
                {
                  title: 'Direct Orders',
                  desc: 'Browse easily and order instantly through WhatsApp. Simple.',
                },
              ].map((feature, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <motion.div variants={item} whileHover={{ scale: 1.05 }}>
                    <Box
                      sx={{
                        borderRadius: 5,
                        p: 3,
                        bgcolor: 'white',
                        boxShadow: 3,
                        '&:hover': { boxShadow: 6 },
                      }}
                      className="dark:bg-neutral-900"
                    >
                      <Typography fontWeight="bold" mb={1}>
                        {feature.title}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary">
                        {feature.desc}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* 🛍 Product Grid */}
          <Box id="products" sx={{ mt: 12 }}>
            <Typography variant="h4" align="center" fontWeight="bold" mb={6}>
              Featured <span className="text-amber-700">Collection</span>
            </Typography>

            <Grid container spacing={4}>
              {products.map((p) => (
                <Grid item xs={12} sm={6} md={3} key={p.id}>
                  <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.03}>
                    <Box
                      className="dark:bg-neutral-900"
                      sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: 3,
                        transition: 'all 0.4s ease',
                        '&:hover': {
                          boxShadow: 6,
                          transform: 'translateY(-5px)',
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative', height: 220 }}>
                        <Image
                          src={p.img}
                          alt={p.title}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-700"
                        />
                      </Box>

                      <Box sx={{ p: 2.5 }}>
                        <Typography fontWeight="600" fontSize={15}>
                          {p.title}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary" mb={1}>
                          {p.desc}
                        </Typography>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Badge
                            colorScheme="orange"
                            borderRadius="full"
                            px={3}
                            py={1}
                          >
                            {p.price}
                          </Badge>
                          <Button
                            href={whatsappLink}
                            target="_blank"
                            size="small"
                            startIcon={<SiWhatsapp />}
                            sx={{
                              bgcolor: '#25D366',
                              '&:hover': { bgcolor: '#1ebe5a' },
                              color: 'white',
                              borderRadius: '9999px',
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            Order
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Tilt>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* 🗣 Testimonials */}
          <Box sx={{ mt: 14 }}>
            <Typography variant="h5" align="center" fontWeight="bold" mb={4}>
              What Customers Say
            </Typography>
            <Grid container spacing={4}>
              {[
                { text: '“Excellent craftsmanship! These shoes turn heads.”', name: '— E. Obi' },
                { text: '“Great fit, solid feel, and fast delivery via WhatsApp.”', name: '— T. Ade' },
                { text: '“I’ve never worn something this comfortable and classy.”', name: '— J. Musa' },
              ].map((t, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Box
                    className="dark:bg-neutral-900"
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      boxShadow: 3,
                      bgcolor: 'white',
                      '&:hover': { boxShadow: 6 },
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontStyle="italic"
                    >
                      {t.text}
                    </Typography>
                    <Typography mt={2} fontWeight="bold" fontSize={13}>
                      {t.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* 🚀 Footer CTA */}
          <Box
            className="dark:bg-neutral-900"
            sx={{
              mt: 12,
              p: 5,
              borderRadius: 5,
              textAlign: 'center',
              boxShadow: 4,
              bgcolor: 'white',
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Want this kind of site for your brand?
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={4}
              maxWidth="600px"
              mx="auto"
            >
              We can build your full website with your brand, logo, and domain so
              customers can buy or contact you directly.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Button
                href={whatsappLink}
                target="_blank"
                variant="contained"
                startIcon={<SiWhatsapp />}
                sx={{
                  bgcolor: '#25D366',
                  '&:hover': { bgcolor: '#1ebe5a' },
                  borderRadius: '9999px',
                  fontWeight: 600,
                  px: 3,
                }}
              >
                Message Now
              </Button>
              <Button
                href="/book"
                variant="outlined"
                startIcon={<FiPhone />}
                sx={{ borderRadius: '9999px', fontWeight: 600, px: 3 }}
              >
                Request a Demo
              </Button>
            </Box>
          </Box>
        </Container>
      </main>
    </ChakraProvider>
  )
}

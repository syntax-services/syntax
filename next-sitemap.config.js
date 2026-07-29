module.exports = {
  siteUrl: 'https://syntax.com.ng',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://syntax.com.ng/sitemap.xml',
    ],
  },
  exclude: ['/admin*', '/api*'],
}

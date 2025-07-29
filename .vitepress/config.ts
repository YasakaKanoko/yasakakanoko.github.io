import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'

//每页的文章数量
const pageSize = 10
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  title: 'Atmosphere',
  description: "Banished Knight | 失乡骑士",
  lang: 'en-US',
  markdown: {
    // 数学公式
    math: true,
    // 图片懒加载
    image: {
      lazyLoading: true
    },
    // 显示三级标题
    toc: {
      level: [2, 3, 4]
    }
  },
  base: '/',
  cacheDir: './node_modules/vitepress_cache',
  ignoreDeadLinks: true,
  head: [
    [
      'link',
      // favicon.ico
      { rel: 'icon', href: 'https://www.loliapi.com/acg/pp/' }
    ]
  ],
  themeConfig: {
    posts: await getPosts(pageSize),
    logo: 'https://www.loliapi.com/acg/pp/',
    website: 'https://yasakakanoko.github.io/', // copyright link
    // 评论的仓库地址
    comment: {
      repo: 'YasakaKanoko/yasakakanoko.github.io',
      repoId: 'R_kgDOPClF3g',
      categoryId: 'DIC_kwDOPClF3s4CsFX1',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Category', link: '/pages/category' },
      { text: 'Archives', link: '/pages/archives' },
      { text: 'Tags', link: '/pages/tags' },
      { text: 'About', link: '/pages/about' }
      // { text: 'Airene', link: 'http://airene.net' }  -- External link test
    ],
    search: {
      provider: 'local',
    },
    //outline:[2,3],
    outlineTitle: '文章摘要',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/YasakaKanoko' },
      { icon: 'x', link: 'https://x.com/yasakakanoko' },
      { icon: 'telegram', link: 'https://t.me/yasakakanoko' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/shuiyuan5173.bsky.social' },
    ],
  },

  srcExclude: isProd
    ? [
      '**/trash/**/*.md', // 排除所有 trash 目录
      '**/draft/**/*.md', // 递归排除子目录
      '**/private-notes/*.md', // 排除特定文件
      'README.md'
    ]
    : ['README.md'],// exclude the README.md , needn't to compiler

  vite: {
    //build: { minify: false }
    server: { port: 5000 }
  }
  /*
    optimizeDeps: {
        keepNames: true
    }
    */
})

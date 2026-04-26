Day 22 - Vue made me delete half my React boilerplate. Here's what 100 KB of JS can actually do.


🚀TechFromZero Series - VueFromZero


🌐 Try it live: https://vue-from-zero.vercel.app


This isn't a Hello World. It's a real recipe finder that talks to my Day 18 Laravel API:
📐 Browser → vue-router → View → Composition API → fetch client → Day 18 Laravel API → TheMealDB


🔗 The full code (with step-by-step commits you can follow):
https://github.com/dev48v/vue-from-zero


🧱 What I built (step by step):
1️⃣ Vite + Vue 3.5 + TypeScript scaffold with one tsconfig and a single CSS file - no UI kit

2️⃣ Domain types + a fetch wrapper that unwraps Laravel's data envelope and surfaces a typed ApiError

3️⃣ vue-router 4 with five lazy-loaded routes - the first paint only ships the home page bundle

4️⃣ App.vue layout shell - sticky header, nav with active highlights, fade transition between routes

5️⃣ Search page with a 280 ms debounce that syncs the committed query to the URL so deep links work

6️⃣ Recipe detail page reading :id from the route - ingredients, method, source, YouTube link

7️⃣ Categories index plus per-category listing reusing one RecipeCard component across three views

8️⃣ Random recipe page with a spin-again button + Vercel SPA rewrite so deep links never 404


💡 Every file has detailed comments explaining WHY, not just what. Written for any beginner who wants to learn Vue.js by reading real code - with full clarity on each step.


👉 If you're a beginner learning Vue.js, clone it and read the commits one by one. Each commit = one concept. Each file = one lesson. Built from scratch, so nothing is hidden.


🔥 This is Day 22 of a 50-day series. A new technology every day. Follow along!


🌐 See all days: https://dev48v.infy.uk/techfromzero.php


#TechFromZero #Day22 #VueJS #LearnByDoing #OpenSource #BeginnerGuide #100DaysOfCode #CodingFromScratch

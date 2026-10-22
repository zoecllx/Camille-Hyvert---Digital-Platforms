/* ------------------------------------------------------------------
   All course content lives here. Edit this file to update the site.
   Anything in [brackets] is a placeholder still to be filled in.
------------------------------------------------------------------- */

// The 10 platform types from Session 1, shared by every Platform Matchmaker question
var PLATFORM_TYPES = ['Social Media Marketing', 'Influencer & Creator Marketing', 'Content Marketing & GenAI Production', 'Email, CRM & Messaging', 'Search: SEO, SEM & GEO', 'Programmatic & Retail Media', 'Affiliate & Social Commerce', 'Mobile Marketing & Super-apps', 'Marketing Automation & AI Agents', 'Marketing Analytics & Measurement'];

// Small helpers so each question below stays on a few lines
function match(title, answer, explain) {
  return { title: title, prompt: 'Which platform type does this belong to?', options: PLATFORM_TYPES, answer: answer, explain: explain };
}
function higherLower(title, guess, answer, reveal, explain) {
  return { title: title, prompt: 'Our guess: ' + guess + '. Is the real figure higher or lower?', options: ['Higher', 'Lower'], answer: answer, explain: 'Real figure: ' + reveal + '. ' + explain };
}
function oldOrAi(title, answer, explain) {
  return { title: title, prompt: 'Is this how marketing worked before AI, or part of the AI shift?', options: ['Before AI', 'The AI Shift'], answer: answer, explain: explain };
}
function pick(options, prompt) {
  return function (title, answer, explain) { return { title: title, prompt: prompt, options: options, answer: answer, explain: explain }; };
}
var whichFile = pick(['index.html', 'styles.css', 'script.js'], 'Which file would you open?');
var gitTerm = pick(['Fork', 'Clone', 'Commit', 'Push', 'Pull Request', 'Merge'], 'Which GitHub term is this?');
var stackType = pick(['Point tool', 'Platform', 'Suite', 'Hub', 'AI copilot / agent'], 'Which type of tool is this?');
var adTool = pick(['TikTok', 'Meta', 'LinkedIn', 'YouTube', 'X'], 'Which ad manager does this feature belong to?');

window.COURSE = {
  objectives: [
    { title: 'Map the digital marketing platform landscape', text: 'Tell the 10 platform types apart and match a brand case to the right one.' },
    { title: 'Read the Singapore market in numbers', text: 'Use 2026 market figures to size channels and back up recommendations.' },
    { title: 'Explain how AI is changing marketing work', text: 'Compare the old way and the AI way across targeting, search and production.' },
    { title: 'Prototype with vibe coding and martech tools', text: 'Build and test a simple marketing tool without a development team.' }
  ],

  glance: [
    ['Programme', 'MSc Marketing Management & Digital'],
    ['Campus', 'ESSEC Asia-Pacific, Singapore'],
    ['Instructor', 'Madina Kalyayeva'],
    ['Format', '5 sessions · lectures, a guest lecture, a game after each class'],
    ['Assessment', '[Assessment details]']
  ],

  // open: true = game playable; false = shows the "locked" page
  sessions: [
    { n: 1, date: '2 Oct 2026', title: 'Digital Marketing Platforms in the AI Era', format: 'Lecture', speaker: 'Madina Kalyayeva', open: true,
      summary: "The 10 types of digital marketing platforms, Singapore's 2026 numbers, and how AI is changing targeting, search and production." },
    { n: 2, date: '9 Oct 2026', title: 'Vibe Coding & Martech', format: 'Guest lecture + lecture', speaker: 'LaunchLab · Madina Kalyayeva', open: true,
      summary: "LaunchLab's Design → Build → Deploy workflow (Claude Design, Claude Code, GitHub, Vercel), then the martech stack: point tools, platforms, suites, hubs and AI agents." },
    { n: 3, date: '[Date]', title: 'Guest speaker session', format: 'Guest lecture', speaker: '[Guest speaker]', open: false, summary: '' },
    { n: 4, date: '[Date]', title: '[Session 4 topic]', format: 'Lecture', speaker: 'Madina Kalyayeva', open: false, summary: '' },
    { n: 5, date: '[Date]', title: '[Session 5 topic]', format: 'Lecture', speaker: 'Madina Kalyayeva', open: false, summary: '' }
  ],

  // readings.prof[session] / readings.guest[session] — url: '#' until real links are added
  readings: {
    prof: {
      1: [
        { kind: 'Slides', title: 'Digital Marketing Platforms in the AI Era — lecture slides', meta: 'Madina Kalyayeva · PDF', url: '#', action: 'Open' },
        { kind: 'Required', title: '[Required reading title]', meta: '[Author, year · source]', url: '#', action: 'Read' },
        { kind: 'Further', title: '[Further reading title]', meta: '[Author, year · source]', url: '#', action: 'Read' }
      ],
      2: [
        { kind: 'Slides', title: 'Digital Marketing Tools & Their Use for Marketers — lecture slides', meta: 'Madina Kalyayeva · PDF', url: '#', action: 'Open' },
        { kind: 'Required', title: '[Required reading title]', meta: '[Author, year · source]', url: '#', action: 'Read' }
      ],
      4: [{ kind: 'Slides', title: '[Session 4 lecture slides]', meta: 'Madina Kalyayeva · PDF', url: '#', action: 'Open' }],
      5: [{ kind: 'Slides', title: '[Session 5 lecture slides]', meta: 'Madina Kalyayeva · PDF', url: '#', action: 'Open' }]
    },
    guest: {
      2: [
        { kind: 'Talk', title: 'Vibe coding: Claude Design, Claude Code, GitHub and Vercel', meta: 'LaunchLab · PDF', url: '#', action: 'Open' },
        { kind: 'Example', title: 'LaunchLab example site', meta: 'essec-homework.vercel.app', url: 'https://essec-homework.vercel.app/', action: 'Open' }
      ],
      3: [
        { kind: 'Talk', title: '[Guest lecture title]', meta: '[Guest speaker, role · company]', url: '#', action: 'Open' },
        { kind: 'Recommended', title: '[Reading recommended by the speaker]', meta: '[Author, year · source]', url: '#', action: 'Read' }
      ]
    }
  },

  /* Games, keyed by session number. Each round has questions; `points` per question.
     A question has title, prompt, options, answer, explain.
     A typed-answer question has `accept` (a list of accepted answers) instead of `options`.
     The question count and the max score are calculated from the questions. */
  games: {
    1: {
      takeaway: 'Platforms evolve quickly — stay updated and adapt to new tools in an AI-driven industry.',
      rounds: [
        { name: 'Platform Matchmaker', desc: 'Match each case to one of the 10 platform types', points: 1,
          questions: [
            match("Agoda's 2025 Singapore flight ads, made in-house with GenAI (Veo, Runway, Kling)", 'Social Media Marketing',
              'The ads ran on YouTube, Meta and TikTok, so this was the paid social example. GenAI was how they were produced; social feeds were where they ran.'),
            match('La Roche-Posay beauty influencers hosting live Instagram tutorials in Singapore', 'Influencer & Creator Marketing',
              "Trusted creators give social proof. Singapore's influencer spend grew 12.9% to US$119M in 2025."),
            match("Cathay Pacific's blog of travel guides to Asian destinations", 'Content Marketing & GenAI Production',
              "Useful organic content that builds long-term engagement, and it's the kind of content AI answer engines quote."),
            match('Zalora\'s "Wishlist Reminders"', 'Email, CRM & Messaging',
              'Retention built on 1st-party data: a personalised nudge back to the items customers saved.'),
            match('Lazada Google Ads targeting "best Ramadan discounts" in Indonesia', 'Search: SEO, SEM & GEO',
              'Paid search (SEM) captures high-intent demand at the moment people are looking.'),
            match('WPP Media × GrabAds using anonymised transaction + location signals across 6 SEA markets', 'Programmatic & Retail Media',
              'Retail media puts ads next to real purchase data, planned and bought at scale.'),
            match("Guardian's Singapore beauty influencers embedding referral links in their vlogs", 'Affiliate & Social Commerce',
              'Referral links mean pay-for-performance, which is the core of affiliate marketing.'),
            match('Nestlé × Lazada piloting the LazzieChat AI shopping assistant', 'Mobile Marketing & Super-apps',
              "An AI assistant inside the super-app's own shopping experience (SG, MY, ID – Apr 2026)."),
            match('Singapore Airlines × Salesforce Agentforce for customer service', 'Marketing Automation & AI Agents',
              'Agentforce-powered AI tools scale customer service around the clock (Mar 2025).'),
            match('Lazada using Adobe Analytics across Southeast Asia', 'Marketing Analytics & Measurement',
              'Enterprise analytics across SEA. The more AI buys media for you, the more you need independent proof of what worked.')
          ] },
        { name: 'Higher or Lower: Singapore 2026', desc: 'Market figures, head to head', points: 1,
          questions: [
            higherLower("Share of Singapore's population using social media", '75%', 'Higher', '90.6% (5.33 million users)', 'Almost everyone is reachable on social.'),
            higherLower('Share of adults (18+) in Singapore using social media', '99%', 'Lower', '95.3%', 'Very high, but not quite everyone.'),
            higherLower('Hours a week Singaporeans spend on social media', '10 hours', 'Higher', '~17 hours, across 7.4 platforms', "That's over 2 hours a day, spread across many platforms."),
            higherLower('Singaporeans who use ChatGPT every month', '1 in 10', 'Higher', '1 in 3', 'AI assistants are now a mainstream channel for discovery.'),
            higherLower('Share of AI referral traffic in Singapore that comes from ChatGPT', '50%', 'Higher', '75%+', 'ChatGPT dominates AI referrals, so track it as a traffic source in your analytics.'),
            higherLower("Online adults in Singapore worried about what's real vs fake online", '85%', 'Lower', '71.1%', 'Still a large majority. Trust is the new currency: label AI content and protect authenticity.'),
            higherLower('Mobile connections in Singapore, as a % of the population', '100%', 'Higher', '166% (9.79M connections)', 'Many people have more than one connection (work phone, tablet, smartwatch).'),
            higherLower('Singapore influencer marketing spend in 2025', 'US$200M', 'Lower', 'US$119M (+12.9%)', "It's smaller than you might think, but it's growing fast."),
            higherLower('Video & live commerce share of SEA platform e-commerce GMV in 2025', '20%', 'Higher', '32% (up from 20%)', "20% was last year's share. Shoppable video and LIVE are growing quickly."),
            higherLower('Click rate on search results WITH an AI summary (vs 15% without)', '15%', 'Lower', '8% (Pew, 2025)', "When the AI answers first, people click less. That's why brands now compete to be cited (GEO).")
          ] },
        { name: 'Old Way vs AI Way', desc: 'How AI changes each workflow', points: 1,
          questions: [
            oldOrAi('Picking audiences by location, job title, interests, age', 'Before AI', 'Manual targeting: you chose the audience yourself.'),
            oldOrAi('Meta Advantage+, Google PMax, TikTok Smart+ find the audience; your creative is the targeting', 'The AI Shift', 'AI buying picks audience, placement and budget. You set the goals, data and creative.'),
            oldOrAi('Search engines list links that users click', 'Before AI', 'The classic "ten blue links" era.'),
            oldOrAi('AI Overviews and ChatGPT answer first; brands compete to be cited (GEO)', 'The AI Shift', 'Search → Answers. Generative Engine Optimisation is about being the brand the AI names.'),
            oldOrAi('One ad made per campaign', 'Before AI', 'One idea, one execution.'),
            oldOrAi('GenAI turns one idea into hundreds of ad versions', 'The AI Shift', 'Production → GenAI: Veo, Runway, Kling, Firefly and TikTok Symphony version ideas in days.'),
            oldOrAi('Ads only in feeds and search results', 'Before AI', 'The traditional ad inventory.'),
            oldOrAi('Ads in Google AI Overviews (SG, Dec 2025) and ChatGPT Ads (SG, Sep 2026)', 'The AI Shift', 'AI answers have become a new kind of ad space.')
          ] },
        { name: 'Bonus Question', desc: 'One final question, double points', points: 2,
          questions: [
            { title: 'Name the 8th benchmarking metric added for the AI era', prompt: 'Type your answer. Hint: how often do ChatGPT, Gemini and Perplexity mention your brand?',
              accept: ['ai visibility', 'visibility', 'ai share of voice', 'share of ai answers'], answer: 'AI Visibility',
              explain: 'AI Visibility = share of AI answers mentioning your brand, AI-assistant referral traffic, and sentiment in AI summaries.' }
          ] }
      ],
      // score thresholds (percentage) → badge
      badges: [
        { min: 80, name: 'AI-Era Marketing Pro', message: "Impressive. You'd brief an agency on AI-era platforms tomorrow." },
        { min: 50, name: 'Platform Strategist', message: 'Solid grasp of the landscape — review the readings to close the gaps.' },
        { min: 0, name: 'Platform Explorer', message: 'A good start. Revisit the session slides and play again.' }
      ]
    },

    2: {
      takeaway: 'Pick tools that share clean data with each other — AI is only as good as what it can connect to. Then ship it: Design → Build → Deploy.',
      rounds: [
        { name: 'Which File Do I Open?', desc: 'HTML is the words, CSS the look, JS the behaviour', points: 1,
          questions: [
            whichFile('Change the text on your main button', 'index.html', 'The words people read live in the HTML.'),
            whichFile('Make that button orange', 'styles.css', 'Colours, fonts and spacing belong to CSS.'),
            whichFile("Make the button do something when it's clicked", 'script.js', 'Behaviour (clicks, typing, submit) is JavaScript, using addEventListener.'),
            whichFile('Stack the layout into one column on a phone', 'styles.css', 'A CSS media query changes the layout on small screens.'),
            whichFile('Add a new heading and paragraph to the About section', 'index.html', 'New structure (headings, paragraphs) goes in HTML.'),
            whichFile('Show "Correct!" when someone submits an answer', 'script.js', "Reacting to a submit is behaviour, so it's JS."),
            whichFile('Change the font of every heading on the site', 'styles.css', 'One CSS rule like h1, h2 { font-family: … } changes them all.'),
            whichFile("Keep track of a player's score", 'script.js', 'Stored values (state) that change while you play live in JS, like the score in this game.')
          ] },
        { name: 'Git & Deploy Lingo', desc: 'Fork, clone, commit, push, pull request, merge', points: 1,
          questions: [
            gitTerm("Make your own copy of someone else's repo on your GitHub account", 'Fork', 'You can change a fork without affecting the original.'),
            gitTerm('Copy a repo from GitHub down onto your computer to edit the files locally', 'Clone', 'Clone = GitHub → your laptop.'),
            gitTerm("Save a snapshot of your changes with a short note. It's only on your computer for now.", 'Commit', 'A commit saves locally, NOT on GitHub yet.'),
            gitTerm('Send the commits saved on your computer up to GitHub', 'Push', 'Push updates the online copy, and Vercel then redeploys your site.'),
            gitTerm('Propose your changes and ask teammates to review them first', 'Pull Request', 'A PR is a request for review. Others can comment, suggest, approve or reject.'),
            gitTerm('Approve a pull request and combine it into the main version', 'Merge', 'Merging brings the reviewed changes into main.'),
            gitTerm("You're working solo on your own branch and you're confident. Fastest way to get it online?", 'Push', 'Direct action, no waiting for approval.'),
            gitTerm('Each one of these gets its own Vercel preview link', 'Pull Request', 'Your team can see the changes live before merging.')
          ] },
        { name: 'Build the Martech Stack', desc: 'Point tools, platforms, suites, hubs and AI agents', points: 1,
          questions: [
            stackType('Mailchimp for email campaigns', 'Point tool', 'Built for one specific marketing function.'),
            stackType('Meltwater or Brand24 for social listening', 'Point tool', 'Best in class for one job, and most now have built-in AI features.'),
            stackType('Salesforce Data 360 (formerly Data Cloud), a customer data platform', 'Platform', 'Covers a broad range in 1–2 areas, offered as services through an API.'),
            stackType('Oracle Eloqua, Adobe Marketo Engage, HubSpot', 'Suite', 'Several products from one provider, with integration built in (and now AI agents like HubSpot Breeze).'),
            stackType('A central portal unifying operations, collaboration, data integration and analytics', 'Hub', "Those are the hub's 4 capabilities."),
            stackType('Meta Business Agent answering questions and closing sales on WhatsApp', 'AI copilot / agent', 'Agents take a goal, plan the steps and act across tools (1M+ businesses, Jun 2026).'),
            stackType('ChatGPT, Claude or Gemini drafting your briefs, copy and reports', 'AI copilot / agent', 'Copilots help marketers work faster, sitting on top of the rest of the stack.'),
            stackType('Pro: quick to set up for one well-defined task. Con: one more vendor to manage.', 'Point tool', 'Classic point-tool trade-off.'),
            stackType('Pro: the provider handles integration. Con: add-on modules may not be best in class.', 'Suite', 'Suites trade best-in-class features for compatibility.'),
            stackType('Pro: custom apps and extensions via API. Con: dependence on a single vendor.', 'Platform', 'Flexible, but slower to implement and risky to rely on.')
          ] },
        { name: 'Whose Ad Tool Is It?', desc: 'TikTok, Meta, LinkedIn, YouTube or X', points: 1,
          questions: [
            adTool('Symphony: AI makes and translates videos', 'TikTok', 'TikTok Symphony also generates avatars and localises videos.'),
            adTool('Spark Ads: boost organic posts directly from creators', 'TikTok', "It turns creators' best posts into ads."),
            adTool('Advantage+ Creative: GenAI makes image, text & video variations', 'Meta', "Part of Meta's Advantage+ automation."),
            adTool('Business Agent: an AI agent selling on WhatsApp, IG & Messenger', 'Meta', 'Launched June 2026.'),
            adTool('Accelerate: AI builds and auto-optimises B2B campaigns', 'LinkedIn', "LinkedIn's AI campaign builder."),
            adTool('Lead Gen Forms: capture leads without users leaving the app', 'LinkedIn', 'A favourite for B2B lead generation.'),
            adTool("Thought Leader Ads: promote your employees' posts in the feed", 'LinkedIn', 'Brand and employee voices, boosted.'),
            adTool("Peak Points (Gemini): ads placed right after a video's most engaging moment", 'YouTube', 'AI chooses the moment when attention is highest.'),
            adTool('Skippable in-stream: skip after 5 sec, pay on a 30-sec view or a click', 'YouTube', 'The classic YouTube format.'),
            adTool('Grok writes ad copy & visuals from your URL, then reviews results', 'X', 'Grok inside X Ads Manager.')
          ] },
        { name: 'Bonus Question', desc: 'One final question, double points', points: 2,
          questions: [
            { title: 'Every time you ____ to GitHub, Vercel rebuilds your live site automatically', prompt: 'Type the missing word. Hint: it comes after commit.',
              accept: ['push', 'git push', 'pushing'], answer: 'Push',
              explain: 'Connect your repo to Vercel once. After that, every push redeploys the site, so you never upload anything by hand again.' }
          ] }
      ],
      badges: [
        { min: 80, name: 'Vibe-Coding Martech Pro', message: 'Design → Build → Deploy, and you know what goes in the stack.' },
        { min: 50, name: 'Stack Builder', message: 'You can talk tools with developers and martech vendors.' },
        { min: 0, name: 'Git Hatchling', message: 'A good start. Replay the lingo round and it will stick.' }
      ]
    }
  }
};

// Fill in each round's question count and each game's max score from the questions above
Object.keys(window.COURSE.games).forEach(function (n) {
  var game = window.COURSE.games[n];
  game.maxScore = 0;
  game.rounds.forEach(function (r) {
    r.count = r.questions.length;
    game.maxScore += r.count * r.points;
  });
});

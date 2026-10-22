/* ------------------------------------------------------------------
   All course content lives here. Edit this file to update the site.
   Anything in [brackets] is a placeholder still to be filled in.
------------------------------------------------------------------- */

// Small helpers so each question below fits on a few lines
function hl(prompt, guess, guessValue, real, realValue, explain) {
  return { prompt: prompt, a: { label: 'Our guess', value: guessValue, display: guess }, b: { label: 'Real figure', value: realValue, display: real }, explain: explain };
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

  /* Games, keyed by session number.
     Round types:
       'choice'      — pick one option.   { title, prompt, options[], answer, explain }
       'oldai'       — Old way or AI way? { statement, answer: 'old' | 'ai', explain }
       'higherlower' — is B higher or lower than A?
                       { prompt, a: { label, value, display }, b: { label, value, display }, explain }
     Rounds with no questions yet are listed on the hub but skipped when playing. */
  games: {
    1: {
      secondsPerQuestion: 20,
      takeaway: 'Platforms evolve quickly — stay updated and adapt to new tools in an AI-driven industry.',
      rounds: [
        { name: 'Platform Matchmaker', desc: 'Match each case to one of the 10 platform types', type: 'choice', points: 1,
          how: 'Read the case, pick the platform type. Beat the clock.',
          questions: [
            { title: "Agoda's 2025 Singapore flight ads, made in-house with GenAI (Veo, Runway, Kling)", prompt: 'Which platform type does this belong to?',
              answer: 'Social Media Marketing',
              explain: 'The ads ran on YouTube, Meta and TikTok, so this was the paid social example. GenAI was how they were produced; social feeds were where they ran.' },
            { title: 'La Roche-Posay beauty influencers hosting live Instagram tutorials in Singapore', prompt: 'Which platform type does this belong to?',
              answer: 'Influencer & Creator Marketing',
              explain: "Trusted creators give social proof. Singapore's influencer spend grew 12.9% to US$119M in 2025." },
            { title: "Cathay Pacific's blog of travel guides to Asian destinations", prompt: 'Which platform type does this belong to?',
              answer: 'Content Marketing & GenAI Production',
              explain: "Useful organic content that builds long-term engagement, and it's the kind of content AI answer engines quote." },
            { title: 'Zalora\'s "Wishlist Reminders"', prompt: 'Which platform type does this belong to?',
              answer: 'Email, CRM & Messaging',
              explain: 'Retention built on 1st-party data: a personalised nudge back to the items customers saved.' },
            { title: 'Lazada Google Ads targeting "best Ramadan discounts" in Indonesia', prompt: 'Which platform type does this belong to?',
              answer: 'Search: SEO, SEM & GEO',
              explain: 'Paid search (SEM) captures high-intent demand at the moment people are looking.' },
            { title: 'WPP Media × GrabAds using anonymised transaction + location signals across 6 SEA markets', prompt: 'Which platform type does this belong to?',
              answer: 'Programmatic & Retail Media',
              explain: 'Retail media puts ads next to real purchase data, planned and bought at scale.' },
            { title: "Guardian's Singapore beauty influencers embedding referral links in their vlogs", prompt: 'Which platform type does this belong to?',
              answer: 'Affiliate & Social Commerce',
              explain: 'Referral links mean pay-for-performance, which is the core of affiliate marketing.' },
            { title: 'Nestlé × Lazada piloting the LazzieChat AI shopping assistant', prompt: 'Which platform type does this belong to?',
              answer: 'Mobile Marketing & Super-apps',
              explain: "An AI assistant inside the super-app's own shopping experience (SG, MY, ID – Apr 2026)." },
            { title: 'Singapore Airlines × Salesforce Agentforce for customer service', prompt: 'Which platform type does this belong to?',
              answer: 'Marketing Automation & AI Agents',
              explain: 'Agentforce-powered AI tools scale customer service around the clock (Mar 2025).' },
            { title: 'Lazada using Adobe Analytics across Southeast Asia', prompt: 'Which platform type does this belong to?',
              answer: 'Marketing Analytics & Measurement',
              explain: 'Enterprise analytics across SEA. The more AI buys media for you, the more you need independent proof of what worked.' }
          ] },
        { name: 'Higher or Lower: Singapore 2026', desc: 'Market figures, head to head', type: 'higherlower', points: 1,
          how: 'Is the real figure higher or lower than our guess? Use the buttons or your ↑ ↓ keys.',
          questions: [
            hl("Share of Singapore's population using social media", '75%', 75, '90.6%', 90.6, '5.33 million users: almost everyone is reachable on social.'),
            hl('Share of adults (18+) in Singapore using social media', '99%', 99, '95.3%', 95.3, 'Very high, but not quite everyone.'),
            hl('Hours a week Singaporeans spend on social media', '10 h', 10, '~17 h', 17, "Across 7.4 platforms: that's over 2 hours a day."),
            hl('Singaporeans who use ChatGPT every month', '1 in 10', 10, '1 in 3', 33, 'AI assistants are now a mainstream channel for discovery.'),
            hl('Share of AI referral traffic in Singapore that comes from ChatGPT', '50%', 50, '75%+', 75, 'ChatGPT dominates AI referrals, so track it as a traffic source in your analytics.'),
            hl("Online adults in Singapore worried about what's real vs fake online", '85%', 85, '71.1%', 71.1, 'Still a large majority. Trust is the new currency: label AI content and protect authenticity.'),
            hl('Mobile connections in Singapore, as a % of the population', '100%', 100, '166%', 166, '9.79M connections: many people have more than one (work phone, tablet, smartwatch).'),
            hl('Singapore influencer marketing spend in 2025', 'US$200M', 200, 'US$119M', 119, "Up 12.9%: smaller than you might think, but growing fast."),
            hl('Video & live commerce share of SEA platform e-commerce GMV in 2025', '20%', 20, '32%', 32, "20% was last year's share. Shoppable video and LIVE are growing quickly."),
            hl('Click rate on search results WITH an AI summary (vs 15% without)', '15%', 15, '8%', 8, "Pew, 2025. When the AI answers first, people click less, so brands now compete to be cited (GEO).")
          ] },
        { name: 'Old Way vs AI Way', desc: 'How AI changes each workflow', type: 'oldai', points: 1,
          how: 'Old way or AI way? Use the buttons or your ← → keys.',
          questions: [
            { statement: 'Picking audiences by location, job title, interests, age', answer: 'old', explain: 'Manual targeting: you chose the audience yourself.' },
            { statement: 'Meta Advantage+, Google PMax, TikTok Smart+ find the audience; your creative is the targeting', answer: 'ai', explain: 'AI buying picks audience, placement and budget. You set the goals, data and creative.' },
            { statement: 'Search engines list links that users click', answer: 'old', explain: 'The classic "ten blue links" era.' },
            { statement: 'AI Overviews and ChatGPT answer first; brands compete to be cited (GEO)', answer: 'ai', explain: 'Search → Answers. Generative Engine Optimisation is about being the brand the AI names.' },
            { statement: 'One ad made per campaign', answer: 'old', explain: 'One idea, one execution.' },
            { statement: 'GenAI turns one idea into hundreds of ad versions', answer: 'ai', explain: 'Production → GenAI: Veo, Runway, Kling, Firefly and TikTok Symphony version ideas in days.' },
            { statement: 'Ads only in feeds and search results', answer: 'old', explain: 'The traditional ad inventory.' },
            { statement: 'Ads in Google AI Overviews (SG, Dec 2025) and ChatGPT Ads (SG, Sep 2026)', answer: 'ai', explain: 'AI answers have become a new kind of ad space.' }
          ] },
        { name: 'Bonus Question', desc: 'One final question, double points', type: 'choice', points: 2,
          how: 'One last question — worth double.',
          questions: [
            { title: 'Which benchmarking metric was added as the 8th, for the AI era?', prompt: 'Choose one.',
              options: ['AI Visibility', 'Engagement', 'Awareness', 'Relationship'],
              answer: 'AI Visibility',
              explain: 'AI Visibility = share of AI answers mentioning your brand, AI-assistant referral traffic, and sentiment in AI summaries.' }
          ] }
      ],
      // percentage thresholds → badge
      badges: [
        { min: 80, name: 'AI-Era Marketing Pro', message: "Impressive. You'd brief an agency on AI-era platforms tomorrow." },
        { min: 50, name: 'Platform Strategist', message: 'Solid grasp of the landscape — review the readings to close the gaps.' },
        { min: 0, name: 'Platform Explorer', message: 'A good start. Revisit the session slides and play again.' }
      ]
    },

    2: {
      secondsPerQuestion: 20,
      takeaway: 'Pick tools that share clean data with each other — AI is only as good as what it can connect to. Then ship it: Design → Build → Deploy.',
      rounds: [
        { name: 'Which File Do I Open?', desc: 'HTML is the words, CSS the look, JS the behaviour', type: 'choice', points: 1,
          how: 'index.html, styles.css or script.js? Pick the file you would edit.',
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
        { name: 'Git & Deploy Lingo', desc: 'Fork, clone, commit, push, pull request, merge', type: 'choice', points: 1,
          how: 'Match each description to the right GitHub term.',
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
        { name: 'Build the Martech Stack', desc: 'Point tools, platforms, suites, hubs and AI agents', type: 'choice', points: 1,
          how: 'Point tool, platform, suite, hub, or the new AI layer?',
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
        { name: 'Whose Ad Tool Is It?', desc: 'TikTok, Meta, LinkedIn, YouTube or X', type: 'choice', points: 1,
          how: 'Each feature belongs to one ad manager. Which one?',
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
        { name: 'Bonus Question', desc: 'One final question, double points', type: 'choice', points: 2,
          how: 'One last question — worth double.',
          questions: [
            { title: 'Every time you ____ to GitHub, Vercel rebuilds your live site automatically', prompt: 'Which word fills the blank?',
              options: ['Push', 'Commit', 'Clone', 'Fork'],
              answer: 'Push',
              explain: 'Connect your repo to Vercel once. After that, every push redeploys the site, so you never upload anything by hand again.' }
          ] }
      ],
      badges: [
        { min: 80, name: 'Vibe-Coding Martech Pro', message: 'Design → Build → Deploy, and you know what goes in the stack.' },
        { min: 50, name: 'Stack Builder', message: 'You can talk tools with developers and martech vendors.' },
        { min: 0, name: 'Git Hatchling', message: 'A good start. Replay the lingo round and it will stick.' }
      ]
    }
  },

  // The 10 platform types — default options for 'choice' questions that don't list their own
  platformTypes: ['Social Media Marketing', 'Influencer & Creator Marketing', 'Content Marketing & GenAI Production', 'Email, CRM & Messaging', 'Search: SEO, SEM & GEO', 'Programmatic & Retail Media', 'Affiliate & Social Commerce', 'Mobile Marketing & Super-apps', 'Marketing Automation & AI Agents', 'Marketing Analytics & Measurement']
};

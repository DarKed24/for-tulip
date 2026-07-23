/* ============================================================
   EVERYTHING PERSONAL LIVES IN THIS FILE.
   Edit the text below, save, push — the site updates.
   Defaults are written so the site still reads sweetly
   even before you personalize it.
   ============================================================ */

const CONFIG = {
  name: "Tulip",
  age: 19,

  // Midnight at the very start of her birthday (local time).
  birthdayISO: "2026-07-24T00:00:00",

  // Add ?sneakpeek to the URL to skip the countdown (for you only).
  previewKey: "sneakpeek",

  hero: {
    kicker: "it's finally your day",
    title: "Happy 19th, Tulip",
    tagline: "I grew you a garden. It only blooms for you.",
  },

  garden: {
    title: "A Garden of Nineteen",
    intro:
      "Nineteen tulips — one for every year of you. Tap each bud and it will bloom into something I've been meaning to say.",
    // Exactly 19 notes. Replace each with a memory, a reason, an inside joke.
    notes: [
      "You make ordinary days feel like small celebrations.",
      "Your laugh is my favourite sound on campus.",
      "You always know when I need five more minutes of talking.",
      "You're the smartest person I know, and somehow also the kindest.",
      "The way you get excited about tiny things makes me love the world more.",
      "You remember the little details everyone else forgets.",
      "You make even boring lectures feel survivable.",
      "You're braver than you give yourself credit for.",
      "Every playlist is better when you've touched it.",
      "You turn 'I'm bored' into the best evenings.",
      "You listen like what I'm saying actually matters. It's rare.",
      "Your hugs recalibrate my whole week.",
      "You make me want to be more patient, more curious, more kind.",
      "Nobody roasts me better, and nobody defends me harder.",
      "You're the first person I want to tell everything to.",
      "Watching you chase what you love is my favourite show.",
      "You feel like home in a place far from home.",
      "Eighteen suited you. Nineteen is going to adore you.",
      "I like you. I love you. I choose you — again and again.",
    ],
  },

  studio: {
    title: "The Paper Tulip Studio",
    intro:
      "You asked me for paper tulips. I am — tragically — terrible at origami. So I built you a studio where the folds always come out perfect, and the bouquet never wilts. Fold as many as you like; they're all yours.",
  },

  gallery: {
    title: "Us, so far",
    intro: "A few frames from the story so far. Many more to come.",
    // Drop images into the photos/ folder and reference them here.
    // Leave src as "" for a pretty placeholder frame.
    photos: [
      { src: "", caption: "the day it all started" },
      { src: "", caption: "that one evening" },
      { src: "", caption: "your favourite place" },
      { src: "", caption: "my favourite person" },
      { src: "", caption: "partners in crime" },
      { src: "", caption: "many more to come" },
    ],
  },

  panda: {
    // The little red panda in the corner. Tap him and he talks.
    lines: [
      "hi princess 🐾 I'm the red panda. he couldn't attend in mascot form, so I'm filling in.",
      "you called him a red panda once. he never recovered. now I exist.",
      "did you find all 19 tulips in the garden? I counted. I'm watching.",
      "he practiced folding real paper tulips for you. it went… badly. hence the studio.",
      "fun fact: red pandas are excellent judges of character. you chose well. mostly.",
      "blow out the candles yet? I already licked the frosting. sorry.",
      "you look great today. the red panda never lies.",
      "he wrote and rewrote your letter like six times. I watched. it was adorable.",
      "psst — happy 19th. from both of us. 🌷",
      "he made a whole Eras section for you. red pandas know every bridge by heart, obviously.",
      "nineteen. in her prime, entering her most iconic era. that's you.",
    ],
  },

  cake: {
    title: "Nineteen Candles",
    intro:
      "One for every year. Tap each flame to blow it out — and when the last one goes dark, make a wish.",
    wish: "Make a wish, princess ✨ Your knight is already working on it.",
    done: "Nineteen wishes, all noted, all in progress. 🌷",
  },

  game: {
    title: "Catch the Falling Tulips",
    intro:
      "He fumbles real flowers. You won't. Move the basket and catch nineteen before they touch the ground — they float back up anyway; nothing sad happens in this garden.",
    win: "Nineteen caught! You'd catch every single one — just like you caught him. 🌷",
  },

  story: {
    title: "The Princess & Her Knight",
    intro: "A short, entirely true story. Tap through.",
    pages: [
      {
        art: "castle",
        text: "Once upon a time, in a kingdom that looked suspiciously like our institute, there lived a princess named Tulip.",
      },
      {
        art: "knight",
        text: "She was guarded — loosely speaking — by a knight. Brave of heart, loyal to a fault, tragically bad at origami.",
      },
      {
        art: "panda",
        text: "The princess, wise as she was beautiful, took one look at her knight and declared him… a red panda. The royal court agreed instantly. There was no appeal.",
      },
      {
        art: "garden",
        text: "So the red-panda knight did what any knight would do for his princess: he grew her a garden that could never wilt, and folded her tulips that would never crumple.",
      },
      {
        art: "heart",
        text: "And they lived happily — this is chapter nineteen of a story that's only getting started. The end. (For now.)",
      },
    ],
  },

  eras: {
    title: "The Eras of Us",
    intro:
      "Twelve eras of Taylor, twelve eras of us. Tap each card to flip it. (Yes, this section was mandatory. I know exactly who I'm dating.)",
    // Each card: era name + your own note about that "era" of you two.
    // Rewrite the notes with real memories — one era per chapter of your story.
    cards: [
      { era: "Debut", emoji: "🤠", theme: "debut", text: "Every story has a first chapter. Ours started with a hello I still think about." },
      { era: "Fearless", emoji: "✨", theme: "fearless", text: "The era of leaping before looking — first walks, first talks, zero regrets." },
      { era: "Speak Now", emoji: "💜", theme: "speaknow", text: "Some things needed saying out loud. Telling you how I felt is still the bravest thing I've done." },
      { era: "Red", emoji: "🧣", theme: "red", text: "The era of feeling everything, all at once, all the time. You still do that to me." },
      { era: "1989", emoji: "🕊️", theme: "ts1989", text: "Everything bright, everything loud, everything possible — that's what you did to my world." },
      { era: "Reputation", emoji: "🐍", theme: "rep", text: "Let them talk. We know exactly what we are." },
      { era: "Lover", emoji: "💗", theme: "lover", text: "Soft mornings, long calls, heart eyes. This era never ended." },
      { era: "Folklore", emoji: "🌲", theme: "folklore", text: "Quiet days count too. Some of my favourite memories are the uneventful ones with you." },
      { era: "Evermore", emoji: "🍂", theme: "evermore", text: "Slow seasons end in gold. Ours always have." },
      { era: "Midnights", emoji: "🌌", theme: "midnights", text: "Made for 11:57 phone calls and 'okay one more thing' before we sleep." },
      { era: "TTPD", emoji: "🖋️", theme: "ttpd", text: "If I were a tortured poet, every poem would still end with your name." },
      { era: "Showgirl", emoji: "🧡", theme: "showgirl", text: "Curtain up on nineteen — your most dazzling era yet." },
    ],
    outro: "Which era are we in right now? All of them. At once. Always.",
  },

  openwhen: {
    title: "Open When…",
    intro:
      "Little sealed envelopes for future moments. The rule: open them only when the moment is real. (Tap twice — the first tap just checks you mean it.)",
    items: [
      { label: "you miss me", text: "Close your eyes. There — I'm with you in under a second. Now text me. I was already missing you first, for the record." },
      { label: "exams are winning", text: "You have survived 100% of your worst days so far, and you're the smartest person I know. One page at a time, princess. Then call me." },
      { label: "you can't sleep", text: "Meet me at midnight — in your dreams, I mean. I'll be the one in the red panda costume. See you in five minutes." },
      { label: "we've had a fight", text: "Whatever it was: I'm sorry, you're (probably) right, and I love you far more than I love being right. Come back. I saved you a tulip." },
      { label: "you need a laugh", text: "You are dating a man who was publicly declared a red panda by royal decree and simply… accepted it. That's your taste. Sit with that." },
      { label: "it's your 20th birthday", text: "Twenty?! This page is officially vintage. Come find me — your upgrade ships in person, with better origami. (That's a lie. The origami never improves.)" },
    ],
  },

  coupons: {
    title: "The Royal Coupon Book",
    intro:
      "Legal tender in this kingdom only. Tap redeem when you're cashing one in — stamps are permanent, so spend wisely.",
    items: [
      { title: "Winner of one (1) argument", fine: "No appeal. No take-backs. Use wisely." },
      { title: "One movie night, your pick", fine: "Zero complaints from me. Even if it's a rewatch. Even THAT one." },
      { title: "One hug, any hour, any distance", fine: "Redeemable at 3 a.m. Especially at 3 a.m." },
      { title: "One 'you were right' said out loud", fine: "With eye contact. No mumbling." },
      { title: "One dessert date, my treat", fine: "Calories redeemed alongside this coupon do not count." },
      { title: "One full day of knight service", fine: "Bag carrying, snack fetching, dragon slaying. The works." },
    ],
    empty: "All coupons redeemed. The management is honoured — and slightly afraid.",
  },

  daily: {
    title: "A Tulip a Day",
    intro: "One small note, every day of being nineteen. Come back tomorrow — there'll be a new one waiting.",
    teaser: "Your first daily tulip blooms tomorrow morning. Tonight, the garden is all yours.",
    // One note per day, starting the day after her birthday. When the list
    // runs out it loops — add more whenever you like.
    notes: [
      "Day one of nineteen. It already suits you.",
      "Reminder: someone thought about you before breakfast today. It was me.",
      "You looked lovely yesterday. I'm calling it now for today too.",
      "Fact: red pandas imprint for life. Just saying.",
      "Whatever today throws at you — you've beaten worse.",
      "You are the best part of my average days.",
      "Somewhere in our institute, a knight is being dramatically loyal to you.",
      "Drink some water. Your hydration is a royal matter.",
      "Today's forecast: 100% chance of being adored.",
      "If today is heavy, hand me some of it. That's literally my job.",
      "You make even Mondays negotiable.",
      "New day, same answer: still you. Always you.",
      "The garden's still blooming. So are you.",
      "One more day of you being nineteen and me being lucky.",
    ],
  },

  letter: {
    title: "One last thing…",
    greeting: "Dear Tulip,",
    paragraphs: [
      "Nineteen. I've been trying to write this for days, and every draft came out the same way: I'm just really, really glad you exist.",
      "I couldn't fold you paper tulips — you've seen my origami, it's a crime scene — so I built you this instead. A garden that blooms when you touch it, flowers that never wilt, and a studio where every fold comes out right. It felt like a fair trade.",
      "Thank you for every walk, every late-night call, every time you laughed at a joke that did not deserve it. Being yours is the easiest thing I do.",
      "Happy birthday, my Tulip. Here's to nineteen, and to every year I get to stand next to you while you bloom.",
    ],
    signoff: "All my love, always,",
    signature: "— your knight (and part-time red panda) 🌷",
  },
};

export type GreetingCategory = 'new' | 'starter' | 'building' | 'experienced';
export type PerformanceBracket = 'zero' | 'partial' | 'complete';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface Greeting {
  title: string;
  subtitle: string;
}

// Extensive pool of gentle, soothing variations
export const GREETING_POOL: Record<
  GreetingCategory,
  Record<PerformanceBracket, Record<TimeOfDay, Greeting[]>>
> = {
  // 1. BRAND NEW USER (No completions ever)
  new: {
    zero: {
      morning: [
        { title: "Good morning, {name}", subtitle: "Welcome to a safe space. Let's take today one gentle step at a time." },
        { title: "A fresh sunrise, {name}", subtitle: "Every journey begins with a single, small choice. No pressure here." }
      ],
      afternoon: [
        { title: "Hello, {name}", subtitle: "Taking it slow is the bravest thing you can do. There is space here for you." },
        { title: "Welcome, {name}", subtitle: "No need to hurry. Take a breath and let today unfold at its own pace." }
      ],
      evening: [
        { title: "Good evening, {name}", subtitle: "You are here, and that is more than enough. Let's build a gentle routine together." },
        { title: "A quiet space, {name}", subtitle: "Welcome. Let's wrap up today with kindness and look forward to tomorrow." }
      ],
      night: [
        { title: "Restful evening, {name}", subtitle: "Setting a gentle intention for tomorrow is the best first step. Sleep well." },
        { title: "Peaceful night, {name}", subtitle: "You have found a calm harbor. No rush, tomorrow is a fresh page." }
      ]
    },
    // Fallbacks if they somehow complete something immediately
    partial: {
      morning: [{ title: "Off to a gentle start, {name}", subtitle: "Every tiny step is progress. Honor your pace today." }],
      afternoon: [{ title: "Beautiful effort, {name}", subtitle: "You are caring for yourself, and that is wonderful to see." }],
      evening: [{ title: "Making space, {name}", subtitle: "A lovely beginning. You're doing beautifully." }],
      night: [{ title: "Well begun, {name}", subtitle: "You've taken your first gentle steps today. Rest peacefully." }]
    },
    complete: {
      morning: [{ title: "A blooming start, {name}!", subtitle: "Your very first goals are beautifully met. Enjoy this moment." }],
      afternoon: [{ title: "All done, {name}!", subtitle: "A wonderful first day of self-care. Take a deep breath." }],
      evening: [{ title: "Beautifully complete, {name}", subtitle: "You showed up for yourself today. Celebrate this peaceful achievement." }],
      night: [{ title: "Perfect finish, {name}", subtitle: "A cozy and complete end to your first day. Rest well." }]
    }
  },

  // 2. RECENT STARTER (1-2 tracked days)
  starter: {
    zero: {
      morning: [
        { title: "Good morning, {name}", subtitle: "A new day to check in with yourself. What feels nourishing today?" },
        { title: "Rise gently, {name}", subtitle: "There is no wrong way to step forward today. Listen to your heart." }
      ],
      afternoon: [
        { title: "Hello, {name}", subtitle: "A warm pause in your afternoon. How has your breathing been today?" },
        { title: "Midday stillness, {name}", subtitle: "Take a moment to relax your shoulders. There is plenty of time." }
      ],
      evening: [
        { title: "Good evening, {name}", subtitle: "Wind down gently. Whatever you finished today is enough." },
        { title: "A cozy evening, {name}", subtitle: "The sun is setting. It is time to let go of expectations and just be." }
      ],
      night: [
        { title: "Peaceful night, {name}", subtitle: "May your mind find quiet tonight. You've done well." },
        { title: "Gentle night, {name}", subtitle: "Under the stars, everything is still. Let yourself rest completely." }
      ]
    },
    partial: {
      morning: [
        { title: "Moving along, {name}", subtitle: "One small step after another. You're building a beautiful flow." },
        { title: "Nourishing your day, {name}", subtitle: "Slowly and steadily. No need to speed up." }
      ],
      afternoon: [
        { title: "Steady progress, {name}", subtitle: "You are putting yourself first today. That is beautiful." },
        { title: "A quiet momentum, {name}", subtitle: "Every completed habit is a gentle whisper of self-care." }
      ],
      evening: [
        { title: "Evening reflection, {name}", subtitle: "You are gathering peace, one small habit at a time." },
        { title: "A comforting rhythm, {name}", subtitle: "Look at the gentle steps you've taken today. Be proud." }
      ],
      night: [
        { title: "Resting soon, {name}", subtitle: "Almost there. Remember to finish the day with kindness." },
        { title: "Nighttime peace, {name}", subtitle: "A beautiful day of conscious action. Rest is calling." }
      ]
    },
    complete: {
      morning: [
        { title: "A perfect start, {name}!", subtitle: "All goals met early! Enjoy the spaciousness of the rest of your day." }
      ],
      afternoon: [
        { title: "Beautifully done, {name}", subtitle: "Your day's habits are already fully complete. Carry this peace forward." }
      ],
      evening: [
        { title: "A fully bloomed evening, {name}", subtitle: "You checked off every mindful step today. Rest and recharge." }
      ],
      night: [
        { title: "Sweet dreams, {name}", subtitle: "A complete day of gentle devotion. Sleep deeply, you've done wonderfully." }
      ]
    }
  },

  // 3. BUILDING MOMENTUM (3-7 tracked days)
  building: {
    zero: {
      morning: [
        { title: "A fresh page, {name}", subtitle: "You're finding your rhythm now. Let's start with a single gentle choice." },
        { title: "Good morning, {name}", subtitle: "Your consistency is a quiet gift to yourself. No pressure today." }
      ],
      afternoon: [
        { title: "Hello again, {name}", subtitle: "Finding your balance today. Take a deep, gentle breath." },
        { title: "Midday check-in, {name}", subtitle: "Your habit rhythm is growing beautifully. What's next when you're ready?" }
      ],
      evening: [
        { title: "Good evening, {name}", subtitle: "Reflecting on your growth. Tomorrow is another peaceful chance." },
        { title: "Sunset pause, {name}", subtitle: "The day is turning quiet. Honor your presence here." }
      ],
      night: [
        { title: "Restful night, {name}", subtitle: "Let your thoughts settle like stardust. Sleep well." },
        { title: "Sleep gently, {name}", subtitle: "Your habits are a journey, not a race. Rest is just as important." }
      ]
    },
    partial: {
      morning: [
        { title: "A steady flow, {name}", subtitle: "Your morning routine is shaping up beautifully. Keep flowing." }
      ],
      afternoon: [
        { title: "Making space, {name}", subtitle: "You're tending to your habits like a gentle garden. Watch them grow." }
      ],
      evening: [
        { title: "Quiet dedication, {name}", subtitle: "You've chosen self-care multiple times today. Be proud of that choice." }
      ],
      night: [
        { title: "Nighttime calm, {name}", subtitle: "A beautiful reflection of another day. Sleep is well-earned." }
      ]
    },
    complete: {
      morning: [
        { title: "In alignment, {name}!", subtitle: "All habits completed! You are living in absolute harmony with your values today." }
      ],
      afternoon: [
        { title: "Radiant peace, {name}", subtitle: "Fully complete with hours of day left. What a joyful feeling." }
      ],
      evening: [
        { title: "Beautifully complete, {name}", subtitle: "Every mindful action checked off. Have a warm, relaxing evening." }
      ],
      night: [
        { title: "Peaceful completion, {name}", subtitle: "Another day of alignment. Close your eyes and dream of quiet paths." }
      ]
    }
  },

  // 4. EXPERIENCED JOURNEYER (8+ tracked days, multiple cycles!)
  experienced: {
    zero: {
      morning: [
        { title: "Welcome back, {name}", subtitle: "Your habit journey is a beautiful path of self-kindness. Enjoy today's steps." },
        { title: "Another sunrise, {name}", subtitle: "Returning to your rhythm with ease. No rush to start." }
      ],
      afternoon: [
        { title: "Hello, dear friend", subtitle: "You have walked this gentle path before. Pause and enjoy the view today." },
        { title: "Afternoon peace, {name}", subtitle: "Weaving self-care into your busy day. You do this so well." }
      ],
      evening: [
        { title: "Good evening, {name}", subtitle: "Reflecting on your beautiful path. Your dedication is inspiring." },
        { title: "Peaceful sunset, {name}", subtitle: "Honoring your journey, cycle after cycle. You are doing wonderfully." }
      ],
      night: [
        { title: "Stars are shining, {name}", subtitle: "Take a deep breath. Let your long journey bring you peace tonight." },
        { title: "Rest gently, {name}", subtitle: "You have built a peaceful harbor here. Sleep well and recharge." }
      ]
    },
    partial: {
      morning: [
        { title: "Your daily ritual, {name}", subtitle: "Weaving mindfulness into the morning hours. You're doing so well." }
      ],
      afternoon: [
        { title: "Tending the garden, {name}", subtitle: "Every habit checked is another blossom in your mindful life." }
      ],
      evening: [
        { title: "Beautifully paced, {name}", subtitle: "Steady, conscious action. This is the art of gentle progress." }
      ],
      night: [
        { title: "Wrapping up with ease, {name}", subtitle: "Almost finished with another peaceful cycle. Sleep well." }
      ]
    },
    complete: {
      morning: [
        { title: "True mastery, {name}!", subtitle: "A perfectly complete morning. Live today with pure ease and peace." }
      ],
      afternoon: [
        { title: "Beautiful harmony, {name}", subtitle: "Your habits are completely integrated. Enjoy the rest of your day." }
      ],
      evening: [
        { title: "Fully bloomed, {name}!", subtitle: "A full day of self-love and gentle achievement. Rest your heart tonight." }
      ],
      night: [
        { title: "Deepest peace, {name}", subtitle: "Another wonderful cycle complete. Sleep with a light and peaceful mind." }
      ]
    }
  }
};

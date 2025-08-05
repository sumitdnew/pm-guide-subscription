export const questions = [
    {
      id: 'stage',
      question: "What stage is your product currently in?",
      type: 'select',
      options: [
        { value: 'idea', label: 'Idea/Concept Stage' },
        { value: 'discovery', label: 'Discovery & Validation' },
        { value: 'early', label: 'Early Development (Pre-PMF)' },
        { value: 'growth', label: 'Growth Stage (Post-PMF)' },
        { value: 'mature', label: 'Mature/Scale Stage' }
      ]
    },
    {
      id: 'type',
      question: "What type of product are you building?",
      type: 'select',
      options: [
        { value: 'ai', label: 'AI/ML Product' },
        { value: 'saas', label: 'B2B SaaS' },
        { value: 'consumer', label: 'B2C Consumer App' },
        { value: 'marketplace', label: 'Marketplace/Platform' },
        { value: 'enterprise', label: 'Enterprise Software' }
      ]
    },
    {
      id: 'challenge',
      question: "What's your biggest challenge right now?",
      type: 'select',
      options: [
        { value: 'understanding', label: 'Understanding customer needs' },
        { value: 'positioning', label: 'Market positioning & strategy' },
        { value: 'prioritization', label: 'Feature prioritization' },
        { value: 'retention', label: 'User retention & engagement' },
        { value: 'growth', label: 'User acquisition & growth' },
        { value: 'monetization', label: 'Monetization strategy' },
        { value: 'scaling', label: 'Scaling operations' }
      ]
    },
    {
      id: 'timeline',
      question: "What's your timeline for this initiative?",
      type: 'select',
      options: [
        { value: 'immediate', label: 'Need results in 1-2 weeks' },
        { value: 'short', label: '1-3 months' },
        { value: 'medium', label: '3-6 months' },
        { value: 'long', label: '6+ months' }
      ]
    },
    {
      id: 'resources',
      question: "What resources do you have available?",
      type: 'select',
      options: [
        { value: 'limited', label: 'Limited (Just me or small team)' },
        { value: 'moderate', label: 'Moderate (Small dedicated team)' },
        { value: 'substantial', label: 'Substantial (Multiple teams)' },
        { value: 'enterprise', label: 'Enterprise (Large organization)' }
      ]
    }
  ];
  
  export const frameworkDatabase = {
    discovery: {
      primary: [
        {
          name: 'Jobs-to-be-Done (JTBD)',
          description: 'Understand what customers are really trying to accomplish',
          useCase: 'Customer research and problem validation',
          resources: [
            { title: 'JTBD Guide by Intercom', url: 'https://www.intercom.com/resources/books/intercom-jobs-to-be-done', type: 'guide' },
            { title: 'Clayton Christensen on JTBD', url: 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done', type: 'article' }
          ]
        },
        {
          name: '4 Forces of Progress',
          description: 'Analyze what pushes and pulls customers toward/away from change',
          useCase: 'Understanding customer behavior and switching barriers',
          resources: [
            { title: 'Bob Moesta\'s 4 Forces Guide', url: 'https://www.jobstobedone.org/method/four-forces/', type: 'guide' },
            { title: 'Demand-Side Sales 101', url: 'https://www.amazon.com/Demand-Side-Sales-101-Creating-Progress/dp/1544509847', type: 'book' }
          ]
        },
        {
          name: 'Customer Development',
          description: 'Systematic process for discovering and validating customer needs',
          useCase: 'Early-stage customer validation and market research',
          resources: [
            { title: 'The Four Steps to the Epiphany', url: 'https://www.amazon.com/Four-Steps-Epiphany-Steve-Blank/dp/0989200507', type: 'book' },
            { title: 'Steve Blank Customer Development', url: 'https://steveblank.com/category/customer-development/', type: 'guide' }
          ]
        }
      ],
      secondary: [
        {
          name: 'Problem-Solution Fit Canvas',
          description: 'Validate that you\'re solving a real problem worth solving',
          useCase: 'Early validation before building solutions',
          resources: [
            { title: 'Lean Canvas Guide', url: 'https://leanstack.com/lean-canvas', type: 'tool' },
            { title: 'Problem-Solution Fit Framework', url: 'https://www.productplan.com/glossary/problem-solution-fit/', type: 'guide' }
          ]
        },
        {
          name: 'Design Thinking',
          description: 'Human-centered approach to innovation and problem-solving',
          useCase: 'Early-stage ideation and user empathy',
          resources: [
            { title: 'IDEO Design Thinking Guide', url: 'https://designthinking.ideo.com/', type: 'course' },
            { title: 'Stanford d.school Bootleg', url: 'https://dschool.stanford.edu/resources/design-thinking-bootleg', type: 'guide' }
          ]
        }
      ],
      advanced: [
        {
          name: 'Value Proposition Canvas',
          description: 'Map customer jobs, pains, and gains to your value propositions',
          useCase: 'Product-market fit validation and positioning',
          resources: [
            { title: 'Strategyzer Value Proposition Canvas', url: 'https://www.strategyzer.com/canvas/value-proposition-canvas', type: 'tool' },
            { title: 'Value Proposition Design Book', url: 'https://www.strategyzer.com/books/value-proposition-design', type: 'book' }
          ]
        },
        {
          name: 'Persona Development',
          description: 'Create detailed user personas based on research and data',
          useCase: 'Target customer definition and product decisions',
          resources: [
            { title: 'HubSpot Persona Guide', url: 'https://blog.hubspot.com/marketing/buyer-persona-research', type: 'guide' },
            { title: 'Persona Template', url: 'https://blog.hubspot.com/marketing/persona-templates', type: 'template' }
          ]
        }
      ],
      tools: ['Otter.ai for interviews', 'Perplexity AI for research', 'ChatGPT for analysis', 'Grain.co conversation intelligence', 'Dovetail for research']
    },
    
    strategy: {
      primary: [
        {
          name: 'Strategic Formula',
          description: 'Define clear strategic positioning and differentiation',
          useCase: 'Strategic planning and market positioning',
          resources: [
            { title: 'Good Strategy Bad Strategy', url: 'https://www.amazon.com/Good-Strategy-Bad-Difference-Matters/dp/0307886239', type: 'book' },
            { title: 'Strategic Planning Guide', url: 'https://hbr.org/2018/01/the-strategy-process-in-practice', type: 'article' }
          ]
        },
        {
          name: 'Segmentation Framework',
          description: 'Identify and target specific customer segments',
          useCase: 'Market segmentation and targeting',
          resources: [
            { title: 'Market Segmentation Guide', url: 'https://blog.hubspot.com/service/what-is-market-segmentation', type: 'guide' },
            { title: 'Segmentation Strategy Framework', url: 'https://hbr.org/2014/07/what-you-need-to-know-about-segmentation', type: 'article' }
          ]
        }
      ],
      secondary: [
        {
          name: '4 Types of PMF',
          description: 'Understand different types of product-market fit',
          useCase: 'PMF strategy and measurement',
          resources: [
            { title: 'Rahul Vohra on PMF Types', url: 'https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit', type: 'article' },
            { title: 'PMF Survey Guide', url: 'https://pmfsurvey.com/', type: 'tool' }
          ]
        }
      ],
      advanced: [
        {
          name: 'SWOT Analysis',
          description: 'Analyze Strengths, Weaknesses, Opportunities, and Threats',
          useCase: 'Strategic planning and competitive analysis',
          resources: [
            { title: 'SWOT Analysis Guide', url: 'https://blog.hubspot.com/marketing/swot-analysis', type: 'guide' },
            { title: 'SWOT Template', url: 'https://www.mindtools.com/amtbj63/swot-analysis', type: 'template' }
          ]
        }
      ],
      tools: ['Notion AI for docs', 'Crayon.co for competitive intel', 'Gamma.app for presentations', 'SimilarWeb AI insights']
    },
    
    planning: {
      primary: [
        {
          name: 'RICE Prioritization',
          description: 'Score features by Reach × Impact × Confidence / Effort',
          useCase: 'Feature prioritization and roadmap planning',
          resources: [
            { title: 'Intercom\'s RICE Framework', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/', type: 'guide' },
            { title: 'RICE Calculator Template', url: 'https://docs.google.com/spreadsheets/d/1b0ZogirkA28df4-fKSoDbgI9_SRhvM5aaGjfQfwMywg/edit', type: 'tool' }
          ]
        },
        {
          name: 'OKRs',
          description: 'Objectives and Key Results for goal setting and alignment',
          useCase: 'Quarterly planning and team alignment',
          resources: [
            { title: 'Google\'s OKR Guide', url: 'https://rework.withgoogle.com/guides/set-goals-with-okrs/steps/introduction/', type: 'guide' },
            { title: 'Measure What Matters by John Doerr', url: 'https://www.whatmatters.com/', type: 'book' }
          ]
        }
      ],
      secondary: [
        {
          name: 'Kano Model',
          description: 'Categorize features as Basic, Performance, or Delight',
          useCase: 'Understanding customer satisfaction drivers',
          resources: [
            { title: 'Kano Model Explained', url: 'https://www.productplan.com/glossary/kano-model/', type: 'guide' },
            { title: 'Kano Survey Template', url: 'https://blog.hubspot.com/service/what-is-the-kano-model', type: 'template' }
          ]
        }
      ],
      advanced: [
        {
          name: 'MoSCoW Method',
          description: 'Must have, Should have, Could have, Won\'t have this time',
          useCase: 'Release planning and scope definition',
          resources: [
            { title: 'MoSCoW Method Guide', url: 'https://www.productplan.com/glossary/moscow-prioritization/', type: 'guide' },
            { title: 'Agile MoSCoW Planning', url: 'https://www.agilebusiness.org/page/ProjectFramework_10_MoSCoWPrioritisation', type: 'framework' }
          ]
        }
      ],
      tools: ['Linear for tracking', 'ProductPlan for roadmaps', 'Asana Intelligence']
    },
    
    development: {
      primary: [
        {
          name: 'Lean Startup',
          description: 'Build-Measure-Learn cycle for rapid iteration and validation',
          useCase: 'Product development and validation',
          resources: [
            { title: 'The Lean Startup by Eric Ries', url: 'http://theleanstartup.com/', type: 'book' },
            { title: 'Lean Startup Methodology', url: 'https://leanstartup.co/principles', type: 'guide' }
          ]
        }
      ],
      secondary: [
        {
          name: 'Design Sprint',
          description: 'Five-day process for answering critical business questions through design',
          useCase: 'Rapid prototyping and idea validation',
          resources: [
            { title: 'Google Design Sprint Kit', url: 'https://designsprintkit.withgoogle.com/', type: 'tool' },
            { title: 'Sprint Book by Jake Knapp', url: 'https://www.thesprintbook.com/', type: 'book' }
          ]
        }
      ],
      advanced: [
        {
          name: 'A/B Testing Framework',
          description: 'Systematic approach to testing product changes and measuring impact',
          useCase: 'Data-driven product optimization and decision making',
          resources: [
            { title: 'A/B Testing Guide', url: 'https://blog.hubspot.com/marketing/how-to-do-a-b-tests', type: 'guide' },
            { title: 'Experiment Design Framework', url: 'https://amplitude.com/blog/ab-testing-guide', type: 'guide' }
          ]
        }
      ],
      tools: ['Figma AI for prototyping', 'Amplitude for analytics', 'GitHub Copilot']
    },
    
    launch: {
      primary: [
        {
          name: 'AARRR Metrics',
          description: 'Acquisition, Activation, Retention, Referral, Revenue',
          useCase: 'Growth funnel optimization',
          resources: [
            { title: 'Dave McClure\'s Original AARRR', url: 'https://www.slideshare.net/dmc500hats/startup-metrics-for-pirates-long-version', type: 'presentation' },
            { title: 'AARRR Framework Guide', url: 'https://amplitude.com/blog/aarrr-framework', type: 'guide' }
          ]
        }
      ],
      secondary: [
        {
          name: 'Go-to-Market Strategy',
          description: 'Comprehensive plan for bringing products to market',
          useCase: 'Market entry and customer acquisition strategy',
          resources: [
            { title: 'GTM Strategy Guide', url: 'https://blog.hubspot.com/marketing/go-to-market-strategy', type: 'guide' },
            { title: 'GTM Template', url: 'https://www.productplan.com/glossary/go-to-market-strategy/', type: 'template' }
          ]
        }
      ],
      advanced: [
        {
          name: 'Beta Testing Framework',
          description: 'Structured approach to beta testing and user feedback collection',
          useCase: 'Pre-launch validation and product refinement',
          resources: [
            { title: 'Beta Testing Guide', url: 'https://blog.hubspot.com/marketing/beta-testing', type: 'guide' },
            { title: 'Beta Program Best Practices', url: 'https://www.productplan.com/glossary/beta-testing/', type: 'article' }
          ]
        }
      ],
      tools: ['HubSpot AI for marketing', 'Mixpanel for analytics', 'Intercom for support']
    },
    
    growth: {
      primary: [
        {
          name: 'Growth Hacking',
          description: 'Data-driven marketing focused on rapid experimentation',
          useCase: 'Rapid user acquisition and growth',
          resources: [
            { title: 'Growth Hacker Marketing by Ryan Holiday', url: 'https://www.amazon.com/Growth-Hacker-Marketing-Primer-Future/dp/1591847389', type: 'book' },
            { title: 'Growth Hacking Guide', url: 'https://blog.growthhackers.com/what-is-growth-hacking-definitive-guide-f49ab9f5f7ba', type: 'guide' }
          ]
        },
        {
          name: 'Cohort Analysis',
          description: 'Track user behavior over time to understand retention',
          useCase: 'Retention analysis and churn reduction',
          resources: [
            { title: 'Cohort Analysis Guide', url: 'https://amplitude.com/blog/cohort-analysis', type: 'guide' },
            { title: 'Retention Analytics', url: 'https://blog.mixpanel.com/cohort-analysis/', type: 'article' }
          ]
        }
      ],
      secondary: [
        {
          name: 'Viral Coefficient',
          description: 'Measure and optimize the virality of your product',
          useCase: 'Viral growth and referral optimization',
          resources: [
            { title: 'Viral Coefficient Explained', url: 'https://blog.growthhackers.com/what-is-viral-coefficient-and-how-to-calculate-it-9a1e92b51e74', type: 'article' },
            { title: 'Viral Growth Calculator', url: 'https://amplitude.com/blog/viral-growth', type: 'tool' }
          ]
        }
      ],
      advanced: [
        {
          name: 'Customer Lifetime Value',
          description: 'Calculate and optimize the value of customer relationships',
          useCase: 'Business model optimization and growth strategy',
          resources: [
            { title: 'LTV Calculation Guide', url: 'https://blog.hubspot.com/service/what-does-cltv-mean', type: 'guide' },
            { title: 'LTV Calculator', url: 'https://blog.growthhackers.com/customer-lifetime-value-clv-calculator-9f66dcf2da37', type: 'tool' }
          ]
        }
      ],
      tools: ['PostHog AI', 'Optimizely for testing', 'Braze for engagement']
    },
    
    scale: {
      primary: [
        {
          name: 'Platform Strategy',
          description: 'Build ecosystems that create network effects',
          useCase: 'Scaling through partnerships and integrations',
          resources: [
            { title: 'Platform Revolution', url: 'https://www.platformrevolution.com/', type: 'book' },
            { title: 'Platform Strategy Guide', url: 'https://hbr.org/2019/09/what-makes-a-platform-disruptive', type: 'article' }
          ]
        }
      ],
      secondary: [
        {
          name: 'International Expansion',
          description: 'Scale products and services across global markets',
          useCase: 'Global growth and market entry strategies',
          resources: [
            { title: 'International Expansion Guide', url: 'https://blog.hubspot.com/marketing/international-expansion-strategy', type: 'guide' },
            { title: 'Global Market Entry Framework', url: 'https://www.mckinsey.com/business-functions/strategy-and-corporate-finance/our-insights/the-big-idea-before-you-make-that-big-decision', type: 'framework' }
          ]
        }
      ],
      advanced: [
        {
          name: 'Network Effects',
          description: 'Build products that become more valuable as more people use them',
          useCase: 'Sustainable competitive advantages and viral growth',
          resources: [
            { title: 'Network Effects Bible', url: 'https://www.nfx.com/post/network-effects-bible/', type: 'guide' },
            { title: 'Network Effects Manual', url: 'https://www.nfx.com/post/network-effects-manual/', type: 'book' }
          ]
        }
      ],
      tools: ['Datadog AI for monitoring', 'CB Insights for market intel', 'Miro AI for strategy']
    }
  };
  
  export const simulatorConfigs = [
    {
      id: 'rice',
      name: 'RICE Calculator',
      description: 'Calculate prioritization scores using Reach × Impact × Confidence / Effort',
      color: 'blue',
      icon: 'Calculator',
      phases: ['planning', 'development', 'growth'],
      category: 'Prioritization'
    },
    {
      id: 'ice',
      name: 'ICE Scoring',
      description: 'Simpler prioritization using Impact × Confidence × Ease scoring',
      color: 'purple',
      icon: 'Calculator',
      phases: ['planning', 'development', 'growth'],
      category: 'Prioritization'
    },
    {
      id: 'jtbd',
      name: 'JTBD Story Generator',
      description: 'Generate Jobs-to-be-Done user stories and interview scripts',
      color: 'green',
      icon: 'FileText',
      phases: ['discovery', 'strategy'],
      category: 'User Research'
    },
    {
      id: 'forces',
      name: '4 Forces of Progress',
      description: 'Analyze customer behavior change forces and adoption barriers',
      color: 'red',
      icon: 'GitBranch',
      phases: ['discovery', 'strategy'],
      category: 'Strategy'
    },
    {
      id: 'kano',
      name: 'Kano Model Analyzer',
      description: 'Categorize features as Basic, Performance, or Delight needs',
      color: 'yellow',
      icon: 'Star',
      phases: ['planning', 'development'],
      category: 'Feature Analysis'
    },
    {
      id: 'pmf',
      name: 'PMF Measurement',
      description: 'Sean Ellis Product-Market Fit survey analyzer',
      color: 'teal',
      icon: 'BarChart3',
      phases: ['discovery', 'strategy', 'development'],
      category: 'Validation'
    },
    {
      id: 'swot',
      name: 'SWOT Analysis',
      description: 'Analyze Strengths, Weaknesses, Opportunities, and Threats',
      color: 'indigo',
      icon: 'Compass',
      phases: ['strategy', 'planning'],
      category: 'Strategy'
    },
    {
      id: 'aarrr',
      name: 'AARRR Metrics',
      description: 'Track Acquisition, Activation, Retention, Revenue, Referral',
      color: 'orange',
      icon: 'Rocket',
      phases: ['launch', 'growth', 'scale'],
      category: 'Growth'
    },
    {
      id: 'okr',
      name: 'OKR Generator',
      description: 'Create Objectives and Key Results with best practices',
      color: 'cyan',
      icon: 'Target',
      phases: ['planning', 'development', 'growth', 'scale'],
      category: 'Planning'
    },
    {
      id: 'northstar',
      name: 'North Star Framework',
      description: 'Define your North Star metric and key drivers',
      color: 'emerald',
      icon: 'Star',
      phases: ['growth', 'scale'],
      category: 'Metrics'
    },
    {
      id: 'moscow',
      name: 'MoSCoW Method',
      description: 'Prioritize features as Must, Should, Could, Won\'t have',
      color: 'violet',
      icon: 'CheckCircle',
      phases: ['planning', 'development'],
      category: 'Prioritization'
    },
    {
      id: 'persona',
      name: 'User Persona Generator',
      description: 'Create detailed user personas with demographics, goals, and behaviors',
      color: 'pink',
      icon: 'Users',
      phases: ['discovery', 'strategy'],
      category: 'User Research'
    },
    {
      id: 'cohort',
      name: 'Cohort Analysis Calculator',
      description: 'Analyze user retention patterns and churn over time',
      color: 'rose',
      icon: 'BarChart3',
      phases: ['growth', 'scale'],
      category: 'Analytics'
    },
    {
      id: 'abtest',
      name: 'A/B Test Sample Size Calculator',
      description: 'Calculate required sample size for statistical significance',
      color: 'lime',
      icon: 'Calculator',
      phases: ['development', 'growth'],
      category: 'Testing'
    },
    {
      id: 'clv',
      name: 'Customer Lifetime Value Calculator',
      description: 'Calculate CLV, payback period, and customer acquisition ROI',
      color: 'amber',
      icon: 'DollarSign',
      phases: ['growth', 'scale'],
      category: 'Finance'
    },
    {
      id: 'competitive',
      name: 'Competitive Analysis Matrix',
      description: 'Analyze competitors and identify differentiation opportunities',
      color: 'slate',
      icon: 'Compass',
      phases: ['strategy', 'planning'],
      category: 'Strategy'
    },
    {
      id: 'pricing',
      name: 'Pricing Strategy Calculator',
      description: 'Determine optimal pricing based on costs, margins, and market factors',
      color: 'fuchsia',
      icon: 'DollarSign',
      phases: ['strategy', 'planning'],
      category: 'Strategy'
    },
    {
      id: 'marketsize',
      name: 'Market Size Calculator',
      description: 'Calculate TAM, SAM, and SOM for market opportunity assessment',
      color: 'sky',
      icon: 'BarChart3',
      phases: ['strategy', 'planning'],
      category: 'Strategy'
    },
    {
      id: 'customerdev',
      name: 'Customer Development',
      description: 'Systematic process for discovering and validating customer needs',
      color: 'blue',
      icon: 'Users',
      phases: ['discovery', 'strategy'],
      category: 'User Research'
    },
    {
      id: 'designthinking',
      name: 'Design Thinking',
      description: 'Human-centered approach to innovation and problem-solving',
      color: 'green',
      icon: 'Heart',
      phases: ['discovery', 'strategy'],
      category: 'Innovation'
    },
    {
      id: 'valueprop',
      name: 'Value Proposition Canvas',
      description: 'Map customer jobs, pains, and gains to your value propositions',
      color: 'teal',
      icon: 'Target',
      phases: ['discovery', 'strategy'],
      category: 'Strategy'
    },
    {
      id: 'gtm',
      name: 'Go-to-Market Strategy',
      description: 'Comprehensive plan for bringing products to market',
      color: 'purple',
      icon: 'Rocket',
      phases: ['launch', 'growth'],
      category: 'Strategy'
    },
    {
      id: 'growthhacking',
      name: 'Growth Hacking',
      description: 'Data-driven marketing focused on rapid experimentation',
      color: 'orange',
      icon: 'TrendingUp',
      phases: ['growth', 'scale'],
      category: 'Growth'
    }
  ];

  export const caseStudies = {
    'rice': [
      {
        company: 'Intercom',
        title: 'RICE Prioritization at Intercom',
        description: 'How Intercom used RICE to prioritize their product roadmap and focus on high-impact features.',
        challenge: 'Intercom had hundreds of feature requests but limited engineering resources. They needed a systematic way to prioritize features that would drive the most value.',
        approach: 'They implemented RICE scoring across all feature requests, scoring each on Reach (how many users), Impact (how much it moves the needle), Confidence (how sure they are), and Effort (how much work it takes).',
        results: 'Features with RICE scores above 700 were prioritized. This led to a 40% increase in user engagement and 25% faster feature delivery.',
        metrics: ['40% increase in user engagement', '25% faster feature delivery', 'Clear prioritization framework'],
        lessons: ['Focus on high-impact, low-effort features first', 'Regularly re-score features as data changes', 'Use RICE as a conversation starter, not the final decision'],
        link: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/'
      }
    ],
    'ice': [
      {
        company: 'Spotify',
        title: 'ICE Scoring at Spotify',
        description: 'How Spotify used ICE framework to quickly evaluate and prioritize new features for their music streaming platform.',
        challenge: 'Spotify needed to rapidly evaluate hundreds of feature ideas from their team and users, but RICE was too complex for quick decisions.',
        approach: 'They adopted ICE scoring for rapid evaluation: Impact (user value), Confidence (data/evidence), Ease (implementation complexity). Features with ICE scores above 500 were fast-tracked.',
        results: 'ICE enabled Spotify to evaluate features 3x faster than RICE, leading to quicker releases and better user engagement.',
        metrics: ['3x faster feature evaluation', 'Improved user engagement', 'Faster time to market'],
        lessons: ['Use ICE for rapid evaluation', 'Focus on high-confidence, high-impact features', 'Don\'t overthink ease - sometimes hard features are worth it'],
        link: 'https://www.productplan.com/glossary/ice-scoring-model/'
      }
    ],
    'jtbd': [
      {
        company: 'Airbnb',
        title: 'Jobs-to-be-Done at Airbnb',
        description: 'How Airbnb used JTBD to understand why people travel and book accommodations.',
        challenge: 'Airbnb wanted to understand the deeper motivations behind why people travel and choose accommodations, beyond just price and location.',
        approach: 'They conducted hundreds of customer interviews using JTBD framework, asking "What job were you trying to get done when you booked this accommodation?"',
        results: 'They discovered that people weren\'t just booking a place to stay - they were hiring Airbnb to "help me feel like a local" and "create memorable experiences."',
        metrics: ['Improved customer satisfaction by 35%', 'Increased repeat bookings by 28%', 'Better product-market fit'],
        lessons: ['Focus on the job, not the product', 'Interview customers about their struggles', 'Look for emotional and social jobs'],
        link: 'https://www.intercom.com/resources/books/intercom-jobs-to-be-done'
      }
    ],
    'northstar': [
      {
        company: 'Facebook',
        title: 'North Star Metric at Facebook',
        description: 'How Facebook used Daily Active Users (DAU) as their North Star metric to drive product decisions.',
        challenge: 'Facebook needed a single metric that would align all teams and drive the right product decisions for long-term growth.',
        approach: 'They chose Daily Active Users as their North Star metric, believing that if people use Facebook daily, they\'ll find value and the business will grow.',
        results: 'All product decisions were evaluated against DAU impact. This led to features like News Feed, Stories, and Groups that increased daily engagement.',
        metrics: ['2.9 billion daily active users', 'Consistent 10%+ annual growth', 'Aligned product teams'],
        lessons: ['Choose a metric that reflects user value', 'Make it visible to all teams', 'Use it to evaluate all decisions'],
        link: 'https://amplitude.com/blog/north-star-metric'
      }
    ],
    'pmf': [
      {
        company: 'Superhuman',
        title: 'Product-Market Fit at Superhuman',
        description: 'How Superhuman used the Sean Ellis PMF survey to achieve product-market fit.',
        challenge: 'Superhuman wanted to know if they had achieved product-market fit before scaling their email client.',
        approach: 'They used the Sean Ellis PMF survey, asking users "How would you feel if you could no longer use Superhuman?" and targeting 40% "very disappointed" responses.',
        results: 'They achieved 58% "very disappointed" responses, well above the 40% threshold, confirming strong product-market fit.',
        metrics: ['58% "very disappointed" responses', 'Strong PMF confirmed', 'Ready for scaling'],
        lessons: ['Use the PMF survey regularly', 'Target 40% "very disappointed"', 'Don\'t scale until you have PMF'],
        link: 'https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit'
      }
    ],
    'aarrr': [
      {
        company: 'Dropbox',
        title: 'AARRR Metrics at Dropbox',
        description: 'How Dropbox used AARRR framework to optimize their growth funnel.',
        challenge: 'Dropbox needed to understand where users were dropping off in their growth funnel and optimize each stage.',
        approach: 'They mapped their AARRR funnel: Acquisition (referral program), Activation (quick setup), Retention (file sync), Revenue (premium features), Referral (viral sharing).',
        results: 'Their referral program increased signups by 60%, and focusing on activation led to 40% more users reaching the "aha moment."',
        metrics: ['60% increase in signups', '40% better activation', 'Viral coefficient > 1'],
        lessons: ['Focus on one metric at a time', 'Start with activation and retention', 'Build viral loops'],
        link: 'https://amplitude.com/blog/aarrr-framework'
      }
    ],
    'kano': [
      {
        company: 'Apple',
        title: 'Kano Model at Apple',
        description: 'How Apple uses the Kano Model to categorize features and drive innovation.',
        challenge: 'Apple needed to balance basic features (reliability, security) with delight features (Face ID, AirPods) to maintain customer satisfaction.',
        approach: 'They categorize features: Basic (security, reliability), Performance (speed, battery life), Delight (Face ID, AirPods, MagSafe).',
        results: 'This approach has led to industry-leading customer satisfaction scores and premium pricing power.',
        metrics: ['Industry-leading satisfaction scores', 'Premium pricing power', 'Strong brand loyalty'],
        lessons: ['Don\'t neglect basic features', 'Invest in delight features', 'Performance features drive satisfaction'],
        link: 'https://www.productplan.com/glossary/kano-model/'
      }
    ],
    'okr': [
      {
        company: 'Google',
        title: 'OKRs at Google',
        description: 'How Google uses OKRs to align teams and drive ambitious goals.',
        challenge: 'Google needed a framework to set ambitious goals and align thousands of employees across different teams.',
        approach: 'They implemented OKRs company-wide, with objectives like "Organize the world\'s information" and key results like "Index 100 billion web pages."',
        results: 'OKRs helped Google scale from a startup to a global company while maintaining focus and alignment.',
        metrics: ['Aligned 100,000+ employees', 'Ambitious goal setting', 'Clear accountability'],
        lessons: ['Set ambitious objectives', 'Make key results measurable', 'Align company, team, and individual OKRs'],
        link: 'https://rework.withgoogle.com/guides/set-goals-with-okrs/steps/introduction/'
      }
    ],
    'growthhacking': [
      {
        company: 'LinkedIn',
        title: 'Growth Hacking at LinkedIn',
        description: 'How LinkedIn used growth hacking to achieve viral growth and become the professional network.',
        challenge: 'LinkedIn needed to grow rapidly in a competitive market and build network effects.',
        approach: 'They implemented viral features like "People You May Know" and "Who viewed your profile," plus email optimization and A/B testing.',
        results: 'LinkedIn achieved 700+ million users and became the dominant professional network through systematic growth hacking.',
        metrics: ['700+ million users', 'Strong network effects', 'Viral growth achieved'],
        lessons: ['Build viral loops', 'Test everything', 'Focus on network effects'],
        link: 'https://blog.growthhackers.com/what-is-growth-hacking-definitive-guide-f49ab9f5f7ba'
      }
    ],
    'customerdev': [
      {
        company: 'Zappos',
        title: 'Customer Development at Zappos',
        description: 'How Zappos used customer development to validate their online shoe store concept.',
        challenge: 'Zappos founder wanted to validate if people would buy shoes online, which was unheard of in 1999.',
        approach: 'They used customer development: interviewed shoe store owners, tested with a simple website, and validated customer willingness to buy online.',
        results: 'Customer development proved the concept, leading to Zappos becoming a billion-dollar company.',
        metrics: ['$1.2 billion acquisition by Amazon', 'Validated online shoe market', 'Strong customer loyalty'],
        lessons: ['Get out of the building', 'Test assumptions early', 'Listen to customers'],
        link: 'https://steveblank.com/category/customer-development/'
      }
    ],
    'designthinking': [
      {
        company: 'IDEO',
        title: 'Design Thinking at IDEO',
        description: 'How IDEO used design thinking to create the first Apple mouse and other breakthrough products.',
        challenge: 'IDEO needed to create user-centered products that solved real problems, not just cool technology.',
        approach: 'They used the 5-step design thinking process: Empathize (user research), Define (problem statement), Ideate (solutions), Prototype (build), Test (validate).',
        results: 'This approach led to breakthrough products like the Apple mouse, Palm V, and thousands of other innovations.',
        metrics: ['Thousands of breakthrough products', 'Strong user-centered design', 'Innovation culture'],
        lessons: ['Start with empathy', 'Prototype early and often', 'Test with real users'],
        link: 'https://designthinking.ideo.com/'
      }
    ],
    'valueprop': [
      {
        company: 'Tesla',
        title: 'Value Proposition Canvas at Tesla',
        description: 'How Tesla used value proposition design to disrupt the automotive industry.',
        challenge: 'Tesla needed to understand what customers really wanted from cars and how to position electric vehicles.',
        approach: 'They mapped customer jobs (transportation, status, environmental impact), pains (gas prices, pollution, maintenance), and gains (performance, savings, sustainability).',
        results: 'Tesla positioned electric cars as high-performance, environmentally friendly, and cost-effective, disrupting the entire industry.',
        metrics: ['Market cap > $1 trillion', 'Industry disruption', 'Strong brand positioning'],
        lessons: ['Understand customer jobs deeply', 'Address real pains', 'Deliver unique gains'],
        link: 'https://www.strategyzer.com/canvas/value-proposition-canvas'
      }
    ],
    'gtm': [
      {
        company: 'Slack',
        title: 'Go-to-Market Strategy at Slack',
        description: 'How Slack used a focused GTM strategy to become the dominant team communication tool.',
        challenge: 'Slack needed to enter a crowded market with established players like Microsoft Teams and compete effectively.',
        approach: 'They focused on developer teams first, used freemium model, built viral features, and created strong brand positioning around "making work better."',
        results: 'Slack became the dominant team communication tool with 12+ million daily active users and $27.7 billion acquisition by Salesforce.',
        metrics: ['12+ million daily active users', '$27.7 billion acquisition', 'Market leadership'],
        lessons: ['Start with a focused segment', 'Use freemium model', 'Build viral features'],
        link: 'https://blog.hubspot.com/marketing/go-to-market-strategy'
      }
    ],
    'swot': [
      {
        company: 'Netflix',
        title: 'SWOT Analysis at Netflix',
        description: 'How Netflix used SWOT analysis to pivot from DVD rentals to streaming and become a global entertainment leader.',
        challenge: 'Netflix needed to understand their position in the entertainment market and identify opportunities for growth beyond DVD rentals.',
        approach: 'They conducted comprehensive SWOT analysis: Strengths (brand recognition, customer data), Weaknesses (limited content library), Opportunities (streaming technology), Threats (competition from cable).',
        results: 'SWOT analysis revealed streaming as the biggest opportunity, leading to their successful pivot and global expansion.',
        metrics: ['200+ million subscribers worldwide', 'Market cap > $200 billion', 'Global entertainment leader'],
        lessons: ['Use SWOT to identify strategic opportunities', 'Focus on strengths and opportunities', 'Address weaknesses and threats proactively'],
        link: 'https://www.mindtools.com/pages/article/newTMC_05.htm'
      }
    ],
    'moscow': [
      {
        company: 'Microsoft',
        title: 'MoSCoW Prioritization at Microsoft',
        description: 'How Microsoft used MoSCoW method to prioritize features for their Azure cloud platform.',
        challenge: 'Microsoft needed to manage hundreds of feature requests for Azure while ensuring critical infrastructure features were delivered first.',
        approach: 'They implemented MoSCoW prioritization: Must Have (security, compliance), Should Have (performance, scalability), Could Have (advanced features), Won\'t Have (nice-to-have features).',
        results: 'MoSCoW helped Microsoft deliver critical Azure features on time while maintaining clear roadmap communication with customers.',
        metrics: ['$60+ billion annual cloud revenue', '99.9% uptime SLA achieved', 'Clear roadmap communication'],
        lessons: ['Use MoSCoW for complex project management', 'Focus on Must Have features first', 'Communicate priorities clearly to stakeholders'],
        link: 'https://www.agilebusiness.org/resource/moscow-prioritisation.html'
      }
    ]
  };
export type NetworkLink = { label: string; href: string; note?: string };

export const newsletter = {
  href: 'https://amdatalakehouse.substack.com',
  name: 'Alex Merced on Substack',
  editions: [
    { day: 'Thursday', title: 'AI newsletter', note: 'Model releases, agent tooling, protocols, and AI infrastructure from the past week.' },
    { day: 'Friday', title: 'Apache lakehouse newsletter', note: 'What moved on the Apache Iceberg, Polaris, Arrow, and Parquet dev lists.' },
  ],
};

export const communityLinks: NetworkLink[] = [
  { label: 'Agentic Lakehouse events', href: 'https://luma.com/agenticlakehouse' },
  { label: 'Data Lakehouse Hub events', href: 'https://luma.com/DataLakehouseHub' },
  { label: 'Data Lakehouse Hub Slack', href: 'https://join.slack.com/t/thedatalakehousehub/shared_invite/zt-274yc8sza-mI2zhCW8LGkOh1uxuf8T5Q' },
  { label: 'Data Events Slack', href: 'https://join.slack.com/t/data-events/shared_invite/zt-38vgrooy9-U9ral_gr3NAz_Siih1QwmQ' },
  { label: 'r/datalakehouseandai', href: 'https://www.reddit.com/r/datalakehouseandai/' },
  { label: 'Alex Merced Tech on YouTube', href: 'https://www.youtube.com/@AlexMercedCoder' },
  { label: 'Alex Merced Data and AI on YouTube', href: 'https://www.youtube.com/@alexmerceddata' },
  { label: 'Podcast on Spotify', href: 'https://open.spotify.com/show/2PRDrWVpgDvKxN6n1oUsJF' },
];

export const connectLinks: NetworkLink[] = [
  { label: 'GitHub', href: 'https://github.com/alexmercedcoder' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexmerced' },
  { label: 'BlueSky', href: 'https://bsky.app/profile/alextalksdatalakehouses.fyi' },
  { label: 'Mastodon', href: 'https://me.dm/@thealexmerced' },
  { label: 'Twitter/X', href: 'https://twitter.com/amdatalakehouse' },
  { label: 'Instagram', href: 'https://www.instagram.com/alexmercedcoder' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@alexmercedcoder' },
  { label: 'Email', href: 'mailto:contact@alexmerced.com' },
];

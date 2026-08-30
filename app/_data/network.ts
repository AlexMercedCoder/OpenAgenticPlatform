export type NetworkLink = { label: string; href: string; note?: string };
export type NetworkGroup = { title: string; links: NetworkLink[] };

export const newsletter = {
  href: 'https://amdatalakehouse.substack.com',
  name: 'Alex Merced on Substack',
  editions: [
    { day: 'Thursday', title: 'AI newsletter', note: 'Model releases, agent tooling, protocols, and AI infrastructure from the past week.' },
    { day: 'Friday', title: 'Apache lakehouse newsletter', note: 'What moved on the Apache Iceberg, Polaris, Arrow, and Parquet dev lists.' },
  ],
};

export const networkGroups: NetworkGroup[] = [
  {
    title: 'AI and agents',
    links: [
      { label: 'AlexMercedAI.com', href: 'https://www.alexmercedai.com' },
      { label: 'OpenAgenticPlatform.com', href: 'https://openagenticplatform.com' },
      { label: 'AgenticLakehouse.com', href: 'https://agenticlakehouse.com' },
      { label: 'DataAIWiki.com', href: 'https://dataaiwiki.com' },
    ],
  },
  {
    title: 'Identity and work',
    links: [
      { label: 'AlexMerced.com', href: 'https://www.alexmerced.com' },
      { label: 'WhoIsAlexMerced.com', href: 'https://whoisalexmerced.com' },
      { label: 'AlexMercedCoder.dev', href: 'https://alexmercedcoder.dev' },
      { label: 'AlexMercedData.com', href: 'https://alexmerceddata.com' },
      { label: 'AlexMercedMedia.com', href: 'https://alexmercedmedia.com' },
      { label: 'Books by Alex Merced', href: 'https://books.alexmerced.com' },
      { label: 'Resources', href: 'https://resources.alexmerced.com' },
    ],
  },
  {
    title: 'Data and lakehouse',
    links: [
      { label: 'OpenDataLakehouse.com', href: 'https://opendatalakehouse.com' },
      { label: 'SemanticLakehouse.com', href: 'https://semanticlakehouse.com' },
      { label: 'OpenLakehouse.AlexMerced.com', href: 'https://openlakehouse.alexmerced.com' },
      { label: 'IcebergLakehouse.com', href: 'https://iceberglakehouse.com' },
      { label: 'DataLakehouseHub.com', href: 'https://datalakehousehub.com' },
      { label: 'DataLakehouse.help', href: 'https://datalakehouse.help' },
      { label: 'DataEngnr.com', href: 'https://dataengnr.com' },
      { label: 'WeekOfData.com', href: 'https://weekofdata.com' },
    ],
  },
  {
    title: 'Writing',
    links: [
      { label: 'AlexMerced.blog', href: 'https://alexmerced.blog' },
      { label: 'GrokOverflow.com', href: 'https://grokoverflow.com' },
      { label: 'IngestThis.com', href: 'https://ingestthis.com' },
      { label: 'Coding tutorials', href: 'https://tuts.alexmercedcoder.dev' },
      { label: 'AlexMercedLibertarian.com', href: 'https://alexmercedlibertarian.com' },
    ],
  },
];

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
  { label: 'Email', href: 'mailto:dev@alexmerced.com' },
];

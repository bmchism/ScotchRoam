import type { LearnArticle } from "../types";
export const articles: LearnArticle[] = [
  { slug: "what-is-scotch", title: "What Is Scotch Whisky?", subtitle: "Scotland's national spirit — malt, water, time, and place.", kicker: "Scotch 101", sections: [
    { heading: "The legal definition", body: "Scotch whisky must be distilled and matured in Scotland for a minimum of 3 years in oak casks. It must be bottled at a minimum of 40% ABV. Nothing may be added except water and caramel coloring (E150a)." },
    { heading: "The five categories", body: "Single Malt (one distillery, 100% malted barley), Single Grain (one distillery, other grains), Blended Malt (multiple distilleries, all malt), Blended Scotch (malt + grain), Blended Grain (multiple distilleries, all grain)." },
    { heading: "Why region matters", body: "Scotland's whisky regions shape character: Speyside (fruity, elegant), Islay (peated, maritime), Highland (diverse, often robust), Lowland (light, grassy), Campbeltown (briny, complex), Islands (maritime, varied peat)." },
  ]},
  { slug: "scotch-regions", title: "The Scotch Regions", subtitle: "Six distinct regions, six distinct personalities.", kicker: "Scotch 101", sections: [
    { heading: "Speyside", body: "Home to over half of Scotland's distilleries. Known for elegance, fruit, and sherry cask influence. Glenfiddich, Macallan, Glenlivet, Balvenie, Aberlour." },
    { heading: "Islay", body: "The peat island. Smoke, iodine, salt, and maritime character. Laphroaig, Ardbeg, Lagavulin, Bruichladdich, Bowmore, Caol Ila." },
    { heading: "Highland", body: "The largest region — diverse styles from delicate (Glenmorangie) to robust (Dalmore). Includes the sub-region of Speyside." },
    { heading: "Lowland", body: "Light, floral, often triple-distilled. Approachable entry point. Auchentoshan, Glenkinchie, Bladnoch." },
    { heading: "Campbeltown", body: "Once Scotland's whisky capital (30+ distilleries, now 3). Briny, oily, complex. Springbank, Glen Scotia, Glengyle." },
    { heading: "Islands", body: "Not an official region but a useful grouping. Maritime influence, varied peat. Talisker (Skye), Highland Park (Orkney), Tobermory (Mull), Jura, Arran." },
  ]},
  { slug: "how-to-taste-scotch", title: "How to Taste Scotch", subtitle: "Neat, a drop of water, and patience.", kicker: "Do a tasting", sections: [
    { heading: "Set up", body: "Pour 25-35ml neat in a Glencairn glass. Have room-temperature water in a dropper or small jug. Taste from lightest to heaviest peat." },
    { heading: "Look", body: "Tilt and observe. Pale gold = bourbon cask/young. Deep amber = sherry cask/older. Legs (slow, thick) indicate body and ABV." },
    { heading: "Nose", body: "Hold below your chin first, then raise slowly. Mouth open. Return multiple times — the whisky opens over 5-10 minutes. Look for malt, fruit, peat, oak, spice, sea salt." },
    { heading: "Taste", body: "Small sip, hold on your tongue 3-5 seconds. Let it coat your whole mouth. Notice texture (oily, thin, creamy), sweetness, spice, smoke, and how it evolves from front to back." },
    { heading: "Finish", body: "Swallow and breathe out gently through your nose. How long does it last? Does the character change? The best malts have a finish that evolves for minutes." },
    { heading: "Add water", body: "A few drops of water opens up cask-strength whiskies dramatically. Even at 40-46%, water can reveal hidden notes. Add gradually — you can't take it back." },
  ]},
];
export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export interface StyleGuide { wineType: string; description: string; profile: string; accent: string; }
export const wineTypeGuides: StyleGuide[] = [
  { wineType: "Single Malt", description: "One distillery, 100% malted barley, pot-still distilled", profile: "The purest expression of a distillery's character.", accent: "#C28A3D" },
  { wineType: "Blended", description: "Malt + grain whiskies from multiple distilleries", profile: "Smooth, balanced, accessible — the world's most popular Scotch category.", accent: "#A66A33" },
  { wineType: "Blended Malt", description: "Malts from multiple distilleries, no grain whisky", profile: "Complex, layered — the best of multiple distilleries combined.", accent: "#B5651D" },
  { wineType: "Single Grain", description: "One distillery, column-still, various grains", profile: "Light, sweet, often vanilla-forward — increasingly collectible.", accent: "#D4A574" },
  { wineType: "Cask Strength", description: "Bottled at barrel strength, no water added (55-65%+)", profile: "Intense and concentrated — add water to unlock layers.", accent: "#6B3A1F" },
  { wineType: "Peated", description: "Made with peat-smoked malted barley", profile: "Smoky, medicinal, maritime — from gentle smoke to campfire intensity.", accent: "#4A4A4A" },
  { wineType: "Sherry Cask", description: "Matured in ex-sherry oak casks", profile: "Rich, fruity, spiced — dried fruit, Christmas cake, dark chocolate.", accent: "#8C4A2F" },
  { wineType: "Bourbon Cask", description: "Matured in ex-bourbon American oak", profile: "Vanilla, honey, citrus, coconut — lighter and more delicate.", accent: "#C9A24B" },
];

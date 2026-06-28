export interface PropBet {
  id: string;
  match: string;
  market: string;
  oddsDecimal: number;
  oddsAmerican: string;
  playerHeadshot?: string; // EA Sports SoFIFA player image CDN via weserv proxy
  teamFlagLeft: string;    // FlagCDN URL for home nation
  teamFlagRight: string;   // FlagCDN URL for away nation
  betUrl?: string;         // Affiliate or checkout URL for the bet
  date?: string;           // Dynamically computed date of the match
  kickoffTime: string;     // ISO String with timezone offset, e.g. "2026-06-28T15:00:00-04:00"
}

// Master pool of 60 prop bets for the World Cup 2026 Round of 32 (10 per day for 6 days)
export const MASTER_BETS: PropBet[] = [
  // ==========================================
  // DAY 1 (June 28) - South Africa vs Canada (15:00 ET)
  // ==========================================
  {
    id: "r32-bet-1",
    match: "SOUTH AFRICA vs CANADA",
    market: "Jonathan David to Score Anytime",
    oddsDecimal: 2.50,
    oddsAmerican: "+150",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/243/628/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/za.png",
    teamFlagRight: "https://flagcdn.com/w80/ca.png",
    kickoffTime: "2026-06-28T15:00:00-04:00"
  },
  {
    id: "r32-bet-2",
    match: "SOUTH AFRICA vs CANADA",
    market: "Lyle Foster to Score Anytime",
    oddsDecimal: 3.20,
    oddsAmerican: "+220",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/241/508/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/za.png",
    teamFlagRight: "https://flagcdn.com/w80/ca.png",
    kickoffTime: "2026-06-28T15:00:00-04:00"
  },
  {
    id: "r32-bet-3",
    match: "SOUTH AFRICA vs CANADA",
    market: "Canada to Win",
    oddsDecimal: 1.91,
    oddsAmerican: "-110",
    teamFlagLeft: "https://flagcdn.com/w80/za.png",
    teamFlagRight: "https://flagcdn.com/w80/ca.png",
    kickoffTime: "2026-06-28T15:00:00-04:00"
  },
  {
    id: "r32-bet-4",
    match: "SOUTH AFRICA vs CANADA",
    market: "Both Teams to Score - Yes",
    oddsDecimal: 1.83,
    oddsAmerican: "-120",
    teamFlagLeft: "https://flagcdn.com/w80/za.png",
    teamFlagRight: "https://flagcdn.com/w80/ca.png",
    kickoffTime: "2026-06-28T15:00:00-04:00"
  },
  {
    id: "r32-bet-5",
    match: "SOUTH AFRICA vs CANADA",
    market: "Over 2.5 Goals in Match",
    oddsDecimal: 2.15,
    oddsAmerican: "+115",
    teamFlagLeft: "https://flagcdn.com/w80/za.png",
    teamFlagRight: "https://flagcdn.com/w80/ca.png",
    kickoffTime: "2026-06-28T15:00:00-04:00"
  },
  {
    id: "r32-bet-6",
    match: "SOUTH AFRICA vs CANADA",
    market: "Over 8.5 Corners in Match",
    oddsDecimal: 1.77,
    oddsAmerican: "-130",
    teamFlagLeft: "https://flagcdn.com/w80/za.png",
    teamFlagRight: "https://flagcdn.com/w80/ca.png",
    kickoffTime: "2026-06-28T15:00:00-04:00"
  },
  {
    id: "r32-bet-7",
    match: "SOUTH AFRICA vs CANADA",
    market: "Over 3.5 Cards in Match",
    oddsDecimal: 1.87,
    oddsAmerican: "-115",
    teamFlagLeft: "https://flagcdn.com/w80/za.png",
    teamFlagRight: "https://flagcdn.com/w80/ca.png",
    kickoffTime: "2026-06-28T15:00:00-04:00"
  },
  {
    id: "r32-bet-8",
    match: "SOUTH AFRICA vs CANADA",
    market: "Tajon Buchanan to Get Carded",
    oddsDecimal: 4.50,
    oddsAmerican: "+350",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/251/476/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/za.png",
    teamFlagRight: "https://flagcdn.com/w80/ca.png",
    kickoffTime: "2026-06-28T15:00:00-04:00"
  },
  {
    id: "r32-bet-9",
    match: "SOUTH AFRICA vs CANADA",
    market: "South Africa +1.0 Asian Handicap",
    oddsDecimal: 1.71,
    oddsAmerican: "-140",
    teamFlagLeft: "https://flagcdn.com/w80/za.png",
    teamFlagRight: "https://flagcdn.com/w80/ca.png",
    kickoffTime: "2026-06-28T15:00:00-04:00"
  },
  {
    id: "r32-bet-10",
    match: "SOUTH AFRICA vs CANADA",
    market: "Canada to Score in Both Halves",
    oddsDecimal: 3.50,
    oddsAmerican: "+250",
    teamFlagLeft: "https://flagcdn.com/w80/za.png",
    teamFlagRight: "https://flagcdn.com/w80/ca.png",
    kickoffTime: "2026-06-28T15:00:00-04:00"
  },

  // ==========================================
  // DAY 2 (June 29) - Brazil vs Japan (13:00 ET), Germany vs Paraguay (16:30 ET), Netherlands vs Morocco (21:00 ET)
  // ==========================================
  {
    id: "r32-bet-11",
    match: "BRAZIL vs JAPAN",
    market: "Vinícius Jr. to Score Anytime",
    oddsDecimal: 2.20,
    oddsAmerican: "+120",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/238/794/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/br.png",
    teamFlagRight: "https://flagcdn.com/w80/jp.png",
    kickoffTime: "2026-06-29T13:00:00-04:00"
  },
  {
    id: "r32-bet-12",
    match: "BRAZIL vs JAPAN",
    market: "Brazil to Win & Over 2.5 Goals",
    oddsDecimal: 1.80,
    oddsAmerican: "-125",
    teamFlagLeft: "https://flagcdn.com/w80/br.png",
    teamFlagRight: "https://flagcdn.com/w80/jp.png",
    kickoffTime: "2026-06-29T13:00:00-04:00"
  },
  {
    id: "r32-bet-13",
    match: "BRAZIL vs JAPAN",
    market: "Kaoru Mitoma 1+ Shot on Target",
    oddsDecimal: 1.67,
    oddsAmerican: "-150",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/258/516/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/br.png",
    teamFlagRight: "https://flagcdn.com/w80/jp.png",
    kickoffTime: "2026-06-29T13:00:00-04:00"
  },
  {
    id: "r32-bet-14",
    match: "GERMANY vs PARAGUAY",
    market: "Germany to Win",
    oddsDecimal: 1.63,
    oddsAmerican: "-160",
    teamFlagLeft: "https://flagcdn.com/w80/de.png",
    teamFlagRight: "https://flagcdn.com/w80/py.png",
    kickoffTime: "2026-06-29T16:30:00-04:00"
  },
  {
    id: "r32-bet-15",
    match: "GERMANY vs PARAGUAY",
    market: "Florian Wirtz to Assist Anytime",
    oddsDecimal: 3.10,
    oddsAmerican: "+210",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/256/630/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/de.png",
    teamFlagRight: "https://flagcdn.com/w80/py.png",
    kickoffTime: "2026-06-29T16:30:00-04:00"
  },
  {
    id: "r32-bet-16",
    match: "GERMANY vs PARAGUAY",
    market: "Paraguay Over 3.5 Cards",
    oddsDecimal: 1.91,
    oddsAmerican: "-110",
    teamFlagLeft: "https://flagcdn.com/w80/de.png",
    teamFlagRight: "https://flagcdn.com/w80/py.png",
    kickoffTime: "2026-06-29T16:30:00-04:00"
  },
  {
    id: "r32-bet-17",
    match: "NETHERLANDS vs MOROCCO",
    market: "Cody Gakpo to Score Anytime",
    oddsDecimal: 2.80,
    oddsAmerican: "+180",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/242/516/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/nl.png",
    teamFlagRight: "https://flagcdn.com/w80/ma.png",
    kickoffTime: "2026-06-29T21:00:00-04:00"
  },
  {
    id: "r32-bet-18",
    match: "NETHERLANDS vs MOROCCO",
    market: "Morocco to Win or Draw",
    oddsDecimal: 2.25,
    oddsAmerican: "+125",
    teamFlagLeft: "https://flagcdn.com/w80/nl.png",
    teamFlagRight: "https://flagcdn.com/w80/ma.png",
    kickoffTime: "2026-06-29T21:00:00-04:00"
  },
  {
    id: "r32-bet-19",
    match: "NETHERLANDS vs MOROCCO",
    market: "Both Teams to Score - Yes",
    oddsDecimal: 1.91,
    oddsAmerican: "-110",
    teamFlagLeft: "https://flagcdn.com/w80/nl.png",
    teamFlagRight: "https://flagcdn.com/w80/ma.png",
    kickoffTime: "2026-06-29T21:00:00-04:00"
  },
  {
    id: "r32-bet-20",
    match: "NETHERLANDS vs MOROCCO",
    market: "Over 9.5 Corners in Match",
    oddsDecimal: 1.83,
    oddsAmerican: "-120",
    teamFlagLeft: "https://flagcdn.com/w80/nl.png",
    teamFlagRight: "https://flagcdn.com/w80/ma.png",
    kickoffTime: "2026-06-29T21:00:00-04:00"
  },

  // ==========================================
  // DAY 3 (June 30) - Ivory Coast vs Norway (13:00 ET), France vs Sweden (17:00 ET), Mexico vs Ecuador (21:00 ET)
  // ==========================================
  {
    id: "r32-bet-21",
    match: "IVORY COAST vs NORWAY",
    market: "Erling Haaland to Score Anytime",
    oddsDecimal: 1.91,
    oddsAmerican: "-110",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/239/085/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/ci.png",
    teamFlagRight: "https://flagcdn.com/w80/no.png",
    kickoffTime: "2026-06-30T13:00:00-04:00"
  },
  {
    id: "r32-bet-22",
    match: "IVORY COAST vs NORWAY",
    market: "Match to End in a Draw",
    oddsDecimal: 3.20,
    oddsAmerican: "+220",
    teamFlagLeft: "https://flagcdn.com/w80/ci.png",
    teamFlagRight: "https://flagcdn.com/w80/no.png",
    kickoffTime: "2026-06-30T13:00:00-04:00"
  },
  {
    id: "r32-bet-23",
    match: "IVORY COAST vs NORWAY",
    market: "Norway to Qualify",
    oddsDecimal: 1.72,
    oddsAmerican: "-138",
    teamFlagLeft: "https://flagcdn.com/w80/ci.png",
    teamFlagRight: "https://flagcdn.com/w80/no.png",
    kickoffTime: "2026-06-30T13:00:00-04:00"
  },
  {
    id: "r32-bet-24",
    match: "FRANCE vs SWEDEN",
    market: "Kylian Mbappé to Score Anytime",
    oddsDecimal: 2.10,
    oddsAmerican: "+110",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/231/747/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/fr.png",
    teamFlagRight: "https://flagcdn.com/w80/se.png",
    kickoffTime: "2026-06-30T17:00:00-04:00"
  },
  {
    id: "r32-bet-25",
    match: "FRANCE vs SWEDEN",
    market: "France to Win & BTTS - Yes",
    oddsDecimal: 3.40,
    oddsAmerican: "+240",
    teamFlagLeft: "https://flagcdn.com/w80/fr.png",
    teamFlagRight: "https://flagcdn.com/w80/se.png",
    kickoffTime: "2026-06-30T17:00:00-04:00"
  },
  {
    id: "r32-bet-26",
    match: "FRANCE vs SWEDEN",
    market: "Alexander Isak 1+ Shot on Target",
    oddsDecimal: 1.71,
    oddsAmerican: "-140",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/232/656/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/fr.png",
    teamFlagRight: "https://flagcdn.com/w80/se.png",
    kickoffTime: "2026-06-30T17:00:00-04:00"
  },
  {
    id: "r32-bet-27",
    match: "MEXICO vs ECUADOR",
    market: "Under 2.5 Goals in Match",
    oddsDecimal: 1.67,
    oddsAmerican: "-150",
    teamFlagLeft: "https://flagcdn.com/w80/mx.png",
    teamFlagRight: "https://flagcdn.com/w80/ec.png",
    kickoffTime: "2026-06-30T21:00:00-04:00"
  },
  {
    id: "r32-bet-28",
    match: "MEXICO vs ECUADOR",
    market: "Santiago Giménez to Score Anytime",
    oddsDecimal: 2.75,
    oddsAmerican: "+175",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/245/152/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/mx.png",
    teamFlagRight: "https://flagcdn.com/w80/ec.png",
    kickoffTime: "2026-06-30T21:00:00-04:00"
  },
  {
    id: "r32-bet-29",
    match: "MEXICO vs ECUADOR",
    market: "Ecuador to Win or Draw",
    oddsDecimal: 1.77,
    oddsAmerican: "-130",
    teamFlagLeft: "https://flagcdn.com/w80/mx.png",
    teamFlagRight: "https://flagcdn.com/w80/ec.png",
    kickoffTime: "2026-06-30T21:00:00-04:00"
  },
  {
    id: "r32-bet-30",
    match: "MEXICO vs ECUADOR",
    market: "Over 4.5 Cards in Match",
    oddsDecimal: 1.83,
    oddsAmerican: "-120",
    teamFlagLeft: "https://flagcdn.com/w80/mx.png",
    teamFlagRight: "https://flagcdn.com/w80/ec.png",
    kickoffTime: "2026-06-30T21:00:00-04:00"
  },

  // ==========================================
  // DAY 4 (July 1) - England vs DR Congo (12:00 ET), Belgium vs Senegal (16:00 ET), USA vs Bosnia (20:00 ET)
  // ==========================================
  {
    id: "r32-bet-31",
    match: "ENGLAND vs DR CONGO",
    market: "Harry Kane to Score Anytime",
    oddsDecimal: 1.80,
    oddsAmerican: "-125",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/202/126/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/gb-eng.png",
    teamFlagRight: "https://flagcdn.com/w80/cd.png",
    kickoffTime: "2026-07-01T12:00:00-04:00"
  },
  {
    id: "r32-bet-32",
    match: "ENGLAND vs DR CONGO",
    market: "England to Win to Nil",
    oddsDecimal: 1.91,
    oddsAmerican: "-110",
    teamFlagLeft: "https://flagcdn.com/w80/gb-eng.png",
    teamFlagRight: "https://flagcdn.com/w80/cd.png",
    kickoffTime: "2026-07-01T12:00:00-04:00"
  },
  {
    id: "r32-bet-33",
    match: "ENGLAND vs DR CONGO",
    market: "DR Congo Over 2.5 Cards",
    oddsDecimal: 1.80,
    oddsAmerican: "-125",
    teamFlagLeft: "https://flagcdn.com/w80/gb-eng.png",
    teamFlagRight: "https://flagcdn.com/w80/cd.png",
    kickoffTime: "2026-07-01T12:00:00-04:00"
  },
  {
    id: "r32-bet-34",
    match: "BELGIUM vs SENEGAL",
    market: "Under 2.5 Goals in Match",
    oddsDecimal: 1.72,
    oddsAmerican: "-138",
    teamFlagLeft: "https://flagcdn.com/w80/be.png",
    teamFlagRight: "https://flagcdn.com/w80/sn.png",
    kickoffTime: "2026-07-01T16:00:00-04:00"
  },
  {
    id: "r32-bet-35",
    match: "BELGIUM vs SENEGAL",
    market: "Belgium to Qualify",
    oddsDecimal: 1.50,
    oddsAmerican: "-200",
    teamFlagLeft: "https://flagcdn.com/w80/be.png",
    teamFlagRight: "https://flagcdn.com/w80/sn.png",
    kickoffTime: "2026-07-01T16:00:00-04:00"
  },
  {
    id: "r32-bet-36",
    match: "BELGIUM vs SENEGAL",
    market: "Senegal to Win or Draw",
    oddsDecimal: 2.45,
    oddsAmerican: "+145",
    teamFlagLeft: "https://flagcdn.com/w80/be.png",
    teamFlagRight: "https://flagcdn.com/w80/sn.png",
    kickoffTime: "2026-07-01T16:00:00-04:00"
  },
  {
    id: "r32-bet-37",
    match: "USA vs BOSNIA AND HERZEGOVINA",
    market: "Christian Pulisic to Score Anytime",
    oddsDecimal: 2.50,
    oddsAmerican: "+150",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/227/790/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/us.png",
    teamFlagRight: "https://flagcdn.com/w80/ba.png",
    kickoffTime: "2026-07-01T20:00:00-04:00"
  },
  {
    id: "r32-bet-38",
    match: "USA vs BOSNIA AND HERZEGOVINA",
    market: "USA to Win",
    oddsDecimal: 1.53,
    oddsAmerican: "-188",
    teamFlagLeft: "https://flagcdn.com/w80/us.png",
    teamFlagRight: "https://flagcdn.com/w80/ba.png",
    kickoffTime: "2026-07-01T20:00:00-04:00"
  },
  {
    id: "r32-bet-39",
    match: "USA vs BOSNIA AND HERZEGOVINA",
    market: "USA vs Bosnia Over 8.5 Corners",
    oddsDecimal: 1.77,
    oddsAmerican: "-130",
    teamFlagLeft: "https://flagcdn.com/w80/us.png",
    teamFlagRight: "https://flagcdn.com/w80/ba.png",
    kickoffTime: "2026-07-01T20:00:00-04:00"
  },
  {
    id: "r32-bet-40",
    match: "USA vs BOSNIA AND HERZEGOVINA",
    market: "USA to Win & Over 1.5 Goals",
    oddsDecimal: 1.80,
    oddsAmerican: "-125",
    teamFlagLeft: "https://flagcdn.com/w80/us.png",
    teamFlagRight: "https://flagcdn.com/w80/ba.png",
    kickoffTime: "2026-07-01T20:00:00-04:00"
  },

  // ==========================================
  // DAY 5 (July 2) - Spain vs Austria (15:00 ET), Portugal vs Croatia (19:00 ET), Switzerland vs Algeria (23:00 ET)
  // ==========================================
  {
    id: "r32-bet-41",
    match: "SPAIN vs AUSTRIA",
    market: "Lamine Yamal to Assist Anytime",
    oddsDecimal: 3.50,
    oddsAmerican: "+250",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/277/019/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/es.png",
    teamFlagRight: "https://flagcdn.com/w80/at.png",
    kickoffTime: "2026-07-02T15:00:00-04:00"
  },
  {
    id: "r32-bet-42",
    match: "SPAIN vs AUSTRIA",
    market: "Spain to Win",
    oddsDecimal: 1.69,
    oddsAmerican: "-145",
    teamFlagLeft: "https://flagcdn.com/w80/es.png",
    teamFlagRight: "https://flagcdn.com/w80/at.png",
    kickoffTime: "2026-07-02T15:00:00-04:00"
  },
  {
    id: "r32-bet-43",
    match: "SPAIN vs AUSTRIA",
    market: "Both Teams to Score - Yes",
    oddsDecimal: 1.87,
    oddsAmerican: "-115",
    teamFlagLeft: "https://flagcdn.com/w80/es.png",
    teamFlagRight: "https://flagcdn.com/w80/at.png",
    kickoffTime: "2026-07-02T15:00:00-04:00"
  },
  {
    id: "r32-bet-44",
    match: "PORTUGAL vs CROATIA",
    market: "Cristiano Ronaldo to Score Anytime",
    oddsDecimal: 2.25,
    oddsAmerican: "+125",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/020/801/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/pt.png",
    teamFlagRight: "https://flagcdn.com/w80/hr.png",
    kickoffTime: "2026-07-02T19:00:00-04:00"
  },
  {
    id: "r32-bet-45",
    match: "PORTUGAL vs CROATIA",
    market: "Match to End in a Draw",
    oddsDecimal: 3.30,
    oddsAmerican: "+230",
    teamFlagLeft: "https://flagcdn.com/w80/pt.png",
    teamFlagRight: "https://flagcdn.com/w80/hr.png",
    kickoffTime: "2026-07-02T19:00:00-04:00"
  },
  {
    id: "r32-bet-46",
    match: "PORTUGAL vs CROATIA",
    market: "Croatia to Qualify",
    oddsDecimal: 2.50,
    oddsAmerican: "+150",
    teamFlagLeft: "https://flagcdn.com/w80/pt.png",
    teamFlagRight: "https://flagcdn.com/w80/hr.png",
    kickoffTime: "2026-07-02T19:00:00-04:00"
  },
  {
    id: "r32-bet-47",
    match: "SWITZERLAND vs ALGERIA",
    market: "Switzerland to Win",
    oddsDecimal: 1.91,
    oddsAmerican: "-110",
    teamFlagLeft: "https://flagcdn.com/w80/ch.png",
    teamFlagRight: "https://flagcdn.com/w80/dz.png",
    kickoffTime: "2026-07-02T23:00:00-04:00"
  },
  {
    id: "r32-bet-48",
    match: "SWITZERLAND vs ALGERIA",
    market: "Under 2.5 Goals in Match",
    oddsDecimal: 1.65,
    oddsAmerican: "-155",
    teamFlagLeft: "https://flagcdn.com/w80/ch.png",
    teamFlagRight: "https://flagcdn.com/w80/dz.png",
    kickoffTime: "2026-07-02T23:00:00-04:00"
  },
  {
    id: "r32-bet-49",
    match: "SWITZERLAND vs ALGERIA",
    market: "Breel Embolo to Score Anytime",
    oddsDecimal: 3.10,
    oddsAmerican: "+210",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/220/814/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/ch.png",
    teamFlagRight: "https://flagcdn.com/w80/dz.png",
    kickoffTime: "2026-07-02T23:00:00-04:00"
  },
  {
    id: "r32-bet-50",
    match: "SWITZERLAND vs ALGERIA",
    market: "Algeria to Qualify",
    oddsDecimal: 2.35,
    oddsAmerican: "+135",
    teamFlagLeft: "https://flagcdn.com/w80/ch.png",
    teamFlagRight: "https://flagcdn.com/w80/dz.png",
    kickoffTime: "2026-07-02T23:00:00-04:00"
  },

  // ==========================================
  // DAY 6 (July 3) - Australia vs Egypt (14:00 ET), Argentina vs Cape Verde (18:00 ET), Colombia vs Ghana (21:30 ET)
  // ==========================================
  {
    id: "r32-bet-51",
    match: "AUSTRALIA vs EGYPT",
    market: "Under 2.0 Goals in Match",
    oddsDecimal: 1.83,
    oddsAmerican: "-120",
    teamFlagLeft: "https://flagcdn.com/w80/au.png",
    teamFlagRight: "https://flagcdn.com/w80/eg.png",
    kickoffTime: "2026-07-03T14:00:00-04:00"
  },
  {
    id: "r32-bet-52",
    match: "AUSTRALIA vs EGYPT",
    market: "Egypt to Qualify",
    oddsDecimal: 1.87,
    oddsAmerican: "-115",
    teamFlagLeft: "https://flagcdn.com/w80/au.png",
    teamFlagRight: "https://flagcdn.com/w80/eg.png",
    kickoffTime: "2026-07-03T14:00:00-04:00"
  },
  {
    id: "r32-bet-53",
    match: "ARGENTINA vs CAPE VERDE",
    market: "Lionel Messi to Score Anytime",
    oddsDecimal: 1.91,
    oddsAmerican: "-110",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/158/023/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/ar.png",
    teamFlagRight: "https://flagcdn.com/w80/cv.png",
    kickoffTime: "2026-07-03T18:00:00-04:00"
  },
  {
    id: "r32-bet-54",
    match: "ARGENTINA vs CAPE VERDE",
    market: "Argentina to Win & Over 2.5 Goals",
    oddsDecimal: 1.67,
    oddsAmerican: "-150",
    teamFlagLeft: "https://flagcdn.com/w80/ar.png",
    teamFlagRight: "https://flagcdn.com/w80/cv.png",
    kickoffTime: "2026-07-03T18:00:00-04:00"
  },
  {
    id: "r32-bet-55",
    match: "ARGENTINA vs CAPE VERDE",
    market: "Argentina to Win to Nil",
    oddsDecimal: 1.80,
    oddsAmerican: "-125",
    teamFlagLeft: "https://flagcdn.com/w80/ar.png",
    teamFlagRight: "https://flagcdn.com/w80/cv.png",
    kickoffTime: "2026-07-03T18:00:00-04:00"
  },
  {
    id: "r32-bet-56",
    match: "COLOMBIA vs GHANA",
    market: "Luis Díaz to Score Anytime",
    oddsDecimal: 2.80,
    oddsAmerican: "+180",
    playerHeadshot: "https://images.weserv.nl/?url=cdn.sofifa.net/players/241/096/24_120.png",
    teamFlagLeft: "https://flagcdn.com/w80/co.png",
    teamFlagRight: "https://flagcdn.com/w80/gh.png",
    kickoffTime: "2026-07-03T21:30:00-04:00"
  },
  {
    id: "r32-bet-57",
    match: "COLOMBIA vs GHANA",
    market: "Colombia to Win",
    oddsDecimal: 1.67,
    oddsAmerican: "-150",
    teamFlagLeft: "https://flagcdn.com/w80/co.png",
    teamFlagRight: "https://flagcdn.com/w80/gh.png",
    kickoffTime: "2026-07-03T21:30:00-04:00"
  },
  {
    id: "r32-bet-58",
    match: "COLOMBIA vs GHANA",
    market: "Both Teams to Score - Yes",
    oddsDecimal: 1.95,
    oddsAmerican: "-105",
    teamFlagLeft: "https://flagcdn.com/w80/co.png",
    teamFlagRight: "https://flagcdn.com/w80/gh.png",
    kickoffTime: "2026-07-03T21:30:00-04:00"
  },
  {
    id: "r32-bet-59",
    match: "COLOMBIA vs GHANA",
    market: "Colombia vs Ghana Over 9.5 Corners",
    oddsDecimal: 1.80,
    oddsAmerican: "-125",
    teamFlagLeft: "https://flagcdn.com/w80/co.png",
    teamFlagRight: "https://flagcdn.com/w80/gh.png",
    kickoffTime: "2026-07-03T21:30:00-04:00"
  },
  {
    id: "r32-bet-60",
    match: "ARGENTINA vs CAPE VERDE",
    market: "Over 4.5 Cards in Match",
    oddsDecimal: 2.10,
    oddsAmerican: "+110",
    teamFlagLeft: "https://flagcdn.com/w80/ar.png",
    teamFlagRight: "https://flagcdn.com/w80/cv.png",
    kickoffTime: "2026-07-03T18:00:00-04:00"
  }
];

function getGMT4Date(): Date {
  const localDate = new Date();
  const utc = localDate.getTime() + localDate.getTimezoneOffset() * 60000;
  return new Date(utc + (3600000 * -4)); // GMT-4 offset
}

// Returns the next 10 upcoming bets in the schedule (that haven't started yet)
export function getDailyBets(): PropBet[] {
  const now = getGMT4Date();
  
  // Find all bets in the master list whose matches have not started yet (in GMT-4/ET timezone)
  const upcomingBets = MASTER_BETS.filter(bet => {
    const kickoff = new Date(bet.kickoffTime);
    return kickoff.getTime() > now.getTime();
  });
  
  // If there are fewer than 10 upcoming bets left in the whole tournament, take the last 10 master list bets as fallback
  const selectedBets = upcomingBets.length >= 10 
    ? upcomingBets.slice(0, 10) 
    : MASTER_BETS.slice(MASTER_BETS.length - 10);
  
  return selectedBets.map(bet => {
    const dateObj = new Date(bet.kickoffTime);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    
    return {
      ...bet,
      date: dateStr,
    };
  });
}

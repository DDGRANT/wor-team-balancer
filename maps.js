const STORAGE_KEY_MAP_STATE = "wor_map_pool_state_v1";
const STORAGE_KEY_LANG_MAP = "wor_balancer_lang_v8";

// 内置完整地图库（同步自 wortool.com/maps 结构，同时支持同目录下 maps_data.json 热更新）
let ALL_MAPS = [
  {
    "id": "ant_east_woods",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "East Woods Skirmish",
    "attacker": "USA",
    "time": "40 min",
    "usa_tickets": 450,
    "csa_tickets": 420,
    "usa_units": [
      "1st Texas (CSA) vs 12th Mass",
      "2nd Wisconsin",
      "6th Wisconsin",
      "7th Wisconsin",
      "19th Indiana",
      "Battery B, 4th US (Artillery)"
    ],
    "csa_units": [
      "1st Texas",
      "4th Texas",
      "5th Texas",
      "18th Georgia",
      "Hampton's Legion",
      "Reilly's Battery (Artillery)"
    ],
    "notes": "Classic woods infantry brawl with 1 artillery battery per side."
  },
  {
    "id": "ant_hookers_push",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Hooker's Push",
    "attacker": "USA",
    "time": "45 min",
    "usa_tickets": 500,
    "csa_tickets": 460,
    "usa_units": [
      "1st Pennsylvania Rifles",
      "3rd Pennsylvania Reserves",
      "4th Pennsylvania Reserves",
      "8th Pennsylvania Reserves",
      "Cooper's Battery B"
    ],
    "csa_units": [
      "2nd Mississippi",
      "11th Mississippi",
      "4th Alabama",
      "6th North Carolina",
      "Pelham's Horse Artillery"
    ],
    "notes": "Open cornfield approach favoring coordinated Union line pushes."
  },
  {
    "id": "ant_miller_cornfield",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Miller's Cornfield",
    "attacker": "CSA",
    "time": "45 min",
    "usa_tickets": 480,
    "csa_tickets": 520,
    "usa_units": [
      "2nd US Sharpshooters",
      "6th Wisconsin",
      "7th Wisconsin",
      "14th Brooklyn",
      "24th New York",
      "Gibbon's Battery"
    ],
    "csa_units": [
      "1st Texas",
      "4th Texas",
      "5th Texas",
      "21st Georgia",
      "27th Georgia",
      "Poague's Battery"
    ],
    "notes": "High-casualty close-quarters cornfield engagement."
  },
  {
    "id": "ant_hagerstown_turnpike",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Hagerstown Turnpike",
    "attacker": "USA",
    "time": "40 min",
    "usa_tickets": 440,
    "csa_tickets": 410,
    "usa_units": [
      "19th Indiana",
      "2nd Wisconsin",
      "20th New York",
      "7th Michigan",
      "Battery B, 4th US"
    ],
    "csa_units": [
      "2nd Virginia",
      "4th Virginia",
      "5th Virginia",
      "27th Virginia",
      "33rd Virginia",
      "Carpenter's Battery"
    ],
    "notes": "Fence-line cover along the turnpike; Stonewall Brigade vs Iron Brigade."
  },
  {
    "id": "ant_west_woods",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "West Woods",
    "attacker": "USA",
    "time": "45 min",
    "usa_tickets": 520,
    "csa_tickets": 470,
    "usa_units": [
      "15th Massachusetts",
      "19th Massachusetts",
      "20th Massachusetts",
      "7th Michigan",
      "34th New York",
      "42nd New York",
      "Tompkins' Battery"
    ],
    "csa_units": [
      "13th Mississippi",
      "17th Mississippi",
      "18th Mississippi",
      "21st Mississippi",
      "50th Georgia",
      "Read's Battery"
    ],
    "notes": "Dense woods flanking angles; Sedgwick's Division assault."
  },
  {
    "id": "ant_dunker_church",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Dunker Church",
    "attacker": "CSA",
    "time": "40 min",
    "usa_tickets": 430,
    "csa_tickets": 460,
    "usa_units": [
      "5th Maryland",
      "125th Pennsylvania",
      "3rd Wisconsin",
      "2nd Massachusetts",
      "Knap's Battery"
    ],
    "csa_units": [
      "1st Louisiana Zouaves",
      "2nd Louisiana",
      "10th Louisiana",
      "14th Louisiana",
      "15th Louisiana",
      "Moody's Battery"
    ],
    "notes": "Central church hill capture point with crossfire from West Woods."
  },
  {
    "id": "ant_nicodemus_hill",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Nicodemus Hill",
    "attacker": "USA",
    "time": "40 min",
    "usa_tickets": 450,
    "csa_tickets": 420,
    "usa_units": [
      "1st US Sharpshooters",
      "6th US Cavalry (Dismounted)",
      "8th Illinois Cavalry (Dismounted)",
      "Tidball's Horse Artillery"
    ],
    "csa_units": [
      "1st Virginia Cavalry (Dismounted)",
      "4th Virginia Cavalry (Dismounted)",
      "9th Virginia Cavalry (Dismounted)",
      "Pelham's Battery"
    ],
    "notes": "Cavalry carbines and horse artillery duel over elevated ridge."
  },
  {
    "id": "ant_bloody_lane",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Bloody Lane",
    "attacker": "USA",
    "time": "45 min",
    "usa_tickets": 540,
    "csa_tickets": 460,
    "usa_units": [
      "69th New York",
      "63rd New York",
      "88th New York",
      "29th Massachusetts",
      "14th Connecticut",
      "4th New York",
      "Clark's Battery"
    ],
    "csa_units": [
      "2nd North Carolina",
      "4th North Carolina",
      "14th North Carolina",
      "30th North Carolina",
      "3rd Alabama",
      "5th Alabama",
      "Carter's Battery"
    ],
    "notes": "Irish Brigade vs entrenched Sunken Road defenders."
  },
  {
    "id": "ant_roulette_lane",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Roulette Lane",
    "attacker": "USA",
    "time": "40 min",
    "usa_tickets": 460,
    "csa_tickets": 430,
    "usa_units": [
      "14th Connecticut",
      "108th New York",
      "130th Pennsylvania",
      "1st Delaware",
      "5th Maryland"
    ],
    "csa_units": [
      "6th Alabama",
      "12th Alabama",
      "26th Alabama",
      "4th North Carolina",
      "Bondurant's Battery"
    ],
    "notes": "Farmhouse courtyard and orchard approach."
  },
  {
    "id": "ant_piper_farm",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Piper Farm",
    "attacker": "USA",
    "time": "45 min",
    "usa_tickets": 490,
    "csa_tickets": 450,
    "usa_units": [
      "7th Maine",
      "20th New York",
      "49th New York",
      "77th New York",
      "33rd New York",
      "Cowan's Battery"
    ],
    "csa_units": [
      "1st South Carolina",
      "2nd South Carolina",
      "3rd South Carolina",
      "7th South Carolina",
      "8th South Carolina",
      "Boyce's Battery"
    ],
    "notes": "Stone wall defense around Piper orchard and barn."
  },
  {
    "id": "ant_burnside_bridge",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Burnside Bridge",
    "attacker": "USA",
    "time": "45 min",
    "usa_tickets": 560,
    "csa_tickets": 420,
    "usa_units": [
      "51st New York",
      "51st Pennsylvania",
      "21st Massachusetts",
      "35th Massachusetts",
      "11th Connecticut",
      "Durell's Battery"
    ],
    "csa_units": [
      "2nd Georgia",
      "20th Georgia",
      "50th Georgia",
      "51st Georgia",
      "Eubank's Battery"
    ],
    "notes": "Chokepoint bridge & ford crossing; heavily favors CSA if uncoordinated."
  },
  {
    "id": "ant_cookes_countercharge",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Cooke's Countercharge",
    "attacker": "CSA",
    "time": "40 min",
    "usa_tickets": 430,
    "csa_tickets": 470,
    "usa_units": [
      "8th Connecticut",
      "11th Connecticut",
      "16th Connecticut",
      "4th Rhode Island",
      "Simmonds' Battery"
    ],
    "csa_units": [
      "15th North Carolina",
      "27th North Carolina",
      "3rd Arkansas",
      "30th Virginia",
      "French's Battery"
    ],
    "notes": "Rolling hills south of Sharpsburg; A.P. Hill's arrival."
  },
  {
    "id": "ant_otto_sherrick_farm",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Otto & Sherrick Farm",
    "attacker": "USA",
    "time": "40 min",
    "usa_tickets": 470,
    "csa_tickets": 440,
    "usa_units": [
      "79th New York",
      "45th Pennsylvania",
      "100th Pennsylvania",
      "17th Michigan",
      "Benjamin's Battery"
    ],
    "csa_units": [
      "1st Georgia Regulars",
      "7th Georgia",
      "8th Georgia",
      "9th Georgia",
      "11th Georgia",
      "Wise's Battery"
    ],
    "notes": "Stone farmhouse compound fighting across Antietam creek bluffs."
  },
  {
    "id": "hf_maryland_heights",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Maryland Heights",
    "attacker": "CSA",
    "time": "45 min",
    "usa_tickets": 450,
    "csa_tickets": 500,
    "usa_units": [
      "126th New York",
      "39th New York",
      "1st Maryland PHB",
      "5th New York Heavy Artillery"
    ],
    "csa_units": [
      "13th Mississippi",
      "17th Mississippi",
      "18th Mississippi",
      "21st Mississippi",
      "8th Florida",
      "McLaws' Artillery"
    ],
    "notes": "Steep mountain crest breastworks; heavy uphill climb for CSA."
  },
  {
    "id": "hf_bolivar_heights_camp",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Bolivar Heights Camp",
    "attacker": "CSA",
    "time": "40 min",
    "usa_tickets": 430,
    "csa_tickets": 470,
    "usa_units": [
      "9th Vermont",
      "32nd Ohio",
      "60th Ohio",
      "12th New York Cavalry",
      "Rigby's Battery"
    ],
    "csa_units": [
      "13th Virginia",
      "31st Virginia",
      "44th Virginia",
      "49th Virginia",
      "52nd Virginia",
      "Crenshaw's Battery"
    ],
    "notes": "Open plateau entrenchments with artillery overlooking camp."
  },
  {
    "id": "hf_bolivar_heights_redoubt",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Bolivar Heights Redoubt",
    "attacker": "CSA",
    "time": "45 min",
    "usa_tickets": 440,
    "csa_tickets": 490,
    "usa_units": [
      "111th New York",
      "115th New York",
      "65th Illinois",
      "15th Indiana Battery"
    ],
    "csa_units": [
      "1st South Carolina Rifles",
      "12th South Carolina",
      "13th South Carolina",
      "14th South Carolina",
      "Pee Dee Artillery"
    ],
    "notes": "Earthwork redoubt assault across open ridge."
  },
  {
    "id": "hf_shenandoah_street",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Shenandoah Street",
    "attacker": "CSA",
    "time": "40 min",
    "usa_tickets": 440,
    "csa_tickets": 460,
    "usa_units": [
      "87th Ohio",
      "12th Illinois Cavalry",
      "1st Maryland Cavalry",
      "Von Sehlen's Battery"
    ],
    "csa_units": [
      "7th Louisiana",
      "8th Louisiana",
      "9th Louisiana",
      "13th Virginia",
      "Latimer's Battery"
    ],
    "notes": "Urban street fighting through lower Harpers Ferry town."
  },
  {
    "id": "hf_harpers_ferry_graveyard",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Harpers Ferry Graveyard",
    "attacker": "CSA",
    "time": "40 min",
    "usa_tickets": 430,
    "csa_tickets": 460,
    "usa_units": [
      "126th New York",
      "111th New York",
      "39th New York",
      "Graham's Battery"
    ],
    "csa_units": [
      "10th Virginia",
      "23rd Virginia",
      "37th Virginia",
      "1st Maryland Battalion",
      "Lusk's Battery"
    ],
    "notes": "Elevated graveyard walls overlooking river confluence."
  },
  {
    "id": "hf_school_house_ridge",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "School House Ridge",
    "attacker": "CSA",
    "time": "45 min",
    "usa_tickets": 450,
    "csa_tickets": 480,
    "usa_units": [
      "32nd Ohio",
      "60th Ohio",
      "126th New York",
      "9th Vermont",
      "Potts' Battery"
    ],
    "csa_units": [
      "16th Georgia",
      "24th Georgia",
      "Cobb's Legion",
      "Phillips' Legion",
      "Carlton's Battery"
    ],
    "notes": "Long ridge line with flanking timber patches."
  },
  {
    "id": "sm_fox_gap",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Fox's Gap",
    "attacker": "USA",
    "time": "45 min",
    "usa_tickets": 500,
    "csa_tickets": 450,
    "usa_units": [
      "17th Michigan",
      "45th Pennsylvania",
      "79th New York",
      "36th Ohio",
      "11th Ohio",
      "Cook's Battery"
    ],
    "csa_units": [
      "5th North Carolina",
      "12th North Carolina",
      "13th North Carolina",
      "20th North Carolina",
      "23rd North Carolina",
      "Bondurant's Battery"
    ],
    "notes": "Wise's Field stone wall & mountain gap woods."
  },
  {
    "id": "sm_turners_gap",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Turner's Gap",
    "attacker": "USA",
    "time": "45 min",
    "usa_tickets": 510,
    "csa_tickets": 450,
    "usa_units": [
      "2nd Wisconsin",
      "6th Wisconsin",
      "7th Wisconsin",
      "19th Indiana",
      "24th Michigan",
      "Battery B, 4th US"
    ],
    "csa_units": [
      "3rd Alabama",
      "5th Alabama",
      "6th Alabama",
      "12th Alabama",
      "26th Alabama",
      "Page's Battery"
    ],
    "notes": "Mountain road pass uphill battle; Iron Brigade vs Rodes' Brigade."
  },
  {
    "id": "sm_cramptons_gap",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Crampton's Gap",
    "attacker": "USA",
    "time": "45 min",
    "usa_tickets": 520,
    "csa_tickets": 440,
    "usa_units": [
      "1st New Jersey",
      "2nd New Jersey",
      "3rd New Jersey",
      "4th New Jersey",
      "95th Pennsylvania",
      "96th Pennsylvania",
      "Hexamer's Battery"
    ],
    "csa_units": [
      "2nd Virginia",
      "6th Virginia",
      "12th Virginia",
      "16th Virginia",
      "10th Georgia",
      "Chew's Battery"
    ],
    "notes": "Stone wall at mountain base followed by steep wooded ascent."
  },
  {
    "id": "sm_garlands_stand",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Garland's Stand",
    "attacker": "USA",
    "time": "40 min",
    "usa_tickets": 480,
    "csa_tickets": 440,
    "usa_units": [
      "12th Ohio",
      "23rd Ohio",
      "30th Ohio",
      "28th Ohio",
      "McMullin's Battery"
    ],
    "csa_units": [
      "5th North Carolina",
      "12th North Carolina",
      "20th North Carolina",
      "23rd North Carolina",
      "Lane's Battery"
    ],
    "notes": "Early morning ridge line skirmish with Kanawha Division."
  },
  {
    "id": "sm_hatchs_attack",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Hatch's Attack",
    "attacker": "USA",
    "time": "45 min",
    "usa_tickets": 490,
    "csa_tickets": 450,
    "usa_units": [
      "22nd New York",
      "24th New York",
      "30th New York",
      "84th New York (14th Brooklyn)",
      "2nd US Sharpshooters",
      "Reynolds' Battery"
    ],
    "csa_units": [
      "8th Virginia",
      "18th Virginia",
      "19th Virginia",
      "28th Virginia",
      "56th Virginia",
      "Stribling's Battery"
    ],
    "notes": "Steep terraced pastures and stone fences below mountain crest."
  },
  {
    "id": "con_antietam_cornfield",
    "mode": "Contention",
    "campaign": "Antietam",
    "name": "Cornfield Contention",
    "attacker": "Neutral",
    "time": "45 min",
    "usa_tickets": 500,
    "csa_tickets": 500,
    "usa_units": [
      "6th Wisconsin",
      "7th Wisconsin",
      "19th Indiana",
      "14th Brooklyn",
      "2nd US Sharpshooters",
      "Battery B, 4th US"
    ],
    "csa_units": [
      "1st Texas",
      "4th Texas",
      "5th Texas",
      "18th Georgia",
      "21st Georgia",
      "Poague's Battery"
    ],
    "notes": "Symmetrical tug-of-war across Miller's Cornfield."
  },
  {
    "id": "con_dunker_church",
    "mode": "Contention",
    "campaign": "Antietam",
    "name": "Dunker Church Contention",
    "attacker": "Neutral",
    "time": "45 min",
    "usa_tickets": 500,
    "csa_tickets": 500,
    "usa_units": [
      "20th Massachusetts",
      "15th Massachusetts",
      "7th Michigan",
      "5th Maryland",
      "Tompkins' Battery"
    ],
    "csa_units": [
      "2nd Louisiana",
      "10th Louisiana",
      "14th Louisiana",
      "17th Mississippi",
      "Moody's Battery"
    ],
    "notes": "Multi-point contention between West Woods and Dunker Church."
  },
  {
    "id": "con_sunken_road",
    "mode": "Contention",
    "campaign": "Antietam",
    "name": "Sunken Road Contention",
    "attacker": "Neutral",
    "time": "45 min",
    "usa_tickets": 500,
    "csa_tickets": 500,
    "usa_units": [
      "69th New York",
      "63rd New York",
      "88th New York",
      "14th Connecticut",
      "Clark's Battery"
    ],
    "csa_units": [
      "2nd North Carolina",
      "4th North Carolina",
      "14th North Carolina",
      "6th Alabama",
      "Carter's Battery"
    ],
    "notes": "Bidirectional control points along Bloody Lane and Piper ridge."
  },
  {
    "id": "con_harpers_ferry",
    "mode": "Contention",
    "campaign": "Harpers Ferry",
    "name": "Bolivar Plateau Contention",
    "attacker": "Neutral",
    "time": "45 min",
    "usa_tickets": 500,
    "csa_tickets": 500,
    "usa_units": [
      "126th New York",
      "111th New York",
      "32nd Ohio",
      "9th Vermont",
      "Rigby's Battery"
    ],
    "csa_units": [
      "13th Virginia",
      "31st Virginia",
      "49th Virginia",
      "12th South Carolina",
      "Crenshaw's Battery"
    ],
    "notes": "Balanced ridge-top point capture across Bolivar Heights."
  },
  {
    "id": "con_south_mountain",
    "mode": "Contention",
    "campaign": "South Mountain",
    "name": "Mountain Gap Contention",
    "attacker": "Neutral",
    "time": "45 min",
    "usa_tickets": 500,
    "csa_tickets": 500,
    "usa_units": [
      "17th Michigan",
      "45th Pennsylvania",
      "79th New York",
      "2nd Wisconsin",
      "Cook's Battery"
    ],
    "csa_units": [
      "5th North Carolina",
      "12th North Carolina",
      "20th North Carolina",
      "3rd Alabama",
      "Bondurant's Battery"
    ],
    "notes": "Contested mountain pass with symmetrical ticket pools."
  },
  {
    "id": "cq_antietam_north",
    "mode": "Conquest",
    "campaign": "Antietam",
    "name": "Northern Antietam Conquest",
    "attacker": "Neutral",
    "time": "60 min",
    "usa_tickets": 750,
    "csa_tickets": 750,
    "usa_units": [
      "Iron Brigade",
      "14th Brooklyn",
      "20th Massachusetts",
      "1st PA Rifles",
      "2nd US Sharpshooters",
      "Battery B, 4th US",
      "Gibbon's Battery"
    ],
    "csa_units": [
      "Texas Brigade",
      "Stonewall Brigade",
      "Louisiana Tigers",
      "18th Georgia",
      "2nd Mississippi",
      "Poague's Battery",
      "Pelham's Battery"
    ],
    "notes": "Large-scale 5-sector conquest spanning East Woods, Cornfield, and West Woods."
  },
  {
    "id": "cq_antietam_center",
    "mode": "Conquest",
    "campaign": "Antietam",
    "name": "Central Antietam Conquest",
    "attacker": "Neutral",
    "time": "60 min",
    "usa_tickets": 750,
    "csa_tickets": 750,
    "usa_units": [
      "Irish Brigade",
      "14th Connecticut",
      "108th New York",
      "7th Maine",
      "5th Maryland",
      "Clark's Battery",
      "Cowan's Battery"
    ],
    "csa_units": [
      "Rodes' Brigade",
      "Anderson's Brigade",
      "Kershaw's Brigade",
      "4th North Carolina",
      "Carter's Battery",
      "Boyce's Battery"
    ],
    "notes": "Large-scale conquest covering Roulette Farm, Bloody Lane, and Piper Farm."
  },
  {
    "id": "cq_harpers_ferry",
    "mode": "Conquest",
    "campaign": "Harpers Ferry",
    "name": "Harpers Ferry Siege Conquest",
    "attacker": "Neutral",
    "time": "60 min",
    "usa_tickets": 750,
    "csa_tickets": 750,
    "usa_units": [
      "126th New York",
      "111th New York",
      "39th New York",
      "32nd Ohio",
      "9th Vermont",
      "Rigby's Battery",
      "Graham's Battery"
    ],
    "csa_units": [
      "Barksdale's Brigade",
      "Kershaw's Brigade",
      "Early's Brigade",
      "1st SC Rifles",
      "Crenshaw's Battery",
      "Latimer's Battery"
    ],
    "notes": "Multi-sector battle spanning Bolivar Heights, School House Ridge, and Town."
  },
  {
    "id": "pp_antietam_woods",
    "mode": "Picket Patrol",
    "campaign": "Antietam",
    "name": "East Woods Picket Patrol",
    "attacker": "Neutral",
    "time": "30 min",
    "usa_tickets": 250,
    "csa_tickets": 250,
    "usa_units": [
      "1st Pennsylvania Rifles",
      "2nd US Sharpshooters",
      "6th Wisconsin"
    ],
    "csa_units": [
      "1st Texas",
      "4th Texas",
      "18th Georgia"
    ],
    "notes": "Small-scale skirmishers & sharpshooters patrol mode."
  },
  {
    "id": "pp_south_mountain_trail",
    "mode": "Picket Patrol",
    "campaign": "South Mountain",
    "name": "Mountain Trail Picket Patrol",
    "attacker": "Neutral",
    "time": "30 min",
    "usa_tickets": 250,
    "csa_tickets": 250,
    "usa_units": [
      "17th Michigan",
      "36th Ohio",
      "1st US Sharpshooters"
    ],
    "csa_units": [
      "5th North Carolina",
      "12th North Carolina",
      "1st Virginia Cavalry (Dismounted)"
    ],
    "notes": "Fast-paced patrol ambush along mountain ridge trails."
  },
  {
    "id": "pp_harpers_ferry_outskirts",
    "mode": "Picket Patrol",
    "campaign": "Harpers Ferry",
    "name": "Shenandoah Outskirts Patrol",
    "attacker": "Neutral",
    "time": "30 min",
    "usa_tickets": 250,
    "csa_tickets": 250,
    "usa_units": [
      "12th New York Cavalry",
      "87th Ohio",
      "1st Maryland PHB"
    ],
    "csa_units": [
      "1st Maryland Battalion",
      "7th Louisiana",
      "13th Virginia"
    ],
    "notes": "Close-range patrol clashes along river road."
  }
];

let currentLang = localStorage.getItem(STORAGE_KEY_LANG_MAP) || "zh_cn_en";
if (!window.I18N || !window.I18N[currentLang]) currentLang = "zh_cn_en";

function t(key, ...args) {
  const dict = (window.I18N && window.I18N[currentLang]) || (window.I18N && window.I18N.zh_cn_en) || {};
  const val = dict[key];
  if (typeof val === "function") return val(...args);
  return val !== undefined ? val : key;
}

// 用户状态记忆：disabledMapIds: { [mapId]: true }, disableReasons: { [mapId]: "原因" }
let poolState = {
  selectedMode: "Skirmish",
  selectedCampaign: "ALL",
  disabledMapIds: {},
  disableReasons: {}
};

let lastDrawnMap = null;

window.addEventListener("DOMContentLoaded", async () => {
  loadPoolState();
  bindLanguageButtons();
  bindModeCards();
  bindCampaignFilters();
  bindActionButtons();
  applyLanguage(currentLang, false);

  // 尝试读取同级目录的 maps_data.json（方便日后直接编辑 JSON 更新地图票数）
  try {
    const resp = await fetch("maps_data.json?t=" + Date.now());
    if (resp.ok) {
      const externalMaps = await resp.json();
      if (Array.isArray(externalMaps) && externalMaps.length > 0) {
        ALL_MAPS = externalMaps;
      }
    }
  } catch (e) {
    // 本地 file:// 打开时自动使用内置 ALL_MAPS
  }

  refreshAllViews();
});

function loadPoolState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MAP_STATE);
    if (raw) {
      const parsed = JSON.parse(raw);
      poolState.selectedMode = parsed.selectedMode || "Skirmish";
      poolState.selectedCampaign = parsed.selectedCampaign || "ALL";
      poolState.disabledMapIds = parsed.disabledMapIds || {};
      poolState.disableReasons = parsed.disableReasons || {};
    }
  } catch (e) {}
}

function savePoolState() {
  localStorage.setItem(STORAGE_KEY_MAP_STATE, JSON.stringify(poolState));
}

function bindLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang && window.I18N && window.I18N[lang]) {
        applyLanguage(lang, true);
      }
    });
  });
}

function applyLanguage(lang, reRender = true) {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY_LANG_MAP, lang);
  document.documentElement.lang = t("htmlLang");

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  if (reRender) {
    refreshAllViews();
  }
}

function bindModeCards() {
  document.querySelectorAll(".mode-pill-card").forEach((card) => {
    const handler = () => {
      const mode = card.getAttribute("data-mode");
      if (!mode) return;
      poolState.selectedMode = mode;
      savePoolState();
      refreshAllViews();
    };
    card.addEventListener("click", handler);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handler();
      }
    });
  });
}

function bindCampaignFilters() {
  document.querySelectorAll(".camp-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      poolState.selectedCampaign = btn.getAttribute("data-camp") || "ALL";
      savePoolState();
      refreshAllViews();
    });
  });
}

function bindActionButtons() {
  document.getElementById("drawMapBtn").addEventListener("click", drawRandomMap);

  document.getElementById("disableDrawnBtn").addEventListener("click", () => {
    if (!lastDrawnMap) return;
    poolState.disabledMapIds[lastDrawnMap.id] = true;
    if (!poolState.disableReasons[lastDrawnMap.id]) {
      poolState.disableReasons[lastDrawnMap.id] = "近期已打 / Recently Played";
    }
    savePoolState();
    refreshAllViews();
  });

  document.getElementById("enableAllBtn").addEventListener("click", () => {
    ALL_MAPS.filter((m) => m.mode === poolState.selectedMode).forEach((m) => {
      delete poolState.disabledMapIds[m.id];
    });
    savePoolState();
    refreshAllViews();
  });

  document.getElementById("copyDrawResultBtn").addEventListener("click", copyDrawSummary);

  document.getElementById("exportMapCfgBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(poolState, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `WoR_MapPool_Config_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  const importInput = document.getElementById("importMapCfgInput");
  document.getElementById("importMapCfgBtn").addEventListener("click", () => importInput.click());
  importInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.disabledMapIds) poolState.disabledMapIds = data.disabledMapIds;
        if (data.disableReasons) poolState.disableReasons = data.disableReasons;
        if (data.selectedMode) poolState.selectedMode = data.selectedMode;
        savePoolState();
        refreshAllViews();
      } catch (err) {
        alert("Invalid JSON file");
      }
      importInput.value = "";
    };
    reader.readAsText(file);
  });
}

function refreshAllViews() {
  // 高亮当前模式卡片与更新各模式启用计数
  ["Skirmish", "Contention", "Conquest", "Picket Patrol"].forEach((mode) => {
    const modeMaps = ALL_MAPS.filter((m) => m.mode === mode);
    const activeCount = modeMaps.filter((m) => !poolState.disabledMapIds[m.id]).length;
    const countEl = document.getElementById(`count_${mode}`);
    if (countEl) countEl.textContent = `${activeCount} / ${modeMaps.length}`;
  });

  document.querySelectorAll(".mode-pill-card").forEach((card) => {
    card.classList.toggle("active", card.getAttribute("data-mode") === poolState.selectedMode);
  });

  document.querySelectorAll(".camp-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-camp") === poolState.selectedCampaign);
  });

  const modeMaps = ALL_MAPS.filter((m) => m.mode === poolState.selectedMode);
  const activeInMode = modeMaps.filter((m) => !poolState.disabledMapIds[m.id]);
  const disabledInMode = modeMaps.filter((m) => poolState.disabledMapIds[m.id]);

  const statsEl = document.getElementById("poolStatsLabel");
  if (statsEl) {
    statsEl.textContent = t("mapPoolStats", activeInMode.length, modeMaps.length, disabledInMode.length);
  }

  renderMapTable(modeMaps);
  renderDisabledNotice(disabledInMode);
}

function renderMapTable(modeMaps) {
  const tbody = document.getElementById("mapPoolTbody");
  if (!tbody) return;

  const filtered = modeMaps.filter((m) => {
    if (poolState.selectedCampaign === "ALL") return true;
    return m.campaign === poolState.selectedCampaign;
  });

  tbody.innerHTML = filtered
    .map((m) => {
      const isDisabled = !!poolState.disabledMapIds[m.id];
      const reason = poolState.disableReasons[m.id] || "";
      const usaPreview = m.usa_units.slice(0, 2).join(", ") + (m.usa_units.length > 2 ? ` +${m.usa_units.length - 2}` : "");
      const csaPreview = m.csa_units.slice(0, 2).join(", ") + (m.csa_units.length > 2 ? ` +${m.csa_units.length - 2}` : "");

      return `
        <tr class="${isDisabled ? "row-disabled" : ""}">
          <td>
            <label class="switch">
              <input type="checkbox" id="chk_${m.id}" name="chk_${m.id}" ${!isDisabled ? "checked" : ""} onchange="toggleMapInPool('${m.id}', this.checked)" />
              <span class="slider"></span>
            </label>
            <div style="font-size:0.74rem; margin-top:3px; color:${isDisabled ? "#e06c75" : "#6fd08c"};">
              ${escapeHtml(isDisabled ? t("mapStatusExcluded") : t("mapStatusInPool"))}
            </div>
          </td>
          <td>
            <strong>${escapeHtml(m.name)}</strong>
            <div style="font-size:0.76rem; color:var(--text-muted);">Attacker: ${escapeHtml(m.attacker)} · ${escapeHtml(m.time)}</div>
          </td>
          <td>${escapeHtml(m.campaign)}</td>
          <td>
            <span style="color:var(--usa-light); font-weight:700;">USA ${m.usa_tickets}</span> /
            <span style="color:var(--csa-light); font-weight:700;">CSA ${m.csa_tickets}</span>
          </td>
          <td>
            <div><span class="unit-tag-mini">USA: ${escapeHtml(usaPreview)}</span></div>
            <div><span class="unit-tag-mini">CSA: ${escapeHtml(csaPreview)}</span></div>
          </td>
          <td>
            <input type="text" id="reason_${m.id}" name="reason_${m.id}" class="reason-input"
              placeholder="${escapeHtml(t("mapPhReason"))}"
              value="${escapeHtml(reason)}"
              oninput="updateDisableReason('${m.id}', this.value)" />
          </td>
        </tr>
      `;
    })
    .join("");
}

window.toggleMapInPool = function (mapId, isEnabled) {
  if (isEnabled) {
    delete poolState.disabledMapIds[mapId];
  } else {
    poolState.disabledMapIds[mapId] = true;
  }
  savePoolState();
  refreshAllViews();
};

window.updateDisableReason = function (mapId, val) {
  poolState.disableReasons[mapId] = val;
  savePoolState();
  const modeMaps = ALL_MAPS.filter((m) => m.mode === poolState.selectedMode);
  const disabledInMode = modeMaps.filter((m) => poolState.disabledMapIds[m.id]);
  renderDisabledNotice(disabledInMode);
};

function renderDisabledNotice(disabledList) {
  const box = document.getElementById("disabledNoticeBox");
  const listEl = document.getElementById("disabledNoticeList");
  if (!box || !listEl) return;

  if (disabledList.length === 0) {
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");
  listEl.innerHTML = disabledList
    .map((m) => {
      const reason = poolState.disableReasons[m.id] ? ` — ${poolState.disableReasons[m.id]}` : "";
      return `<li><strong>[${escapeHtml(m.campaign)}] ${escapeHtml(m.name)}</strong>${escapeHtml(reason)}</li>`;
    })
    .join("");
}

function drawRandomMap() {
  const candidatePool = ALL_MAPS.filter((m) => {
    if (m.mode !== poolState.selectedMode) return false;
    if (poolState.disabledMapIds[m.id]) return false;
    if (poolState.selectedCampaign !== "ALL" && m.campaign !== poolState.selectedCampaign) return false;
    return true;
  });

  if (candidatePool.length === 0) {
    alert(t("mapAlertEmptyPool"));
    return;
  }

  // 避免连续两次抽到同一张（如果池里大于1张）
  let filteredPool = candidatePool;
  if (candidatePool.length > 1 && lastDrawnMap) {
    filteredPool = candidatePool.filter((m) => m.id !== lastDrawnMap.id);
  }

  const chosen = filteredPool[Math.floor(Math.random() * filteredPool.length)];
  lastDrawnMap = chosen;

  document.getElementById("drawResultBox").classList.remove("hidden");
  document.getElementById("drawnMapName").textContent = chosen.name;
  document.getElementById("drawnModeTag").textContent = `Mode: ${chosen.mode}`;
  document.getElementById("drawnCampTag").textContent = `Campaign: ${chosen.campaign}`;
  document.getElementById("drawnAttackerTag").textContent = `Attacker: ${chosen.attacker}`;
  document.getElementById("drawnTimeTag").textContent = `Time: ${chosen.time}`;

  document.getElementById("drawnUsaTickets").textContent = chosen.usa_tickets;
  document.getElementById("drawnCsaTickets").textContent = chosen.csa_tickets;

  document.getElementById("drawnUsaUnits").innerHTML = chosen.usa_units.map((u) => `<li>${escapeHtml(u)}</li>`).join("");
  document.getElementById("drawnCsaUnits").innerHTML = chosen.csa_units.map((u) => `<li>${escapeHtml(u)}</li>`).join("");
  document.getElementById("drawnMapNotes").textContent = chosen.notes ? `ℹ️ ${chosen.notes}` : "";
}

function copyDrawSummary() {
  if (!lastDrawnMap) return;
  const m = lastDrawnMap;
  const modeMaps = ALL_MAPS.filter((item) => item.mode === poolState.selectedMode);
  const disabledInMode = modeMaps.filter((item) => poolState.disabledMapIds[item.id]);

  const lines = [
    `【War of Rights 联队活动地图抽取结果 Event Map Draw】`,
    `🗺️ 抽中地图 Selected Map：${m.name} (${m.campaign} - ${m.mode})`,
    `⏱️ 时长 Time：${m.time} | 进攻方 Attacker：${m.attacker}`,
    `🎫 双方票数 Tickets：USA ${m.usa_tickets} vs CSA ${m.csa_tickets}`,
    `🔵 USA 编制 Units：${m.usa_units.join(", ")}`,
    `⚪ CSA 编制 Units：${m.csa_units.join(", ")}`
  ];

  if (disabledInMode.length > 0) {
    lines.push("", `🚫 本次已移出抽取池地图 Excluded Maps (${poolState.selectedMode})：`);
    disabledInMode.forEach((d) => {
      const r = poolState.disableReasons[d.id] ? ` (${poolState.disableReasons[d.id]})` : "";
      lines.push(`- ${d.name}${r}`);
    });
  }

  navigator.clipboard.writeText(lines.join("\n")).then(() => {
    const status = document.getElementById("mapCopyStatus");
    if (status) {
      status.textContent = t("mapCopyDone");
      setTimeout(() => (status.textContent = ""), 3000);
    }
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

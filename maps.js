const STORAGE_KEY_MAP_STATE = "wor_map_pool_state_v2";
const STORAGE_KEY_LANG_MAP = "wor_balancer_lang_v8";

// 完整内置地图数据库（含《士气平衡 2026.9.pdf》全部 47 张 Skirmish 精确票数与 Final Push 时间）
let ALL_MAPS = [
  {
    "id": "dc_alexander_farm",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Alexander Farm",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "4:04",
    "usa_tickets": 159,
    "csa_tickets": 117,
    "total_tickets": 276,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "35.90%",
    "contrast_usa": "-26.42%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/alexander_farm.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_crossroads",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Crossroads",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "3:34",
    "usa_tickets": 145,
    "csa_tickets": 106,
    "total_tickets": 251,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "36.79%",
    "contrast_usa": "-26.90%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/crossroads.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_smith_field",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Smith Field",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "4:04",
    "usa_tickets": 137,
    "csa_tickets": 106,
    "total_tickets": 243,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "29.25%",
    "contrast_usa": "-22.63%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/smith_field.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_crecys_cornfield",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Crecy's Cornfield",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "4:04",
    "usa_tickets": 120,
    "csa_tickets": 100,
    "total_tickets": 220,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "20.00%",
    "contrast_usa": "-16.67%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/crecys_cornfield.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_larsen_homestead",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Larsen Homestead",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "4:04",
    "usa_tickets": 125,
    "csa_tickets": 104,
    "total_tickets": 229,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "20.19%",
    "contrast_usa": "-16.80%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/larsen_homestead.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_south_woodlot",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "South Woodlot",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "3:34",
    "usa_tickets": 153,
    "csa_tickets": 127,
    "total_tickets": 280,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "20.47%",
    "contrast_usa": "-16.99%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/south_woodlot.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_flemmings_meadow",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Flemming's Meadow",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "4:04",
    "usa_tickets": 154,
    "csa_tickets": 102,
    "total_tickets": 256,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "50.98%",
    "contrast_usa": "-33.77%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/flemmings_meadow.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_wagon_road",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Wagon Road",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "4:04",
    "usa_tickets": 171,
    "csa_tickets": 120,
    "total_tickets": 291,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "42.50%",
    "contrast_usa": "-29.82%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/wagon_road.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_crossley_creek",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Crossley Creek",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "4:04",
    "usa_tickets": 162,
    "csa_tickets": 103,
    "total_tickets": 265,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "57.28%",
    "contrast_usa": "-36.42%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/crossley_creek.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_union_camp",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Union Camp",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "3:34",
    "usa_tickets": 156,
    "csa_tickets": 125,
    "total_tickets": 281,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "24.80%",
    "contrast_usa": "-19.87%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/union_camp.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_pats_turnpike",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Pat's Turnpike",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "3:44",
    "usa_tickets": 157,
    "csa_tickets": 129,
    "total_tickets": 286,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "21.71%",
    "contrast_usa": "-17.83%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/pats_turnpike.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_stefans_lot",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Stefan's Lot",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "3:54",
    "usa_tickets": 131,
    "csa_tickets": 137,
    "total_tickets": 268,
    "favored_side": "CSA",
    "favored_role": "Attacker",
    "contrast_csa": "-4.38%",
    "contrast_usa": "4.58%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/stefans_lot.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "dc_confederate_encampment",
    "mode": "Skirmish",
    "campaign": "Drill Camp",
    "name": "Confederate Encampment",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "4:04",
    "usa_tickets": 156,
    "csa_tickets": 107,
    "total_tickets": 263,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "45.79%",
    "contrast_usa": "-31.41%",
    "usa_units": [
      "1st Drill Battalion",
      "2nd Drill Battalion",
      "Training Battery"
    ],
    "csa_units": [
      "1st Confederate Drill",
      "2nd Confederate Drill",
      "Training Battery"
    ],
    "image_url": "img/confederate_encampment.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_east_woods_skirmish",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "East Woods Skirmish",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "3:14",
    "usa_tickets": 143,
    "csa_tickets": 115,
    "total_tickets": 258,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "24.35%",
    "contrast_usa": "-19.58%",
    "usa_units": [
      "2nd Wisconsin",
      "6th Wisconsin",
      "7th Wisconsin",
      "19th Indiana",
      "Battery B, 4th US"
    ],
    "csa_units": [
      "1st Texas",
      "4th Texas",
      "5th Texas",
      "18th Georgia",
      "Hampton's Legion",
      "Reilly's Battery"
    ],
    "image_url": "img/east_woods_skirmish.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_hookers_push",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Hooker's Push",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "6:10",
    "usa_tickets": 122,
    "csa_tickets": 122,
    "total_tickets": 244,
    "favored_side": "Even",
    "favored_role": "Even",
    "contrast_csa": "0.00%",
    "contrast_usa": "0.00%",
    "usa_units": [
      "1st PA Rifles",
      "3rd PA Reserves",
      "4th PA Reserves",
      "8th PA Reserves",
      "Cooper's Battery B"
    ],
    "csa_units": [
      "2nd Mississippi",
      "11th Mississippi",
      "4th Alabama",
      "6th North Carolina",
      "Pelham's Battery"
    ],
    "image_url": "img/hookers_push.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_hagerstown_turnpike",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Hagerstown Turnpike",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "1:50",
    "usa_tickets": 130,
    "csa_tickets": 110,
    "total_tickets": 240,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "18.18%",
    "contrast_usa": "-15.38%",
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
    "image_url": "img/hagerstown_turnpike.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_millers_cornfield",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Miller's Cornfield",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "2:02",
    "usa_tickets": 134,
    "csa_tickets": 122,
    "total_tickets": 256,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "9.84%",
    "contrast_usa": "-8.96%",
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
    "image_url": "img/millers_cornfield.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_east_woods",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "East Woods",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "3:18",
    "usa_tickets": 130,
    "csa_tickets": 124,
    "total_tickets": 254,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "4.84%",
    "contrast_usa": "-4.62%",
    "usa_units": [
      "12th Massachusetts",
      "13th Massachusetts",
      "9th New York",
      "11th Pennsylvania",
      "Thompson's Battery"
    ],
    "csa_units": [
      "1st Texas",
      "4th Texas",
      "18th Georgia",
      "27th Georgia",
      "Reilly's Battery"
    ],
    "image_url": "img/east_woods.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_nicodemus_hill",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Nicodemus Hill",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "2:26",
    "usa_tickets": 174,
    "csa_tickets": 89,
    "total_tickets": 263,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "95.51%",
    "contrast_usa": "-48.85%",
    "usa_units": [
      "1st US Sharpshooters",
      "6th US Cavalry",
      "8th Illinois Cavalry",
      "Tidball's Horse Artillery"
    ],
    "csa_units": [
      "1st Virginia Cavalry",
      "4th Virginia Cavalry",
      "9th Virginia Cavalry",
      "Pelham's Horse Artillery"
    ],
    "image_url": "img/nicodemus_hill.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_bloody_lane",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Bloody Lane",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "3:06",
    "usa_tickets": 146,
    "csa_tickets": 100,
    "total_tickets": 246,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "46.00%",
    "contrast_usa": "-31.51%",
    "usa_units": [
      "69th New York",
      "63rd New York",
      "88th New York",
      "29th Massachusetts",
      "14th Connecticut",
      "Clark's Battery"
    ],
    "csa_units": [
      "2nd North Carolina",
      "4th North Carolina",
      "14th North Carolina",
      "30th North Carolina",
      "3rd Alabama",
      "Carter's Battery"
    ],
    "image_url": "img/bloody_lane.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_pry_ford",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Pry Ford",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "2:58",
    "usa_tickets": 124,
    "csa_tickets": 84,
    "total_tickets": 208,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "47.62%",
    "contrast_usa": "-32.26%",
    "usa_units": [
      "4th US Infantry",
      "6th US Infantry",
      "10th US Infantry",
      "Weed's Battery"
    ],
    "csa_units": [
      "1st South Carolina",
      "12th South Carolina",
      "13th South Carolina",
      "Pee Dee Artillery"
    ],
    "image_url": "img/pry_ford.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_pry_grist_mill",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Pry Grist Mill",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "2:44",
    "usa_tickets": 150,
    "csa_tickets": 106,
    "total_tickets": 256,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "41.51%",
    "contrast_usa": "-29.33%",
    "usa_units": [
      "2nd US Infantry",
      "3rd US Infantry",
      "14th US Infantry",
      "Randol's Battery"
    ],
    "csa_units": [
      "14th South Carolina",
      "1st SC Rifles",
      "McIntosh's Battery"
    ],
    "image_url": "img/pry_grist_mill.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_pry_house",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Pry House",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "2:04",
    "usa_tickets": 115,
    "csa_tickets": 125,
    "total_tickets": 240,
    "favored_side": "CSA",
    "favored_role": "Attacker",
    "contrast_csa": "-8.00%",
    "contrast_usa": "8.70%",
    "usa_units": [
      "1st US Sharpshooters",
      "5th New York Zouaves",
      "10th New York",
      "Hazlett's Battery"
    ],
    "csa_units": [
      "7th Virginia",
      "11th Virginia",
      "17th Virginia",
      "Kemper's Battery"
    ],
    "image_url": "img/pry_house.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_west_woods",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "West Woods",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "2:12",
    "usa_tickets": 137,
    "csa_tickets": 101,
    "total_tickets": 238,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "35.64%",
    "contrast_usa": "-26.28%",
    "usa_units": [
      "15th Massachusetts",
      "19th Massachusetts",
      "20th Massachusetts",
      "7th Michigan",
      "34th New York",
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
    "image_url": "img/west_woods.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_dunker_church",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Dunker Church",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "3:44",
    "usa_tickets": 137,
    "csa_tickets": 103,
    "total_tickets": 240,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "33.01%",
    "contrast_usa": "-24.82%",
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
    "image_url": "img/dunker_church.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_burnside_bridge",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Burnside Bridge",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "4:24",
    "usa_tickets": 137,
    "csa_tickets": 93,
    "total_tickets": 230,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "47.31%",
    "contrast_usa": "-32.12%",
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
    "image_url": "img/burnside_bridge.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_cookes_countercharge",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Cooke's Countercharge",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "2:48",
    "usa_tickets": 143,
    "csa_tickets": 122,
    "total_tickets": 265,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "17.21%",
    "contrast_usa": "-14.69%",
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
    "image_url": "img/cookes_countercharge.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_otto_sherrick_farm",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Otto & Sherrick Farm",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "2:16",
    "usa_tickets": 159,
    "csa_tickets": 92,
    "total_tickets": 251,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "72.83%",
    "contrast_usa": "-42.14%",
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
    "image_url": "img/otto_and_sherrick_farm.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_roulette_lane",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Roulette Lane",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "2:26",
    "usa_tickets": 127,
    "csa_tickets": 135,
    "total_tickets": 262,
    "favored_side": "CSA",
    "favored_role": "Attacker",
    "contrast_csa": "-5.93%",
    "contrast_usa": "6.30%",
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
    "image_url": "img/roulette_lane.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_piper_farm",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Piper Farm",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "2:12",
    "usa_tickets": 124,
    "csa_tickets": 100,
    "total_tickets": 224,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "24.00%",
    "contrast_usa": "-19.35%",
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
    "image_url": "img/piper_farm.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "ant_hills_counterattack",
    "mode": "Skirmish",
    "campaign": "Antietam",
    "name": "Hill's Counterattack",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "2:38",
    "usa_tickets": 135,
    "csa_tickets": 121,
    "total_tickets": 256,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "11.57%",
    "contrast_usa": "-10.37%",
    "usa_units": [
      "4th Rhode Island",
      "16th Connecticut",
      "8th Connecticut",
      "Durell's Battery"
    ],
    "csa_units": [
      "1st South Carolina",
      "12th South Carolina",
      "13th South Carolina",
      "14th South Carolina",
      "Pegram's Battery"
    ],
    "image_url": "img/hills_counterattack.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "sm_garlands_stand",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Garland's Stand",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "4:06",
    "usa_tickets": 152,
    "csa_tickets": 120,
    "total_tickets": 272,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "26.67%",
    "contrast_usa": "-21.05%",
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
    "image_url": "img/garlands_stand.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "sm_coxs_push",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Cox's Push",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "3:10",
    "usa_tickets": 163,
    "csa_tickets": 102,
    "total_tickets": 265,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "59.80%",
    "contrast_usa": "-37.42%",
    "usa_units": [
      "11th Ohio",
      "36th Ohio",
      "17th Michigan",
      "Simmonds' Battery"
    ],
    "csa_units": [
      "12th North Carolina",
      "13th North Carolina",
      "20th North Carolina",
      "Bondurant's Battery"
    ],
    "image_url": "img/coxs_push.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "sm_hatchs_attack",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Hatch's Attack",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "3:28",
    "usa_tickets": 134,
    "csa_tickets": 115,
    "total_tickets": 249,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "16.52%",
    "contrast_usa": "-14.18%",
    "usa_units": [
      "22nd New York",
      "24th New York",
      "30th New York",
      "14th Brooklyn",
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
    "image_url": "img/hatchs_attack.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "sm_andersons_counterattack",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Anderson's Counterattack",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "3:20",
    "usa_tickets": 151,
    "csa_tickets": 110,
    "total_tickets": 261,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "37.27%",
    "contrast_usa": "-27.15%",
    "usa_units": [
      "35th Massachusetts",
      "45th Pennsylvania",
      "17th Michigan",
      "Cook's Battery"
    ],
    "csa_units": [
      "2nd Virginia",
      "4th Virginia",
      "5th Virginia",
      "27th Virginia",
      "Carpenter's Battery"
    ],
    "image_url": "img/andersons_counterattack.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "sm_renos_fall",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Reno's Fall",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "3:41",
    "usa_tickets": 138,
    "csa_tickets": 102,
    "total_tickets": 240,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "35.29%",
    "contrast_usa": "-26.09%",
    "usa_units": [
      "51st New York",
      "51st Pennsylvania",
      "21st Massachusetts",
      "Clark's Battery"
    ],
    "csa_units": [
      "6th North Carolina",
      "2nd Mississippi",
      "11th Mississippi",
      "Reilly's Battery"
    ],
    "image_url": "img/renos_fall.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "sm_colquitts_defence",
    "mode": "Skirmish",
    "campaign": "South Mountain",
    "name": "Colquitt's Defence",
    "defender": "CSA",
    "attacker": "USA",
    "final_push": "4:02",
    "usa_tickets": 168,
    "csa_tickets": 117,
    "total_tickets": 285,
    "favored_side": "USA",
    "favored_role": "Attacker",
    "contrast_csa": "43.59%",
    "contrast_usa": "-30.36%",
    "usa_units": [
      "2nd Wisconsin",
      "6th Wisconsin",
      "7th Wisconsin",
      "19th Indiana",
      "Battery B, 4th US"
    ],
    "csa_units": [
      "6th Georgia",
      "23rd Georgia",
      "27th Georgia",
      "28th Georgia",
      "13th Alabama",
      "Lane's Battery"
    ],
    "image_url": "img/colquitts_defence.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "hf_maryland_heights",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Maryland Heights",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "2:34",
    "usa_tickets": 155,
    "csa_tickets": 149,
    "total_tickets": 304,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "4.03%",
    "contrast_usa": "-3.87%",
    "usa_units": [
      "126th New York",
      "39th New York",
      "1st Maryland PHB",
      "5th NY Heavy Artillery"
    ],
    "csa_units": [
      "13th Mississippi",
      "17th Mississippi",
      "18th Mississippi",
      "21st Mississippi",
      "8th Florida",
      "McLaws' Artillery"
    ],
    "image_url": "img/maryland_heights.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "hf_river_crossing",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "River Crossing",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "4:22",
    "usa_tickets": 111,
    "csa_tickets": 159,
    "total_tickets": 270,
    "favored_side": "CSA",
    "favored_role": "Attacker",
    "contrast_csa": "-30.19%",
    "contrast_usa": "43.24%",
    "usa_units": [
      "87th Ohio",
      "12th Illinois Cavalry",
      "Von Sehlen's Battery"
    ],
    "csa_units": [
      "7th Louisiana",
      "8th Louisiana",
      "9th Louisiana",
      "Latimer's Battery"
    ],
    "image_url": "img/river_crossing.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "hf_downtown",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Downtown",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "2:12",
    "usa_tickets": 135,
    "csa_tickets": 124,
    "total_tickets": 259,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "8.87%",
    "contrast_usa": "-8.15%",
    "usa_units": [
      "87th Ohio",
      "1st Maryland Cavalry",
      "Graham's Battery"
    ],
    "csa_units": [
      "13th Virginia",
      "31st Virginia",
      "7th Louisiana",
      "Latimer's Battery"
    ],
    "image_url": "img/downtown.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "hf_school_house_ridge",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "School House Ridge",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "1:30",
    "usa_tickets": 157,
    "csa_tickets": 150,
    "total_tickets": 307,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "4.67%",
    "contrast_usa": "-4.46%",
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
    "image_url": "img/school_house_ridge.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "hf_high_street",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "High Street",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "1:52",
    "usa_tickets": 147,
    "csa_tickets": 114,
    "total_tickets": 261,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "28.95%",
    "contrast_usa": "-22.45%",
    "usa_units": [
      "111th New York",
      "115th New York",
      "1st Maryland PHB",
      "Rigby's Battery"
    ],
    "csa_units": [
      "10th Virginia",
      "23rd Virginia",
      "37th Virginia",
      "Lusk's Battery"
    ],
    "image_url": "img/high_street.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "hf_bolivar_heights_camp",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Bolivar Heights Camp",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "3:28",
    "usa_tickets": 145,
    "csa_tickets": 120,
    "total_tickets": 265,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "20.83%",
    "contrast_usa": "-17.24%",
    "usa_units": [
      "9th Vermont",
      "32nd Ohio",
      "60th Ohio",
      "12th NY Cavalry",
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
    "image_url": "img/bolivar_heights_camp.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "hf_shenandoah_street",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Shenandoah Street",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "1:14",
    "usa_tickets": 145,
    "csa_tickets": 122,
    "total_tickets": 267,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "18.85%",
    "contrast_usa": "-15.86%",
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
    "image_url": "img/shenandoah_street.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "hf_harpers_graveyard",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Harpers Graveyard",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "1:44",
    "usa_tickets": 124,
    "csa_tickets": 88,
    "total_tickets": 212,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "40.91%",
    "contrast_usa": "-29.03%",
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
    "image_url": "img/harpers_graveyard.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "hf_bolivar_heights_redoubt",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Bolivar Heights Redoubt",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "3:24",
    "usa_tickets": 142,
    "csa_tickets": 134,
    "total_tickets": 276,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "5.97%",
    "contrast_usa": "-5.63%",
    "usa_units": [
      "111th New York",
      "115th New York",
      "65th Illinois",
      "15th Indiana Battery"
    ],
    "csa_units": [
      "1st SC Rifles",
      "12th South Carolina",
      "13th South Carolina",
      "14th South Carolina",
      "Pee Dee Artillery"
    ],
    "image_url": "img/bolivar_heights_redoubt.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "hf_washington_street",
    "mode": "Skirmish",
    "campaign": "Harpers Ferry",
    "name": "Washington Street",
    "defender": "USA",
    "attacker": "CSA",
    "final_push": "1:56",
    "usa_tickets": 140,
    "csa_tickets": 123,
    "total_tickets": 263,
    "favored_side": "USA",
    "favored_role": "Defender",
    "contrast_csa": "13.82%",
    "contrast_usa": "-12.14%",
    "usa_units": [
      "39th New York",
      "126th New York",
      "9th Vermont",
      "Potts' Battery"
    ],
    "csa_units": [
      "1st Maryland Battalion",
      "10th Virginia",
      "23rd Virginia",
      "Crenshaw's Battery"
    ],
    "image_url": "img/washington_street.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "con_cornfield",
    "mode": "Contention",
    "campaign": "Antietam",
    "name": "Cornfield Contention",
    "defender": "Neutral",
    "attacker": "Neutral",
    "final_push": "5:00",
    "usa_tickets": 500,
    "csa_tickets": 500,
    "total_tickets": 1000,
    "favored_side": "Even",
    "favored_role": "Even",
    "contrast_csa": "0.00%",
    "contrast_usa": "0.00%",
    "usa_units": [
      "6th Wisconsin",
      "7th Wisconsin",
      "19th Indiana",
      "14th Brooklyn",
      "Battery B, 4th US"
    ],
    "csa_units": [
      "1st Texas",
      "4th Texas",
      "5th Texas",
      "18th Georgia",
      "Poague's Battery"
    ],
    "image_url": "img/cornfield_contention.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "con_dunker_church",
    "mode": "Contention",
    "campaign": "Antietam",
    "name": "Dunker Church Contention",
    "defender": "Neutral",
    "attacker": "Neutral",
    "final_push": "5:00",
    "usa_tickets": 500,
    "csa_tickets": 500,
    "total_tickets": 1000,
    "favored_side": "Even",
    "favored_role": "Even",
    "contrast_csa": "0.00%",
    "contrast_usa": "0.00%",
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
    "image_url": "img/dunker_church_contention.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "con_sunken_road",
    "mode": "Contention",
    "campaign": "Antietam",
    "name": "Sunken Road Contention",
    "defender": "Neutral",
    "attacker": "Neutral",
    "final_push": "5:00",
    "usa_tickets": 500,
    "csa_tickets": 500,
    "total_tickets": 1000,
    "favored_side": "Even",
    "favored_role": "Even",
    "contrast_csa": "0.00%",
    "contrast_usa": "0.00%",
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
    "image_url": "img/sunken_road_contention.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "con_bolivar",
    "mode": "Contention",
    "campaign": "Harpers Ferry",
    "name": "Bolivar Plateau Contention",
    "defender": "Neutral",
    "attacker": "Neutral",
    "final_push": "5:00",
    "usa_tickets": 500,
    "csa_tickets": 500,
    "total_tickets": 1000,
    "favored_side": "Even",
    "favored_role": "Even",
    "contrast_csa": "0.00%",
    "contrast_usa": "0.00%",
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
    "image_url": "img/bolivar_plateau_contention.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "cq_antietam_north",
    "mode": "Conquest",
    "campaign": "Antietam",
    "name": "Northern Antietam Conquest",
    "defender": "Neutral",
    "attacker": "Neutral",
    "final_push": "6:00",
    "usa_tickets": 750,
    "csa_tickets": 750,
    "total_tickets": 1500,
    "favored_side": "Even",
    "favored_role": "Even",
    "contrast_csa": "0.00%",
    "contrast_usa": "0.00%",
    "usa_units": [
      "Iron Brigade",
      "14th Brooklyn",
      "20th Massachusetts",
      "1st PA Rifles",
      "Battery B, 4th US",
      "Gibbon's Battery"
    ],
    "csa_units": [
      "Texas Brigade",
      "Stonewall Brigade",
      "Louisiana Tigers",
      "18th Georgia",
      "Poague's Battery",
      "Pelham's Battery"
    ],
    "image_url": "img/northern_antietam_conquest.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "cq_antietam_center",
    "mode": "Conquest",
    "campaign": "Antietam",
    "name": "Central Antietam Conquest",
    "defender": "Neutral",
    "attacker": "Neutral",
    "final_push": "6:00",
    "usa_tickets": 750,
    "csa_tickets": 750,
    "total_tickets": 1500,
    "favored_side": "Even",
    "favored_role": "Even",
    "contrast_csa": "0.00%",
    "contrast_usa": "0.00%",
    "usa_units": [
      "Irish Brigade",
      "14th Connecticut",
      "108th New York",
      "7th Maine",
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
    "image_url": "img/central_antietam_conquest.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "cq_harpers_ferry",
    "mode": "Conquest",
    "campaign": "Harpers Ferry",
    "name": "Harpers Ferry Siege Conquest",
    "defender": "Neutral",
    "attacker": "Neutral",
    "final_push": "6:00",
    "usa_tickets": 750,
    "csa_tickets": 750,
    "total_tickets": 1500,
    "favored_side": "Even",
    "favored_role": "Even",
    "contrast_csa": "0.00%",
    "contrast_usa": "0.00%",
    "usa_units": [
      "126th New York",
      "111th New York",
      "39th New York",
      "32nd Ohio",
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
    "image_url": "img/harpers_ferry_siege_conquest.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "pp_east_woods",
    "mode": "Picket Patrol",
    "campaign": "Antietam",
    "name": "East Woods Picket Patrol",
    "defender": "Neutral",
    "attacker": "Neutral",
    "final_push": "3:00",
    "usa_tickets": 250,
    "csa_tickets": 250,
    "total_tickets": 500,
    "favored_side": "Even",
    "favored_role": "Even",
    "contrast_csa": "0.00%",
    "contrast_usa": "0.00%",
    "usa_units": [
      "1st PA Rifles",
      "2nd US Sharpshooters",
      "6th Wisconsin"
    ],
    "csa_units": [
      "1st Texas",
      "4th Texas",
      "18th Georgia"
    ],
    "image_url": "img/east_woods_picket_patrol.jpg",
    "wortool_url": "https://wortool.com/maps"
  },
  {
    "id": "pp_south_mountain",
    "mode": "Picket Patrol",
    "campaign": "South Mountain",
    "name": "Mountain Trail Picket Patrol",
    "defender": "Neutral",
    "attacker": "Neutral",
    "final_push": "3:00",
    "usa_tickets": 250,
    "csa_tickets": 250,
    "total_tickets": 500,
    "favored_side": "Even",
    "favored_role": "Even",
    "contrast_csa": "0.00%",
    "contrast_usa": "0.00%",
    "usa_units": [
      "17th Michigan",
      "36th Ohio",
      "1st US Sharpshooters"
    ],
    "csa_units": [
      "5th North Carolina",
      "12th North Carolina",
      "1st Virginia Cavalry"
    ],
    "image_url": "img/mountain_trail_picket_patrol.jpg",
    "wortool_url": "https://wortool.com/maps"
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

let poolState = {
  selectedMode: "Skirmish",
  selectedCampaign: "ALL",
  disabledMapIds: {},
  disableReasons: {},
  customImages: {}
};

let lastDrawnMap = null;
let currentlyInspectedMap = null;

window.addEventListener("DOMContentLoaded", async () => {
  loadPoolState();
  bindLanguageButtons();
  bindModeCards();
  bindCampaignFilters();
  bindActionButtons();
  bindInspectorModal();
  applyLanguage(currentLang, false);

  try {
    const resp = await fetch("maps_data.json?t=" + Date.now());
    if (resp.ok) {
      const externalMaps = await resp.json();
      if (Array.isArray(externalMaps) && externalMaps.length > 0) {
        ALL_MAPS = externalMaps;
      }
    }
  } catch (e) {}

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
      poolState.customImages = parsed.customImages || {};
    }
  } catch (e) {}
}

function savePoolState() {
  try {
    localStorage.setItem(STORAGE_KEY_MAP_STATE, JSON.stringify(poolState));
  } catch (e) {}
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
      poolState.selectedCampaign = "ALL";
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

  document.getElementById("openDrawnInspectorBtn").addEventListener("click", () => {
    if (lastDrawnMap) openMapInspector(lastDrawnMap.id);
  });

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
    const exportPayload = {
      selectedMode: poolState.selectedMode,
      selectedCampaign: poolState.selectedCampaign,
      disabledMapIds: poolState.disabledMapIds,
      disableReasons: poolState.disableReasons
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
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

function bindInspectorModal() {
  const modal = document.getElementById("mapInspectorModal");
  const closeFn = () => modal.classList.add("hidden");
  document.getElementById("closeInspectorBtn").addEventListener("click", closeFn);
  document.getElementById("closeInspectorBtn2").addEventListener("click", closeFn);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeFn();
  });

  document.getElementById("inspectorTogglePoolBtn").addEventListener("click", () => {
    if (!currentlyInspectedMap) return;
    const id = currentlyInspectedMap.id;
    const isCurrentlyDisabled = !!poolState.disabledMapIds[id];
    if (isCurrentlyDisabled) {
      delete poolState.disabledMapIds[id];
    } else {
      poolState.disabledMapIds[id] = true;
      if (!poolState.disableReasons[id]) {
        poolState.disableReasons[id] = "手动移出池外 / Excluded";
      }
    }
    savePoolState();
    refreshAllViews();
    openMapInspector(id);
  });

  const uploadBtn = document.getElementById("uploadCustomMapImgBtn");
  const uploadInput = document.getElementById("customMapImgInput");
  uploadBtn.addEventListener("click", () => uploadInput.click());
  uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file || !currentlyInspectedMap) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      poolState.customImages[currentlyInspectedMap.id] = evt.target.result;
      savePoolState();
      openMapInspector(currentlyInspectedMap.id);
    };
    reader.readAsDataURL(file);
    uploadInput.value = "";
  });
}

function refreshAllViews() {
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
            <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
              <strong class="map-name-link" onclick="openMapInspector('${m.id}')">${escapeHtml(m.name)}</strong>
              <button type="button" class="inspect-btn" onclick="openMapInspector('${m.id}')">检视 🔍</button>
            </div>
          </td>
          <td>${escapeHtml(m.campaign)}</td>
          <td>
            <span style="font-size:0.82rem;">攻 Att: <strong>${escapeHtml(m.attacker)}</strong></span><br/>
            <span style="font-size:0.78rem; color:var(--text-muted);">守 Def: ${escapeHtml(m.defender)}</span>
          </td>
          <td><strong style="color:var(--gold-accent);">${escapeHtml(m.final_push || "-")}</strong></td>
          <td>
            <span style="color:var(--usa-light); font-weight:700;">USA ${m.usa_tickets}</span> /
            <span style="color:var(--csa-light); font-weight:700;">CSA ${m.csa_tickets}</span>
            <div style="font-size:0.74rem; color:var(--text-muted);">总计 Total: ${m.total_tickets || (m.usa_tickets + m.csa_tickets)}</div>
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

window.openMapInspector = function (mapId) {
  const m = ALL_MAPS.find((item) => item.id === mapId);
  if (!m) return;
  currentlyInspectedMap = m;

  document.getElementById("inspectorTitle").textContent = `🗺️ ${m.name} (${m.campaign} · ${m.mode})`;
  document.getElementById("insRoles").textContent = `攻 Att: ${m.attacker} | 守 Def: ${m.defender}`;
  document.getElementById("insFinalPush").textContent = m.final_push || "-";
  document.getElementById("insUsaTickets").textContent = `${m.usa_tickets}`;
  document.getElementById("insCsaTickets").textContent = `${m.csa_tickets}`;
  document.getElementById("insFavored").textContent = `${m.total_tickets || m.usa_tickets + m.csa_tickets} (优势: ${m.favored_side || "-"} / ${m.favored_role || "-"})`;
  document.getElementById("insContrast").textContent = `CSA: ${m.contrast_csa || "-"} | USA: ${m.contrast_usa || "-"}`;

  document.getElementById("insUsaUnits").innerHTML = (m.usa_units || []).map((u) => `<li>${escapeHtml(u)}</li>`).join("");
  document.getElementById("insCsaUnits").innerHTML = (m.csa_units || []).map((u) => `<li>${escapeHtml(u)}</li>`).join("");

  const imgSrc = poolState.customImages[m.id] || m.image_url;
  document.getElementById("inspectorImgPathHint").textContent = `本地图片路径: ${m.image_url}`;

  const imgContainer = document.getElementById("inspectorImageContainer");
  const imgEl = document.createElement("img");
  imgEl.src = imgSrc;
  imgEl.alt = m.name;
  imgEl.onerror = () => {
    // 当仓库 img/ 目录下尚未放入该图截图时，显示战术参数卡片占位图并指引上传
    imgContainer.innerHTML = buildFallbackTacticalSvg(m);
  };
  imgContainer.innerHTML = "";
  imgContainer.appendChild(imgEl);

  const toggleBtn = document.getElementById("inspectorTogglePoolBtn");
  const isDisabled = !!poolState.disabledMapIds[m.id];
  if (isDisabled) {
    toggleBtn.textContent = "✅ 将此地图放回抽取池 Enable in Pool";
    toggleBtn.className = "btn btn-primary";
  } else {
    toggleBtn.textContent = "🚫 将此地图移出抽取池 Exclude from Pool";
    toggleBtn.className = "btn btn-danger-outline";
  }

  document.getElementById("mapInspectorModal").classList.remove("hidden");
};

function buildFallbackTacticalSvg(m) {
  return `
    <svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" style="background:#11161d;">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1e2633" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="640" height="380" fill="url(#grid)"/>
      <rect x="16" y="16" width="608" height="348" fill="none" stroke="#c8a252" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="320" y="75" fill="#c8a252" font-size="22" font-weight="bold" text-anchor="middle">${escapeHtml(m.name)}</text>
      <text x="320" y="105" fill="#9aa3b2" font-size="14" text-anchor="middle">${escapeHtml(m.campaign)} · ${escapeHtml(m.mode)} · Final Push: ${escapeHtml(m.final_push || "-")}</text>
      <rect x="70" y="135" width="220" height="80" rx="8" fill="rgba(31,66,104,0.45)" stroke="#3a6ea5" stroke-width="2"/>
      <text x="180" y="168" fill="#7fb3eb" font-size="15" font-weight="bold" text-anchor="middle">USA (${m.attacker === "USA" ? "Attacker 攻" : "Defender 守"})</text>
      <text x="180" y="198" fill="#ffffff" font-size="22" font-weight="bold" text-anchor="middle">${m.usa_tickets} Tickets</text>
      <rect x="350" y="135" width="220" height="80" rx="8" fill="rgba(75,79,86,0.45)" stroke="#7a808a" stroke-width="2"/>
      <text x="460" y="168" fill="#d1b48c" font-size="15" font-weight="bold" text-anchor="middle">CSA (${m.attacker === "CSA" ? "Attacker 攻" : "Defender 守"})</text>
      <text x="460" y="198" fill="#ffffff" font-size="22" font-weight="bold" text-anchor="middle">${m.csa_tickets} Tickets</text>
      <text x="320" y="265" fill="#cbd2df" font-size="13" text-anchor="middle">提示：将 wortool.com/maps 对应战术图保存为 ${escapeHtml(m.image_url)} 放入仓库</text>
      <text x="320" y="290" fill="#9aa3b2" font-size="12.5" text-anchor="middle">或直接点击下方“本地预览替换图片”按钮加载本地截图</text>
    </svg>
  `;
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

  let filteredPool = candidatePool;
  if (candidatePool.length > 1 && lastDrawnMap) {
    filteredPool = candidatePool.filter((m) => m.id !== lastDrawnMap.id);
  }

  const chosen = filteredPool[Math.floor(Math.random() * filteredPool.length)];
  lastDrawnMap = chosen;

  document.getElementById("drawResultBox").classList.remove("hidden");
  document.getElementById("drawnMapName").textContent = chosen.name;
  document.getElementById("drawnCampTag").textContent = `Campaign: ${chosen.campaign}`;
  document.getElementById("drawnRoleTag").textContent = `攻 Att: ${chosen.attacker} / 守 Def: ${chosen.defender}`;
  document.getElementById("drawnFinalPushTag").textContent = `Final Push: ${chosen.final_push || "-"}`;
  document.getElementById("drawnUsaTickets").textContent = chosen.usa_tickets;
  document.getElementById("drawnCsaTickets").textContent = chosen.csa_tickets;

  // 抽中后自动弹出地图详情小窗口供检视
  openMapInspector(chosen.id);
}

function copyDrawSummary() {
  if (!lastDrawnMap) return;
  const m = lastDrawnMap;
  const modeMaps = ALL_MAPS.filter((item) => item.mode === poolState.selectedMode);
  const disabledInMode = modeMaps.filter((item) => poolState.disabledMapIds[item.id]);

  const lines = [
    `【War of Rights 联队活动地图抽取结果 Event Map Draw】`,
    `🗺️ 抽中地图 Selected Map：${m.name} (${m.campaign} - ${m.mode})`,
    `⚔️ 攻守阵营 Roles：攻 Attacker ${m.attacker} | 守 Defender ${m.defender} | Final Push: ${m.final_push || "-"}`,
    `🎫 双方票数 Tickets：USA ${m.usa_tickets} vs CSA ${m.csa_tickets} (总计 Total: ${m.total_tickets || m.usa_tickets + m.csa_tickets})`,
    `🔵 USA 编制 Units：${(m.usa_units || []).join(", ")}`,
    `⚪ CSA 编制 Units：${(m.csa_units || []).join(", ")}`
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

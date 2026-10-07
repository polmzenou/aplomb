const ids = {
  // Exteriors
  villaPoolWhite: "1600596542815-ffad4c1539a9",
  houseTreeDark: "1600585154340-be6161a56a0c",
  villaPoolTerrace: "1613490493576-7fde63acd811",
  villaWhitePalms: "1613977257363-707ba9348227",
  houseWoodStreet: "1600566753190-17f0baa2a6c3",
  houseBrickWood: "1600047509807-ba8f99d2cdde",
  villaWhiteSide: "1512917774080-9991f1c4c750",
  villaBrickPool: "1580587771525-78b9dba3b914",
  facadeDarkWood: "1600585154526-990dced4db0d",
  houseModernGarden: "1600563438938-a9a27216b4f5",
  cubicWhite: "1523217582562-09d0def993a6",
  facadeDusk: "1494526585095-c41746248156",
  houseBlackGarden: "1600607688969-a5bfcd646154",
  blackBoxDusk: "1600585153490-76fb20a32601",
  villaPoolSea: "1602343168117-bb8ffe3e2e9f",
  whiteSeaRoof: "1597211833712-5e41faa202ea",
  perforatedFacade: "1600573472592-401b489a3cdc",
  concreteNight: "1600566753376-12c8ab7fb75b",
  glassBoxSnow: "1513584684374-8bab748fbf90",
  // Interiors
  livingWoodWall: "1600607687939-ce8a6c25118c",
  glassStairPool: "1600573472550-8090b5e0745e",
  stairWood: "1502005229762-cf1b2da7c5d6",
  livingWarm: "1618221195710-dd6b41faaea6",
  bedroomGrey: "1616594039964-ae9021a400a0",
  bathroomStone: "1600566752355-35792bedcfea",
  loftStair: "1600566753086-00f18fb6b3ea",
  kitchenWhite: "1600585152220-90363fe7e115",
  loftConcrete: "1497366811353-6870744d04b2",
  loftCorridor: "1497366216548-37526070297c",
  stairOpen: "1600047508788-786f3865b4b9",
  bedroomLight: "1600607687644-c7171b42498f",
  bedroomDark: "1617104678098-de229db51175",
  chairYellow: "1586023492125-27b2c045efd7",
  livingTerrace: "1604014237800-1c9102c219da",
  doubleHeight: "1564078516393-cf04bd966897",
  livingSoft: "1583847268964-b28dc8f51f92",
  // Architecture & city
  geometricWhite: "1487958449943-2429e8be8625",
  terracottaCurves: "1486718448742-163732cd1544",
  glassTowers: "1431576901776-e539bd916ba2",
  drawing: "1503387762-592deb58ef4e",
  paris: "1502602898657-3e91760cbb34",
  parisRoofs: "1524396309943-e03f5249f002",
  // Portraits
  p1: "1500648767791-00dcc994a43e",
  p2: "1494790108377-be9c29b29330",
  p3: "1507003211169-0a1dd7228f2d",
  p4: "1438761681033-6461ffad8d80",
  p5: "1472099645785-5658abf4ff4e",
  p6: "1534528741775-53994a69daeb",
  p7: "1544005313-94ddf0286df2",
  p8: "1506794778202-cad84cf45f1d",
  p9: "1517841905240-472988babdf9",
  p10: "1531123897727-8f129e1688ce",
} as const;

export type ImageKey = keyof typeof ids;

export function img(key: ImageKey, width = 1600) {
  return `https://images.unsplash.com/photo-${ids[key]}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Square crop centred on faces, for portraits. */
export function portrait(key: ImageKey, size = 600) {
  return `https://images.unsplash.com/photo-${ids[key]}?auto=format&fit=crop&crop=faces&w=${size}&h=${Math.round(size * 1.25)}&q=80`;
}

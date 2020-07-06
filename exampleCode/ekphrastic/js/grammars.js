const stillLifeGrm = {
    "template": ["#first# #second#"],
    "first": ["A table laid with #object_0#, a #object_1#, and #object_2# invites the viewer to associate visual and #adjective_0# pleasure."],
    "second": ["But a closer look reveals #object_3_phrase#, a reminder of #reminder#."],

    "object_0": ["oysters", "garlands", "imported luxuries", "traditional foods of the festival", "flowers", "plates of aphrodisiac oysters", "lobsters"],
    "object_1": ["garland of salted fish and eggs", "lemon peel", "blue-and-white porcelain bowl from China", "large ox scull", "bodice", "smoldering lamp", "basin", "linen towel", "portrait by Diego Velázquez", "voluminous cloak", "cone of paper (intended to hold spices)"],
    "object_2": ["sausage", "beer", "foliage", "a type of glass known as a roemer", "the fleece of a golden ram",  "assorted foodstuffs", "an abundance of erotic innuendo", "lush fruit", "iridescent pink satin", "the gleam of polished silver", "metalic thread", "earthly pleasures"],
    "object_3": ["crumbling obelisks", "broken mirrors on the wall", "crumbling objects of veneration", "crumbling skulls", "crumbling oil lamps", "crumbling stones", "broken jewels", "crumbling masonry", "broken mantlepieces", "crumbling cabinets", "broken doors", "torn songbooks", "torn lace", "torn alminacs", "broken porcelain"],
    "object_3_phrase": ["#object_3#", "#object_3# nearly hidden in shadow"],

    "adjective_0": ["secretive", "culinary", "modern", "intimate", "luxurious", "domestic", "emotional", "placid", "indulgent", "timeless"],
    "reminder": ["our swiftly passing days", "our immortality and vanity in earlier still lifes", "life's brevity", "luxury's brevity"]
}

const portraitGrm = {
    "template": ["#first# #second# #third#"],
    "first": ["Two women of different ages #setting_0#."],
    "second": ["The elder, #description_0#, writes a letter while the younger #description_1#."],
    "third": ["Perhaps the older woman is helping her friend #purpose_0#."],

    "setting_0": ["are surrounded by an abundance of erotic innuendo", "appear in a luxuriously appointed interior", "sit on upholstered chairs", "appear surrounded by jewels", "appear in exotic costumes", "sit among a magnificent arrangement of flowers and fruit", "stand against a formal garden of hedgerows", "provide a glimpse into the private lives of prosperous families", "appear in a respectable home", "are shown against gilt-leather wallpaper"],
    "description_0": ["nearly hidden in shadow", "the ostensible subject", "her hair modestly covered", "with one arm akimbo", "having an interesting face", "dressed in radiant satin", "widowed", "with a sausage dangling from her cap", "richly dressed"],
    "description_1": ["peers over her shoulder", "appears #adjective_1# and #adjective_2#", "gazes into a mirror on the wall", "holds a plate of aphrodisiac oysters", "holds a suggestive painting of naked lovers", "holds a garland of salted fish and eggs"],
    "adjective_1": ["pensive", "theatrical"],
    "adjective_2": ["lovelorn"],
    "purpose_0": ["craft a response to a suitor"]
}

const landscapeGrm = {
    "template": ["#first# #second#"],
    "first": ["A #object_0# bisects the foreground of this painting, dividing the #landscape_0# on the left from a #landscape_1# on the right."],
    "second": ["Various figures—#second_nest#—add #adjective_0# interest to the #adjective_1# scene."],
    "second_nest": ["#figures_0#, a #figures_1#, and a #figures_2#"],

    "object_0": ["heavily rutted road", "pitted stone ledge", "large obelisk", "pavilion"],
    "landscape_0": ["marshland", "foliage", "French-style gardens", "country estate", "woods"],
    "landscape_1": ["farmyard", "formal garden of hedgerows", "respectable home"],
    "figures_0": ["agrarian laborers", "resting livestock", "horses", "hounds"],
    "figures_1": ["woman", "maid", "young maid", "woman watching from the farmhouse door", "young woman strumming a lute", "richly dressed girl", "monumental bare-breasted woman with a water pitcher on her back"],
    "figures_2": ["prosperous familyman", "bearded man", "wayfarer seeking alms"],
    "adjective_0": ["anecdotal", "", "", ""],
    "adjective_1": ["placid", "ordered", "precise and luminous", "particular", "", "", ""]
}

function expandGrm(grammar, parentDiv) {
    const grm = tracery.createGrammar(grammar);
    const grmOut = grm.flatten("#template#");
    const grmDiv = document.createElement('div');
    document.getElementById(parentDiv).appendChild(grmDiv);
    grmDiv.textContent = grmOut;
}

function main() {
    expandGrm(stillLifeGrm, "output-stillLife");
    expandGrm(portraitGrm, "output-portrait");
    expandGrm(landscapeGrm, "output-landscape");
}

setTimeout(main, 10);